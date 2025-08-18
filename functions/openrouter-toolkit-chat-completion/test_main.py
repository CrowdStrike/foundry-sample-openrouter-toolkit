"""Test module for the OpenRouter Toolkit Chat Completion function handler."""

import json
import time
import unittest
from unittest.mock import patch, MagicMock, Mock

from crowdstrike.foundry.function import Request


def mock_handler(*_args, **_kwargs):
    """Mock handler decorator for testing."""

    def identity(func):
        return func

    return identity


class MockContextAnalyzer:  # pylint: disable=too-few-public-methods
    """Mock ContextAnalyzer for testing."""

    def extract_entities(self, _context_data, _logger):
        """Mock entity extraction."""
        mock_entities = Mock()
        mock_entities.entity_counts = {"total_entities": 5}
        return mock_entities


class MockQueryClassifier:  # pylint: disable=too-few-public-methods
    """Mock QueryClassifier for testing."""

    def classify_query(self, _user_prompt, _entities, _logger):
        """Mock query classification."""
        mock_classification = Mock()
        mock_classification.primary_type.value = "threat_analysis"
        return mock_classification


class MockPromptBuilder:  # pylint: disable=too-few-public-methods
    """Mock PromptBuilder for testing."""

    def build_prompt(self, user_prompt, _entities, _classification, _logger):
        """Mock prompt building."""
        return f"Enhanced: {user_prompt}"


# Patch the function handler decorator before importing main
patcher = patch("crowdstrike.foundry.function.Function.handler", new=mock_handler)
patcher.start()

# Now import main with the mocked handler
import main  # pylint: disable=wrong-import-position

# Stop the patcher after import
patcher.stop()


class FnTestCase(unittest.TestCase):  # pylint: disable=too-many-instance-attributes,too-many-public-methods
    """Test case class for OpenRouter Toolkit Chat Completion function handler tests."""

    def setUp(self):
        """Set up test fixtures before each test method."""
        # Mock time.time for consistent request_id generation
        self.time_patcher = patch("main.time.time", return_value=time.time() - 1000)
        self.addCleanup(self.time_patcher.stop)
        self.mock_time = self.time_patcher.start()

        # Mock APIIntegrations
        self.api_patcher = patch("main.APIIntegrations")
        self.addCleanup(self.api_patcher.stop)
        self.mock_api_class = self.api_patcher.start()
        self.mock_api = MagicMock()
        self.mock_api_class.return_value = self.mock_api

        # Mock modular components
        self.context_analyzer_patcher = patch("main.ContextAnalyzer", MockContextAnalyzer)
        self.addCleanup(self.context_analyzer_patcher.stop)
        self.context_analyzer_patcher.start()

        self.query_classifier_patcher = patch("main.QueryClassifier", MockQueryClassifier)
        self.addCleanup(self.query_classifier_patcher.stop)
        self.query_classifier_patcher.start()

        self.prompt_builder_patcher = patch("main.PromptBuilder", MockPromptBuilder)
        self.addCleanup(self.prompt_builder_patcher.stop)
        self.prompt_builder_patcher.start()

    def _create_mock_api_response(self, content="Test response", model="test-model", tokens=100):
        """Helper method to create mock API response."""
        return {
            "body": {
                "resources": [
                    {
                        "response_body": {
                            "choices": [
                                {
                                    "message": {
                                        "content": content
                                    }
                                }
                            ],
                            "model": model,
                            "usage": {
                                "total_tokens": tokens
                            }
                        }
                    }
                ]
            }
        }

    def test_missing_user_prompt_input(self):
        """Test request with missing user_prompt_input returns 400 error."""
        request = Request()
        request.body = {
            "model_name_input": "test-model"
        }

        response = main.openrouter_toolkit_chat_completion(request, {}, MagicMock())

        self.assertEqual(response.code, 400)
        self.assertEqual(len(response.errors), 1)
        self.assertIn("user_prompt_input", response.errors[0].message)

    def test_missing_model_name_input(self):
        """Test request with missing model_name_input returns 400 error."""
        request = Request()
        request.body = {
            "user_prompt_input": "Test prompt"
        }

        response = main.openrouter_toolkit_chat_completion(request, {}, MagicMock())

        self.assertEqual(response.code, 400)
        self.assertEqual(len(response.errors), 1)
        self.assertIn("model_name_input", response.errors[0].message)

    def test_missing_both_required_fields(self):
        """Test request with both required fields missing returns 400 error."""
        request = Request()
        request.body = {}

        response = main.openrouter_toolkit_chat_completion(request, {}, MagicMock())

        self.assertEqual(response.code, 400)
        self.assertEqual(len(response.errors), 1)
        error_msg = response.errors[0].message
        self.assertIn("user_prompt_input", error_msg)
        self.assertIn("model_name_input", error_msg)

    def test_empty_user_prompt(self):
        """Test request with empty user prompt returns 400 error."""
        request = Request()
        request.body = {
            "user_prompt_input": "   ",  # Only whitespace
            "model_name_input": "test-model"
        }

        response = main.openrouter_toolkit_chat_completion(request, {}, MagicMock())

        self.assertEqual(response.code, 400)
        self.assertEqual(len(response.errors), 1)
        self.assertEqual(response.errors[0].message, "User prompt cannot be empty")

    def test_prompt_too_long(self):
        """Test request with prompt exceeding MAX_PROMPT_LENGTH returns 400 error."""
        request = Request()
        long_prompt = "x" * (main.Config.MAX_PROMPT_LENGTH + 1)
        request.body = {
            "user_prompt_input": long_prompt,
            "model_name_input": "test-model"
        }

        response = main.openrouter_toolkit_chat_completion(request, {}, MagicMock())

        self.assertEqual(response.code, 400)
        self.assertEqual(len(response.errors), 1)
        self.assertIn("Prompt too long", response.errors[0].message)

    def test_invalid_provider_sort(self):
        """Test request with invalid provider_sort returns 400 error."""
        request = Request()
        request.body = {
            "user_prompt_input": "Test prompt",
            "model_name_input": "test-model",
            "provider_sort_input": "invalid_sort"
        }

        response = main.openrouter_toolkit_chat_completion(request, {}, MagicMock())

        self.assertEqual(response.code, 400)
        self.assertEqual(len(response.errors), 1)
        self.assertIn("Invalid provider sort option", response.errors[0].message)

    def test_valid_provider_sort_options(self):
        """Test that valid provider sort options are accepted."""
        valid_options = ["price", "throughput", "latency"]

        for option in valid_options:
            with self.subTest(provider_sort=option):
                request = Request()
                request.body = {
                    "user_prompt_input": "Test prompt",
                    "model_name_input": "test-model",
                    "provider_sort_input": option
                }

                self.mock_api.execute_command.return_value = self._create_mock_api_response()

                response = main.openrouter_toolkit_chat_completion(request, {}, MagicMock())

                # Should not return validation error
                self.assertEqual(response.code, 200)

    def test_temperature_processing_valid_values(self):
        """Test temperature processing with valid values."""
        test_cases = [
            (0.0, 0.0),
            (0.5, 0.5),
            (1.0, 1.0),
            ("0.7", 0.7),
            (1.5, 1.0),  # Should clamp to 1.0
            (-0.1, 0.0),  # Should clamp to 0.0
        ]

        for input_temp, expected_temp in test_cases:
            with self.subTest(temperature=input_temp):
                request = Request()
                request.body = {
                    "user_prompt_input": "Test prompt",
                    "model_name_input": "test-model",
                    "temperature_input": input_temp
                }

                self.mock_api.execute_command.return_value = self._create_mock_api_response()

                response = main.openrouter_toolkit_chat_completion(request, {}, MagicMock())

                self.assertEqual(response.code, 200)
                # Verify API was called with correct temperature
                call_args = self.mock_api.execute_command.call_args
                api_body = call_args[1]["body"]
                actual_temp = api_body["resources"][0]["request"]["json"]["temperature"]
                self.assertEqual(actual_temp, expected_temp)

    def test_temperature_processing_invalid_values(self):
        """Test temperature processing with invalid values defaults to CONFIG default."""
        invalid_temps = ["invalid", None, [], {}]

        for invalid_temp in invalid_temps:
            with self.subTest(temperature=invalid_temp):
                request = Request()
                request.body = {
                    "user_prompt_input": "Test prompt",
                    "model_name_input": "test-model",
                    "temperature_input": invalid_temp
                }

                self.mock_api.execute_command.return_value = self._create_mock_api_response()

                response = main.openrouter_toolkit_chat_completion(request, {}, MagicMock())

                self.assertEqual(response.code, 200)
                # Should use default temperature
                call_args = self.mock_api.execute_command.call_args
                api_body = call_args[1]["body"]
                actual_temp = api_body["resources"][0]["request"]["json"]["temperature"]
                self.assertEqual(actual_temp, main.Config.DEFAULT_TEMPERATURE)

    def test_online_parameter_processing(self):
        """Test online parameter processing with various input types."""
        test_cases = [
            (True, True),
            (False, False),
            ("true", True),
            ("false", False),
            ("1", True),
            ("0", False),
            ("yes", True),
            ("no", False),
            ("on", True),
            ("off", False),
            ("invalid", False),
            (None, False),
            (123, False),
        ]

        for input_online, expected_online in test_cases:
            with self.subTest(online=input_online):
                request = Request()
                request.body = {
                    "user_prompt_input": "Test prompt",
                    "model_name_input": "test-model",
                    "online_input": input_online
                }

                self.mock_api.execute_command.return_value = self._create_mock_api_response()

                response = main.openrouter_toolkit_chat_completion(request, {}, MagicMock())

                self.assertEqual(response.code, 200)
                # Check if plugins were added for online requests
                call_args = self.mock_api.execute_command.call_args
                api_body = call_args[1]["body"]
                request_json = api_body["resources"][0]["request"]["json"]

                if expected_online:
                    self.assertIn("plugins", request_json)
                    self.assertEqual(len(request_json["plugins"]), 1)
                    self.assertEqual(request_json["plugins"][0]["id"], "web")
                else:
                    self.assertNotIn("plugins", request_json)

    def test_context_data_valid_json(self):
        """Test request with valid context data JSON."""
        context_data = {
            "indicators": ["192.168.1.1", "malware.exe"],
            "source": "falcon"
        }

        request = Request()
        request.body = {
            "user_prompt_input": "Analyze these indicators",
            "model_name_input": "test-model",
            "context_data_input": context_data
        }

        self.mock_api.execute_command.return_value = self._create_mock_api_response()

        response = main.openrouter_toolkit_chat_completion(request, {}, MagicMock())

        self.assertEqual(response.code, 200)
        self.assertTrue(response.body["context_used"])
        self.assertEqual(response.body["analysis_type"], "threat_analysis")
        self.assertEqual(response.body["model_output_text"], "Test response")

    def test_context_data_string_json(self):
        """Test request with context data as JSON string."""
        context_data = '{"indicators": ["192.168.1.1"], "source": "falcon"}'

        request = Request()
        request.body = {
            "user_prompt_input": "Analyze these indicators",
            "model_name_input": "test-model",
            "context_data_input": context_data
        }

        self.mock_api.execute_command.return_value = self._create_mock_api_response()

        response = main.openrouter_toolkit_chat_completion(request, {}, MagicMock())

        self.assertEqual(response.code, 200)
        self.assertTrue(response.body["context_used"])

    def test_context_data_invalid_json(self):
        """Test request with invalid context data JSON falls back gracefully."""
        request = Request()
        request.body = {
            "user_prompt_input": "Test prompt",
            "model_name_input": "test-model",
            "context_data_input": "invalid json{"
        }

        self.mock_api.execute_command.return_value = self._create_mock_api_response()

        response = main.openrouter_toolkit_chat_completion(request, {}, MagicMock())

        self.assertEqual(response.code, 200)
        self.assertFalse(response.body["context_used"])
        self.assertEqual(response.body["analysis_type"], "general")

    def test_successful_basic_request(self):
        """Test successful request with minimal required parameters."""
        request = Request()
        request.body = {
            "user_prompt_input": "Hello, test prompt",
            "model_name_input": "test-model"
        }

        self.mock_api.execute_command.return_value = self._create_mock_api_response(
            content="Hello! This is a test response.",
            model="test-model",
            tokens=150
        )

        response = main.openrouter_toolkit_chat_completion(request, {}, MagicMock())

        self.assertEqual(response.code, 200)
        self.assertEqual(response.body["model_output_text"], "Hello! This is a test response.")
        self.assertEqual(response.body["model"], "test-model")
        self.assertEqual(response.body["tokens"], 150)
        self.assertFalse(response.body["context_used"])
        self.assertEqual(response.body["analysis_type"], "general")
        self.assertIn("request_id", response.body)
        self.assertIn("execution_time_ms", response.body)

    def test_successful_request_all_parameters(self):
        """Test successful request with all optional parameters."""
        request = Request()
        request.body = {
            "user_prompt_input": "Analyze cybersecurity threat",
            "model_name_input": "gpt-4",
            "temperature_input": 0.7,
            "online_input": True,
            "provider_sort_input": "latency",
            "context_data_input": {"indicators": ["suspicious.exe"]}
        }

        self.mock_api.execute_command.return_value = self._create_mock_api_response(
            content="Detailed threat analysis result",
            model="gpt-4",
            tokens=500
        )

        response = main.openrouter_toolkit_chat_completion(request, {}, MagicMock())

        self.assertEqual(response.code, 200)
        self.assertEqual(response.body["model_output_text"], "Detailed threat analysis result")
        self.assertEqual(response.body["model"], "gpt-4")
        self.assertEqual(response.body["tokens"], 500)
        self.assertTrue(response.body["context_used"])
        self.assertEqual(response.body["analysis_type"], "threat_analysis")

        # Verify API call included all parameters
        call_args = self.mock_api.execute_command.call_args
        api_body = call_args[1]["body"]
        request_json = api_body["resources"][0]["request"]["json"]

        self.assertEqual(request_json["temperature"], 0.7)
        self.assertIn("plugins", request_json)
        self.assertEqual(request_json["provider"]["sort"], "latency")

    def test_api_response_parsing_error_missing_body(self):
        """Test error handling when API response is missing body."""
        request = Request()
        request.body = {
            "user_prompt_input": "Test prompt",
            "model_name_input": "test-model"
        }

        # Mock API response without body
        self.mock_api.execute_command.return_value = {}

        response = main.openrouter_toolkit_chat_completion(request, {}, MagicMock())

        self.assertEqual(response.code, 500)
        self.assertEqual(len(response.errors), 1)
        self.assertIn("Error parsing OpenRouter response", response.errors[0].message)

    def test_api_response_parsing_error_missing_resources(self):
        """Test error handling when API response is missing resources."""
        request = Request()
        request.body = {
            "user_prompt_input": "Test prompt",
            "model_name_input": "test-model"
        }

        # Mock API response without resources
        self.mock_api.execute_command.return_value = {"body": {}}

        response = main.openrouter_toolkit_chat_completion(request, {}, MagicMock())

        self.assertEqual(response.code, 500)
        self.assertEqual(len(response.errors), 1)
        self.assertIn("Error parsing OpenRouter response", response.errors[0].message)

    def test_api_response_parsing_string_response_body(self):
        """Test parsing when response_body is a JSON string."""
        request = Request()
        request.body = {
            "user_prompt_input": "Test prompt",
            "model_name_input": "test-model"
        }

        # Mock API response with stringified JSON
        response_body_json = json.dumps({
            "choices": [{"message": {"content": "Parsed response"}}],
            "model": "test-model",
            "usage": {"total_tokens": 200}
        })

        self.mock_api.execute_command.return_value = {
            "body": {
                "resources": [
                    {"response_body": response_body_json}
                ]
            }
        }

        response = main.openrouter_toolkit_chat_completion(request, {}, MagicMock())

        self.assertEqual(response.code, 200)
        self.assertEqual(response.body["model_output_text"], "Parsed response")
        self.assertEqual(response.body["tokens"], 200)

    def test_api_call_with_retry_logic(self):
        """Test API retry logic on failures."""
        request = Request()
        request.body = {
            "user_prompt_input": "Test prompt",
            "model_name_input": "test-model"
        }

        # Mock API to fail twice, then succeed
        self.mock_api.execute_command.side_effect = [
            Exception("Network error"),
            Exception("Timeout error"),
            self._create_mock_api_response(content="Success after retries")
        ]

        with patch("main.time.sleep"):  # Mock sleep to speed up test
            response = main.openrouter_toolkit_chat_completion(request, {}, MagicMock())

        self.assertEqual(response.code, 200)
        self.assertEqual(response.body["model_output_text"], "Success after retries")
        # Verify it was called 3 times (2 failures + 1 success)
        self.assertEqual(self.mock_api.execute_command.call_count, 3)

    def test_api_call_max_retries_exceeded(self):
        """Test API failure after max retries exceeded."""
        request = Request()
        request.body = {
            "user_prompt_input": "Test prompt",
            "model_name_input": "test-model"
        }

        # Mock API to always fail
        self.mock_api.execute_command.side_effect = Exception("Persistent failure")

        with patch("main.time.sleep"):  # Mock sleep to speed up test
            response = main.openrouter_toolkit_chat_completion(request, {}, MagicMock())

        self.assertEqual(response.code, 500)
        self.assertEqual(len(response.errors), 1)
        self.assertIn("API call failed after 3 retries: Persistent failure", response.errors[0].message)
        # Should be called MAX_RETRIES + 1 times
        self.assertEqual(self.mock_api.execute_command.call_count, main.Config.MAX_RETRIES + 1)

    def test_context_analysis_exception_fallback(self):
        """Test that context analysis exceptions fall back to original prompt."""
        request = Request()
        request.body = {
            "user_prompt_input": "Test prompt",
            "model_name_input": "test-model",
            "context_data_input": {"indicators": ["test"]}
        }

        # Stop the existing context analyzer patch temporarily
        self.context_analyzer_patcher.stop()

        # Mock context analyzer to raise exception
        with patch("main.ContextAnalyzer") as mock_analyzer:
            mock_analyzer.return_value.extract_entities.side_effect = Exception("Analysis failed")

            self.mock_api.execute_command.return_value = self._create_mock_api_response()

            response = main.openrouter_toolkit_chat_completion(request, {}, MagicMock())

        # Restart the original patch for other tests
        self.context_analyzer_patcher.start()

        self.assertEqual(response.code, 200)
        # context_used is True because context data was provided, even if analysis failed
        self.assertTrue(response.body["context_used"])
        # analysis_type should be "general" because analysis failed and fell back
        self.assertEqual(response.body["analysis_type"], "general")

    def test_request_id_generation(self):
        """Test that request_id is properly generated and included in response."""
        request = Request()
        request.body = {
            "user_prompt_input": "Test prompt",
            "model_name_input": "test-model"
        }

        self.mock_api.execute_command.return_value = self._create_mock_api_response()

        response = main.openrouter_toolkit_chat_completion(request, {}, MagicMock())

        self.assertEqual(response.code, 200)
        self.assertIn("request_id", response.body)
        # Should be in format req-{timestamp}
        self.assertTrue(response.body["request_id"].startswith("req-"))

    def test_execution_time_measurement(self):
        """Test that execution time is measured and included in response."""
        request = Request()
        request.body = {
            "user_prompt_input": "Test prompt",
            "model_name_input": "test-model"
        }

        self.mock_api.execute_command.return_value = self._create_mock_api_response()

        response = main.openrouter_toolkit_chat_completion(request, {}, MagicMock())

        self.assertEqual(response.code, 200)
        self.assertIn("execution_time_ms", response.body)
        self.assertIsInstance(response.body["execution_time_ms"], int)
        self.assertGreaterEqual(response.body["execution_time_ms"], 0)


if __name__ == "__main__":
    unittest.main()
