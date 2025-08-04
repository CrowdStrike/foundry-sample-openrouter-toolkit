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


# Configuration management (simplified from original)
class Config:
    """Configuration class for managing application settings."""

    MAX_RETRIES = int(os.getenv("MAX_RETRIES", "3"))
    RETRY_BASE_DELAY = float(os.getenv("RETRY_BASE_DELAY", "1.0"))
    DEFAULT_TEMPERATURE = float(os.getenv("DEFAULT_TEMPERATURE", "0.4"))
    MAX_PROMPT_LENGTH = int(os.getenv("MAX_PROMPT_LENGTH", "50000"))


# Configure function instance
func = Function.instance()


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


def validate_and_extract_params(
    request: Request, logger
) -> tuple[RequestParams, Optional[Response]]:
    """
    Validate request parameters and extract them into a structured format.
    Enhanced to support context data.
    """
    request_id = f"req-{int(time.time() * 1000)}"

    # Check for required fields
    missing_fields = []
    if "user_prompt_input" not in request.body:
        missing_fields.append("user_prompt_input")
    if "model_name_input" not in request.body:
        missing_fields.append("model_name_input")

    if missing_fields:
        error_msg = f"Missing required field(s): {', '.join(missing_fields)}"
        logger.error(f"[{request_id}] {error_msg}")
        return RequestParams("", "", request_id=request_id), Response(
            errors=[APIError(message=error_msg)], code=400
        )

    # Extract basic parameters
    user_prompt = request.body["user_prompt_input"]
    model_name = request.body["model_name_input"]

    # Validate user prompt
    if not user_prompt.strip():
        error_msg = "User prompt cannot be empty"
        logger.error(f"[{request_id}] {error_msg}")
        return RequestParams("", "", request_id=request_id), Response(
            errors=[APIError(message=error_msg)], code=400
        )

    # Basic security validation
    if len(user_prompt) > Config.MAX_PROMPT_LENGTH:
        error_msg = f"Prompt too long ({len(user_prompt)} characters). Maximum allowed: {Config.MAX_PROMPT_LENGTH}"
        logger.error(f"[{request_id}] {error_msg}")
        return RequestParams("", "", request_id=request_id), Response(
            errors=[APIError(message=error_msg)], code=400
        )

    # Process temperature
    try:
        temperature = request.body.get("temperature_input", Config.DEFAULT_TEMPERATURE)
        temperature = (
            float(temperature)
            if isinstance(temperature, (int, float, str))
            else Config.DEFAULT_TEMPERATURE
        )
        temperature = round(temperature * 10) / 10
        temperature = max(0.0, min(1.0, temperature))
    except (ValueError, TypeError):
        logger.warning(f"[{request_id}] Invalid temperature provided, using default")
        temperature = Config.DEFAULT_TEMPERATURE

    # Process online parameter
    online = request.body.get("online_input", False)
    if isinstance(online, str):
        online = online.lower() in ("true", "1", "yes", "on")
    elif not isinstance(online, bool):
        online = False

    # Process provider sorting parameter
    provider_sort = request.body.get("provider_sort_input")
    if provider_sort:
        valid_sorts = ["price", "throughput", "latency"]
        if provider_sort not in valid_sorts:
            error_msg = f"Invalid provider sort option '{provider_sort}'. Valid options: {', '.join(valid_sorts)}"
            logger.error(f"[{request_id}] {error_msg}")
            return RequestParams("", "", request_id=request_id), Response(
                errors=[APIError(message=error_msg)], code=400
            )

    # NEW: Extract context data if provided
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
                "search_prompt": "Current cybersecurity threat intelligence, IOC analysis, and security research findings relevant to:",
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


def extract_openrouter_response(
    api_result: Any, params: RequestParams, logger
) -> tuple[Optional[ResponseData], Optional[Response]]:
    """Extract and validate the response from the OpenRouter API."""
    try:
        # Progressive validation with clear error messages
        if not isinstance(api_result, dict):
            raise TypeError(
                f"Expected dict for API result, got {type(api_result).__name__}"
            )

        body = api_result.get("body")
        if not body or not isinstance(body, dict):
            raise KeyError("Missing or invalid 'body' in API response")

        resources = body.get("resources")
        if not resources or not isinstance(resources, list) or len(resources) == 0:
            raise ValueError("Missing or empty 'resources' in response body")

        resource_data = resources[0]
        if not isinstance(resource_data, dict):
            raise TypeError(
                f"Expected dict for resource data, got {type(resource_data).__name__}"
            )

        response_body = resource_data.get("response_body")
        if not response_body:
            raise KeyError("Missing 'response_body' in resource data")

        # Parse if stringified JSON
        if isinstance(response_body, str):
            try:
                response_body = json.loads(response_body)
            except json.JSONDecodeError as je:
                raise ValueError(f"Failed to parse response JSON: {str(je)}")

        if not isinstance(response_body, dict):
            raise TypeError(
                f"Expected dict for parsed response_body, got {type(response_body).__name__}"
            )

        choices = response_body.get("choices")
        if not choices or not isinstance(choices, list) or len(choices) == 0:
            raise KeyError("Missing or empty 'choices' in response")

        message = choices[0].get("message")
        if not message or not isinstance(message, dict):
            raise KeyError("Missing 'message' in first choice")

        content = message.get("content")
        if not content or not isinstance(content, str):
            raise KeyError("Missing or invalid 'content' in message")

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

    except Exception as e:
        logger.warning(f"[{params.request_id}] Error in context analysis: {str(e)}")
        logger.debug(f"[{params.request_id}] {traceback.format_exc()}")
        # Fall back to original prompt if context analysis fails
        return params.user_prompt, "general"


@func.handler(method="POST", path="/openrouter-toolkit-chat-completion")
def openrouter_toolkit_chat_completion(request: Request, config, logger) -> Response:
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

        # Build context-aware prompt
        final_prompt, analysis_type = build_context_aware_prompt(params, logger)

        if params.context_data:
            logger.info(
                f"[{request_id}] Context analysis completed - Type: {analysis_type}"
            )
            logger.debug(
                f"[{request_id}] Enhanced prompt length: {len(final_prompt)} characters"
            )

        # Prepare API request with enhanced prompt
        api = APIIntegrations()
        body = prepare_api_request(params, final_prompt)

        # Make API call with retry logic
        max_retries = Config.MAX_RETRIES
        retry_count = 0
        result = None

        while retry_count <= max_retries:
            try:
                retry_suffix = f" (retry {retry_count})" if retry_count > 0 else ""
                logger.info(f"[{request_id}] Calling OpenRouter API{retry_suffix}")
                result = api.execute_command(body=body)
                break

            except Exception as e:
                retry_count += 1
                if retry_count <= max_retries:
                    logger.warning(
                        f"[{request_id}] API call failed, retrying ({retry_count}/{max_retries}): {str(e)}"
                    )
                    delay = Config.RETRY_BASE_DELAY * (2 ** (retry_count - 1))
                    time.sleep(delay)
                else:
                    logger.error(
                        f"[{request_id}] API call failed after {max_retries} retries: {str(e)}"
                    )
                    raise

        if result is None:
            raise RuntimeError("API call failed with no response after retries")

        # Process response
        logger.info(f"[{request_id}] Processing API response")
        response_data, extraction_error = extract_openrouter_response(
            result, params, logger
        )
        if extraction_error:
            return extraction_error

        # Set execution time and analysis type
        assert response_data is not None
        response_data.execution_time_ms = int((time.time() - start_time) * 1000)
        response_data.analysis_type = analysis_type

        # Log completion
        context_note = f" (Context: {analysis_type})" if params.context_data else ""
        logger.info(
            f"[{request_id}] Request completed - Model: {response_data.model}, "
            f"Tokens: {response_data.tokens}, Time: {response_data.execution_time_ms/1000:.2f}s{context_note}"
        )

        # Return successful response
        return Response(
            body={
                "model_output_text": response_data.content,
                "model": response_data.model,
                "tokens": response_data.tokens,
                "request_id": request_id,
                "execution_time_ms": response_data.execution_time_ms,
                "context_used": response_data.context_used,
                "analysis_type": response_data.analysis_type,
            },
            code=200,
        )

    except Exception as e:
        request_id = params.request_id
        logger.error(
            f"[{request_id}] Unhandled exception: {type(e).__name__} - {str(e)}"
        )
        logger.debug(f"[{request_id}] {traceback.format_exc()}")
        return Response(errors=[APIError(message=f"Error: {str(e)}")], code=500)


if __name__ == "__main__":
    func.run()
