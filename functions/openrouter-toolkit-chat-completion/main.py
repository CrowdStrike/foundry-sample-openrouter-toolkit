"""
OpenRouter Toolkit Chat Completion Function - Modular Context-Aware Version
Supports both traditional queries and context-aware OSINT analysis.
"""

from __future__ import annotations

import json
import os
import time
import traceback
from dataclasses import dataclass
from typing import Any, Dict, Optional

from crowdstrike.foundry.function import APIError, Function, Request, Response
from falconpy import APIIntegrations

# Import modular components
from context_analyzer import ContextAnalyzer
from query_classifier import QueryClassifier
from prompt_builder import PromptBuilder


@dataclass
class Config:
    """Configuration constants."""
    MAX_RETRIES = int(os.getenv("MAX_RETRIES", "3"))
    RETRY_BASE_DELAY = float(os.getenv("RETRY_BASE_DELAY", "1.0"))
    DEFAULT_TEMPERATURE = float(os.getenv("DEFAULT_TEMPERATURE", "0.4"))
    MAX_PROMPT_LENGTH = int(os.getenv("MAX_PROMPT_LENGTH", "50000"))

# Configure function instance
FUNC = Function.instance()


@dataclass
class RequestParams:
    """Structured representation of request parameters."""

    user_prompt: str
    model_name: str
    temperature: float = Config.DEFAULT_TEMPERATURE
    online: bool = False
    provider_sort: Optional[str] = None
    context_data: Optional[Dict] = None  # New: Context data from falcon
    request_id: str = ""


@dataclass
class ResponseData:
    """Structured representation of response data."""

    content: str
    model: str
    tokens: int
    request_id: str
    execution_time_ms: int
    context_used: bool = False
    analysis_type: str = "general"


def _validate_basic_params(request: Request, request_id: str, logger) -> Optional[Response]:
    """Validate basic required parameters."""
    missing_fields = []
    if "user_prompt_input" not in request.body:
        missing_fields.append("user_prompt_input")
    if "model_name_input" not in request.body:
        missing_fields.append("model_name_input")

    if missing_fields:
        error_msg = f"Missing required field(s): {', '.join(missing_fields)}"
        logger.error(f"[{request_id}] {error_msg}")
        return Response(errors=[APIError(message=error_msg)], code=400)
    return None


def _validate_prompt(user_prompt: str, request_id: str, logger) -> Optional[Response]:
    """Validate user prompt."""
    if not user_prompt.strip():
        error_msg = "User prompt cannot be empty"
        logger.error(f"[{request_id}] {error_msg}")
        return Response(errors=[APIError(message=error_msg)], code=400)

    if len(user_prompt) > Config.MAX_PROMPT_LENGTH:
        error_msg = (
            f"Prompt too long ({len(user_prompt)} characters). "
            f"Maximum allowed: {Config.MAX_PROMPT_LENGTH}"
        )
        logger.error(f"[{request_id}] {error_msg}")
        return Response(errors=[APIError(message=error_msg)], code=400)
    return None


def _process_temperature(request: Request, request_id: str, logger) -> float:
    """Process and validate temperature parameter."""
    try:
        temperature = request.body.get("temperature_input", Config.DEFAULT_TEMPERATURE)
        temperature = (
            float(temperature)
            if isinstance(temperature, (int, float, str))
            else Config.DEFAULT_TEMPERATURE
        )
        temperature = round(temperature * 10) / 10
        return max(0.0, min(1.0, temperature))
    except (ValueError, TypeError):
        logger.warning(f"[{request_id}] Invalid temperature provided, using default")
        return Config.DEFAULT_TEMPERATURE


def _process_provider_sort(
    request: Request, request_id: str, logger
) -> tuple[Optional[str], Optional[Response]]:
    """Process and validate provider sort parameter."""
    provider_sort = request.body.get("provider_sort_input")
    if provider_sort:
        valid_sorts = ["price", "throughput", "latency"]
        if provider_sort not in valid_sorts:
            error_msg = (
                f"Invalid provider sort option '{provider_sort}'. "
                f"Valid options: {', '.join(valid_sorts)}"
            )
            logger.error(f"[{request_id}] {error_msg}")
            return None, Response(errors=[APIError(message=error_msg)], code=400)
    return provider_sort, None


def validate_and_extract_params(
    request: Request, logger
) -> tuple[RequestParams, Optional[Response]]:
    """
    Validate request parameters and extract them into a structured format.
    Enhanced to support context data.
    """
    request_id = f"req-{int(time.time() * 1000)}"

    # Check for required fields
    error_response = _validate_basic_params(request, request_id, logger)
    if error_response:
        return RequestParams("", "", request_id=request_id), error_response

    # Extract basic parameters
    user_prompt = request.body["user_prompt_input"]
    model_name = request.body["model_name_input"]

    # Validate user prompt
    error_response = _validate_prompt(user_prompt, request_id, logger)
    if error_response:
        return RequestParams("", "", request_id=request_id), error_response

    # Process temperature
    temperature = _process_temperature(request, request_id, logger)

    # Process online parameter
    online = request.body.get("online_input", False)
    if isinstance(online, str):
        online = online.lower() in ("true", "1", "yes", "on")
    elif not isinstance(online, bool):
        online = False

    # Process provider sorting parameter
    provider_sort, error_response = _process_provider_sort(request, request_id, logger)
    if error_response:
        return RequestParams("", "", request_id=request_id), error_response

    # Extract context data if provided
    context_data = request.body.get("context_data_input")
    if context_data:
        try:
            # Parse context data if it's a string
            if isinstance(context_data, str):
                context_data = json.loads(context_data)
        except (json.JSONDecodeError, TypeError) as e:
            logger.warning(f"[{request_id}] Invalid context data format: {str(e)}")
            context_data = None

    return (
        RequestParams(
            user_prompt,
            model_name,
            temperature,
            online,
            provider_sort,
            context_data,
            request_id,
        ),
        None,
    )


def prepare_api_request(params: RequestParams, final_prompt: str) -> Dict[str, Any]:
    """
    Prepare the API request body for OpenRouter.
    Uses the final constructed prompt instead of raw user prompt.
    """
    request_payload = {
        "model": params.model_name,
        "messages": [
            {"role": "user", "content": final_prompt}  # Use the context-aware prompt
        ],
        "temperature": params.temperature,
    }

    # Add provider sorting if specified
    if params.provider_sort:
        request_payload["provider"] = {"sort": params.provider_sort}

    # Add web plugin if online search is enabled
    if params.online:
        request_payload["plugins"] = [
            {
                "id": "web",
                "max_results": 3,
                "search_prompt": (
                    "Current cybersecurity threat intelligence, IOC analysis, "
                    "and security research findings relevant to:"
                ),
            }
        ]

    return {
        "resources": [
            {
                "definition_id": "OpenRouter API",
                "operation_id": "OpenRouter Chat Completion",
                "request": {"json": request_payload},
            }
        ]
    }


def _validate_api_structure(api_result: Any) -> Dict:
    """Validate the basic structure of the API result."""
    if not isinstance(api_result, dict):
        result_type = type(api_result).__name__
        raise TypeError(f"Expected dict for API result, got {result_type}")

    body = api_result.get("body")
    if not body or not isinstance(body, dict):
        raise KeyError("Missing or invalid 'body' in API response")

    resources = body.get("resources")
    if not resources or not isinstance(resources, list) or len(resources) == 0:
        raise ValueError("Missing or empty 'resources' in response body")

    resource_data = resources[0]
    if not isinstance(resource_data, dict):
        raise TypeError(f"Expected dict for resource data, got {type(resource_data).__name__}")

    return resource_data


def _parse_response_body(resource_data: Dict) -> Dict:
    """Parse and validate the response body from resource data."""
    response_body = resource_data.get("response_body")
    if not response_body:
        raise KeyError("Missing 'response_body' in resource data")

    # Parse if stringified JSON
    if isinstance(response_body, str):
        try:
            response_body = json.loads(response_body)
        except json.JSONDecodeError as je:
            raise ValueError(f"Failed to parse response JSON: {str(je)}") from je

    if not isinstance(response_body, dict):
        response_type = type(response_body).__name__
        raise TypeError(f"Expected dict for parsed response_body, got {response_type}")

    return response_body


def _extract_content_from_response(response_body: Dict) -> str:
    """Extract content from the response body choices."""
    choices = response_body.get("choices")
    if not choices or not isinstance(choices, list) or len(choices) == 0:
        raise KeyError("Missing or empty 'choices' in response")

    message = choices[0].get("message")
    if not message or not isinstance(message, dict):
        raise KeyError("Missing 'message' in first choice")

    content = message.get("content")
    if not content or not isinstance(content, str):
        raise KeyError("Missing or invalid 'content' in message")

    return content


def extract_openrouter_response(
    api_result: Any, params: RequestParams, logger
) -> tuple[Optional[ResponseData], Optional[Response]]:
    """Extract and validate the response from the OpenRouter API."""
    try:
        # Progressive validation with clear error messages
        resource_data = _validate_api_structure(api_result)
        response_body = _parse_response_body(resource_data)
        content = _extract_content_from_response(response_body)

        # Extract model and token usage information
        model = response_body.get("model", params.model_name)
        usage = response_body.get("usage", {})
        tokens = usage.get("total_tokens", 0)

        # Create response data object
        return (
            ResponseData(
                content=content,
                model=model,
                tokens=tokens,
                request_id=params.request_id,
                execution_time_ms=0,  # Will be set by main handler
                context_used=params.context_data is not None,
                analysis_type="context-aware" if params.context_data else "general",
            ),
            None,
        )

    except (TypeError, KeyError, ValueError) as e:
        error_msg = f"Error parsing OpenRouter response: {str(e)}"
        logger.error(f"[{params.request_id}] {error_msg}")
        return None, Response(errors=[APIError(message=error_msg)], code=500)


def build_context_aware_prompt(params: RequestParams, logger) -> tuple[str, str]:
    """
    Build a context-aware prompt or return the original prompt.

    Returns:
        tuple: (final_prompt, analysis_type)
    """

    # If no context data provided, return original prompt
    if not params.context_data:
        return params.user_prompt, "general"

    try:
        # Extract OSINT entities from context
        logger.debug(f"[{params.request_id}] Extracting entities from context data")
        analyzer = ContextAnalyzer()
        entities = analyzer.extract_entities(params.context_data, logger)

        # If no relevant entities found, use original prompt
        if entities.entity_counts.get("total_entities", 0) == 0:
            logger.debug(
                f"[{params.request_id}] No OSINT entities found, using original prompt"
            )
            return params.user_prompt, "general"

        # Classify the query
        logger.debug(f"[{params.request_id}] Classifying query type")
        classifier = QueryClassifier()
        classification = classifier.classify_query(params.user_prompt, entities, logger)

        # Build context-aware prompt
        logger.debug(f"[{params.request_id}] Building context-aware prompt")
        builder = PromptBuilder()
        enhanced_prompt = builder.build_prompt(
            params.user_prompt, entities, classification, logger
        )

        return enhanced_prompt, classification.primary_type.value

    except Exception as e:  # pylint: disable=broad-except
        logger.warning(f"[{params.request_id}] Error in context analysis: {str(e)}")
        logger.debug(f"[{params.request_id}] {traceback.format_exc()}")
        # Fall back to original prompt if context analysis fails
        return params.user_prompt, "general"


def _make_api_call_with_retries(api, body, params, logger, max_retries):
    """Make OpenRouter API call with retry logic."""
    result = None
    retry_count = 0

    while retry_count <= max_retries:
        try:
            retry_suffix = f" (retry {retry_count})" if retry_count > 0 else ""
            logger.info(f"[{params.request_id}] Calling OpenRouter API{retry_suffix}")
            result = api.execute_command(body=body)
            break

        except Exception as e:  # pylint: disable=broad-except
            retry_count += 1
            if retry_count <= max_retries:
                logger.warning(
                    f"[{params.request_id}] API call failed, retrying "
                    f"({retry_count}/{max_retries}): {str(e)}"
                )
                delay = Config.RETRY_BASE_DELAY * (2 ** (retry_count - 1))
                time.sleep(delay)
            else:
                logger.error(
                    f"[{params.request_id}] API call failed after {max_retries} retries: {str(e)}"
                )
                # Don't re-raise, return error response instead
                raise RuntimeError(
                    f"API call failed after {max_retries} retries: {str(e)}"
                ) from e

    if result is None:
        raise RuntimeError("API call failed with no response after retries")

    return result


def _log_request_info(params: RequestParams, logger):
    """Log request processing information."""
    request_id = params.request_id
    context_status = "with context analysis" if params.context_data else "standard"
    online_status = "with web search" if params.online else ""
    provider_status = (
        f", provider sort: {params.provider_sort}" if params.provider_sort else ""
    )

    logger.info(
        f"[{request_id}] Processing request - Model: {params.model_name}, "
        f"Temperature: {params.temperature} ({context_status}{online_status}{provider_status})"
    )


def _process_and_log_context(params: RequestParams, final_prompt: str, analysis_type: str, logger):
    """Process and log context analysis results."""
    if params.context_data:
        logger.info(
            f"[{params.request_id}] Context analysis completed - Type: {analysis_type}"
        )
        logger.debug(
            f"[{params.request_id}] Enhanced prompt length: {len(final_prompt)} characters"
        )


def _finalize_response(
    response_data: ResponseData, analysis_type: str, params: RequestParams,
    start_time: float, logger
) -> Response:
    """Finalize and log the response."""
    response_data.execution_time_ms = int((time.time() - start_time) * 1000)
    response_data.analysis_type = analysis_type

    # Log completion
    context_note = f" (Context: {analysis_type})" if params.context_data else ""
    logger.info(
        f"[{params.request_id}] Request completed - "
        f"Model: {response_data.model}, Tokens: {response_data.tokens}, "
        f"Time: {response_data.execution_time_ms/1000:.2f}s{context_note}"
    )

    # Return successful response
    return Response(
        body={
            "model_output_text": response_data.content,
            "model": response_data.model,
            "tokens": response_data.tokens,
            "request_id": params.request_id,
            "execution_time_ms": response_data.execution_time_ms,
            "context_used": response_data.context_used,
            "analysis_type": response_data.analysis_type,
        },
        code=200,
    )


@FUNC.handler(method="POST", path="/openrouter-toolkit-chat-completion")
def openrouter_toolkit_chat_completion(request: Request, _config, logger) -> Response:
    """
    Process OpenRouter chat completion requests with optional context-aware analysis.
    """
    start_time = time.time()
    params = RequestParams("", "")

    try:
        # Validate and extract parameters
        logger.debug("Validating request parameters")
        params, validation_error = validate_and_extract_params(request, logger)
        if validation_error:
            return validation_error

        # Log request info
        _log_request_info(params, logger)

        # Build context-aware prompt
        final_prompt, analysis_type = build_context_aware_prompt(params, logger)
        _process_and_log_context(params, final_prompt, analysis_type, logger)

        # Prepare and execute API request
        api = APIIntegrations()
        body = prepare_api_request(params, final_prompt)
        result = _make_api_call_with_retries(api, body, params, logger, Config.MAX_RETRIES)

        # Process response
        logger.info(f"[{params.request_id}] Processing API response")
        response_data, extraction_error = extract_openrouter_response(result, params, logger)
        if extraction_error:
            return extraction_error

        assert response_data is not None
        return _finalize_response(response_data, analysis_type, params, start_time, logger)

    except (TypeError, KeyError, ValueError, json.JSONDecodeError, RuntimeError) as e:
        request_id = params.request_id
        logger.error(
            f"[{request_id}] Unhandled exception: {type(e).__name__} - {str(e)}"
        )
        logger.debug(f"[{request_id}] {traceback.format_exc()}")
        return Response(errors=[APIError(message=f"Error: {str(e)}")], code=500)


if __name__ == "__main__":
    FUNC.run()
