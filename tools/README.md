# LLM Model Testing Tool

Simple tool to test LLM models with the SOC Analyst Assistant prompt.

## Usage

```bash
python test_llm_models.py --api-key YOUR_OPENROUTER_API_KEY

# Or with custom input
python test_llm_models.py --api-key YOUR_OPENROUTER_API_KEY --input "192.168.1.1"
```

## What it does

- Tests 27 non-CrowdStrike models from OpenRouter
- Runs up to 8 models in parallel for faster execution
- Uses the exact SOC Analyst Assistant prompt from the workflow
- Default input: `4rr443.servicevnow.com`
- SSL verification disabled
- Thread-safe progress tracking
- Logs all responses to timestamped JSON file
- Shows progress and performance summary

## Output

Results are saved to `llm_test_results_YYYYMMDD_HHMMSS.json` with:
- Response times in milliseconds
- Token counts
- Full model responses
- Success/failure status
- Timestamps
- Parallel execution metadata (8 workers)

The script will show real-time progress as models complete, with up to 8 running simultaneously for much faster execution than sequential testing.

## Requirements

- Python 3.6+
- `requests` library (`pip install requests`)
- OpenRouter API key
