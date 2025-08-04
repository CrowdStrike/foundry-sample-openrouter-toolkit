#!/usr/bin/env python3
"""
Dynamic LLM Model Tester for OpenRouter API
Tests models with the SOC Analyst Assistant prompt.
Supports dynamic model fetching from OpenRouter API.
"""

import argparse
import json
import os
import time
import requests
import urllib3
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed
import threading

# Disable SSL verification warnings
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Fallback hardcoded models (used if API fetch fails)
FALLBACK_MODELS = [
    # Anthropic Models
    "anthropic/claude-3.5-sonnet",
    "anthropic/claude-3.5-haiku",
    "anthropic/claude-3-opus",
    "anthropic/claude-3-haiku",
    
    # DeepSeek Models
    "deepseek/deepseek-chat",
    
    # Google Models
    "google/gemini-2.5-pro",
    "google/gemini-2.5-flash",
    
    # Meta Models
    "meta-llama/llama-3.1-405b-instruct",
    "meta-llama/llama-3.1-70b-instruct",
    "meta-llama/llama-3.1-8b-instruct",
    
    # Mistral Models
    "mistralai/mistral-large",
    "mistralai/mixtral-8x7b-instruct",
    
    # OpenAI Models
    "openai/gpt-4o",
    "openai/gpt-4o-mini",
    
    # Perplexity Models
    "perplexity/sonar-reasoning-pro",
    "perplexity/sonar-pro",
    
    # xAI Models
    "x-ai/grok-3",
    "x-ai/grok-3-mini",
    
    # Other Models
    "qwen/qwen-2.5-72b-instruct",
    "cohere/command-r-plus",
    "cohere/command-r",
    "ai21/jamba-1.6-large",
    "ai21/jamba-1.6-mini"
]

def fetch_openrouter_models(api_key, max_price_per_1k=0.5, min_context_length=8000):
    """
    Fetch and filter models from OpenRouter API with enhanced filtering.
    
    Args:
        api_key: OpenRouter API key
        max_price_per_1k: Maximum price per 1K tokens (default: $0.50)
        min_context_length: Minimum context length (default: 8000)
    
    Returns:
        List of filtered model IDs
    """
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    try:
        print("🔄 Fetching models from OpenRouter API...")
        response = requests.get(
            "https://openrouter.ai/api/v1/models",
            headers=headers,
            timeout=30,
            verify=False
        )
        
        if response.status_code != 200:
            print(f"❌ API request failed: {response.status_code}")
            return None
            
        data = response.json()
        models = data.get("data", [])
        
        print(f"📥 Retrieved {len(models)} total models from API")
        
        # Enhanced filtering with patterns from test results analysis
        filtered_models = []
        excluded_reasons = {
            "deprecated_models": 0,
            "free_tier_issues": 0,
            "guard_models": 0,
            "vision_only": 0,
            "preview_beta": 0,
            "too_expensive": 0,
            "small_context": 0,
            "known_problematic": 0
        }
        
        # Problematic model patterns identified from test results
        exclude_patterns = [
            # Deprecated models causing 404s
            "claude-2.0", "claude-2.1", "claude-2:",
            # Free tier models with availability issues
            ":free",
            # Guard/filter models (not for chat completion)
            "guard", "filter", "classifier", "safety",
            # Preview/experimental models
            "preview", "beta", "experimental", "alpha", "test", "dev",
            # Models with known provider issues
            "baidu/", "ernie-", "arliai/",
            # Deprecated or problematic variants
            "deepseek-chat-v3-0324", "dolphin3.0-",
        ]
        
        for model in models:
            model_id = model.get("id", "")
            
            # Skip if no model ID
            if not model_id:
                continue
            
            # Check for any model with tags (colon followed by tag)
            if ":" in model_id and "/" in model_id:
                # Split by "/" to get the model part, then check if there's a colon after the last "/"
                model_parts = model_id.split("/")
                if len(model_parts) > 1 and ":" in model_parts[-1]:
                    excluded_reasons["free_tier_issues"] += 1  # Count as free tier issues
                    continue
            
            # Check against exclude patterns
            excluded = False
            for pattern in exclude_patterns:
                if pattern in model_id.lower():
                    if "claude-2" in pattern:
                        excluded_reasons["deprecated_models"] += 1
                    elif "guard" in pattern or "filter" in pattern or "safety" in pattern:
                        excluded_reasons["guard_models"] += 1
                    elif pattern in ["preview", "beta", "experimental", "alpha", "test", "dev"]:
                        excluded_reasons["preview_beta"] += 1
                    else:
                        excluded_reasons["known_problematic"] += 1
                    excluded = True
                    break
            
            if excluded:
                continue
                
            # Skip vision-only models based on model ID patterns
            vision_keywords = ["vision", "image", "ocr", "visual", "multimodal", "-vl-", "vision-"]
            if any(keyword in model_id.lower() for keyword in vision_keywords):
                # But allow models that also mention text/chat capabilities
                if not any(text_keyword in model_id.lower() for text_keyword in ["chat", "text", "instruct"]):
                    excluded_reasons["vision_only"] += 1
                    continue
            
            # Check pricing (if available)
            pricing = model.get("pricing", {})
            if pricing:
                prompt_price = float(pricing.get("prompt", "0"))
                completion_price = float(pricing.get("completion", "0"))
                avg_price = (prompt_price + completion_price) / 2
                
                if avg_price > max_price_per_1k:
                    excluded_reasons["too_expensive"] += 1
                    continue
            
            # Check context length
            context_length = model.get("context_length", 0)
            if context_length > 0 and context_length < min_context_length:
                excluded_reasons["small_context"] += 1
                continue
            
            # Model passed all filters
            filtered_models.append(model_id)
        
        # Print filtering summary
        print(f"✅ Filtered to {len(filtered_models)} suitable models")
        print("📊 Exclusion reasons:")
        for reason, count in excluded_reasons.items():
            if count > 0:
                print(f"   - {reason.replace('_', ' ')}: {count}")
        
        return sorted(filtered_models)
        
    except Exception as e:
        print(f"❌ Error fetching models: {str(e)}")
        return None

def save_models_to_file(models, filename="models.json"):
    """Save model list to JSON file."""
    try:
        with open(filename, 'w') as f:
            json.dump({
                "updated": datetime.now().isoformat(),
                "count": len(models),
                "models": models
            }, f, indent=2)
        print(f"💾 Saved {len(models)} models to {filename}")
        return True
    except Exception as e:
        print(f"❌ Error saving models: {str(e)}")
        return False

def load_models_from_file(filename="models.json"):
    """Load model list from JSON file."""
    try:
        if not os.path.exists(filename):
            print(f"📄 Model file {filename} not found")
            return None
            
        with open(filename, 'r') as f:
            data = json.load(f)
            
        models = data.get("models", [])
        updated = data.get("updated", "unknown")
        
        print(f"📄 Loaded {len(models)} models from {filename} (updated: {updated})")
        return models
        
    except Exception as e:
        print(f"❌ Error loading models: {str(e)}")
        return None

def get_model_list(api_key, args):
    """Get the appropriate model list based on command line arguments."""
    
    # If updating models, fetch from API
    if args.update_models:
        models = fetch_openrouter_models(
            api_key, 
            max_price_per_1k=args.max_price,
            min_context_length=args.min_context
        )
        
        if models:
            if args.save_models:
                save_models_to_file(models, args.save_models)
            return models
        else:
            print("⚠️  Failed to fetch models, using fallback list")
            return FALLBACK_MODELS
    
    # If loading from file
    elif args.load_models:
        models = load_models_from_file(args.load_models)
        if models:
            return models
        else:
            print("⚠️  Failed to load models from file, using fallback list")
            return FALLBACK_MODELS
    
    # Use fallback models
    else:
        print(f"📋 Using fallback model list ({len(FALLBACK_MODELS)} models)")
        return FALLBACK_MODELS

def validate_response_quality(content, tokens, response_time_ms):
    """
    Validate response quality and categorize performance.
    
    Returns:
        dict: {
            "quality_valid": bool,
            "quality_issues": list,
            "performance_category": str,
            "quality_score": float (0-1)
        }
    """
    quality_issues = []
    quality_score = 1.0
    
    # Check minimum content length
    if not content or len(content.strip()) < 50:
        quality_issues.append("Response too short")
        quality_score -= 0.4
    
    # Check minimum token count (likely incomplete if < 50 tokens)
    if tokens < 50:
        quality_issues.append("Very low token count")
        quality_score -= 0.3
    
    # Check if response looks like an error message
    error_indicators = ["error", "sorry", "cannot", "unable", "failed", "invalid"]
    if any(indicator in content.lower()[:100] for indicator in error_indicators):
        quality_issues.append("Response appears to be error message")
        quality_score -= 0.5
    
    # Check for markdown formatting (should be plain text)
    if any(marker in content for marker in ["**", "###", "##", "- ", "* "]):
        quality_issues.append("Contains markdown formatting")
        quality_score -= 0.2
    
    # Performance categorization
    if response_time_ms < 5000:  # < 5 seconds
        performance_category = "Fast"
    elif response_time_ms < 15000:  # < 15 seconds
        performance_category = "Acceptable"
    else:
        performance_category = "Slow"
    
    # Overall quality assessment
    quality_valid = len(quality_issues) == 0 and quality_score >= 0.7
    
    return {
        "quality_valid": quality_valid,
        "quality_issues": quality_issues,
        "performance_category": performance_category,
        "quality_score": max(0.0, quality_score)
    }

def test_single_model(model, prompt, headers, max_retries=2):
    """Test a single model with retry logic for rate limits."""
    payload = {
        "model": model,
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.4,
        "max_tokens": 4000
    }
    
    for attempt in range(max_retries + 1):
        start_time = time.time()
        
        try:
            response = requests.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers=headers,
                json=payload,
                timeout=120,
                verify=False  # SSL verification disabled
            )
            
            response_time_ms = int((time.time() - start_time) * 1000)
            
            if response.status_code == 200:
                data = response.json()
                content = data.get("choices", [{}])[0].get("message", {}).get("content", "")
                tokens = data.get("usage", {}).get("total_tokens", 0)
                
                # Validate response quality
                quality_info = validate_response_quality(content, tokens, response_time_ms)
                
                return {
                    "model": model,
                    "success": True,
                    "response_time_ms": response_time_ms,
                    "tokens": tokens,
                    "content": content,
                    "quality_valid": quality_info["quality_valid"],
                    "quality_issues": quality_info["quality_issues"],
                    "performance_category": quality_info["performance_category"],
                    "quality_score": quality_info["quality_score"],
                    "timestamp": datetime.now().isoformat()
                }
            elif response.status_code == 429 and attempt < max_retries:
                # Rate limit - wait and retry
                wait_time = 2 ** attempt  # Exponential backoff
                time.sleep(wait_time)
                continue
            else:
                return {
                    "model": model,
                    "success": False,
                    "response_time_ms": response_time_ms,
                    "error": f"HTTP {response.status_code}: {response.text}",
                    "timestamp": datetime.now().isoformat()
                }
                
        except Exception as e:
            if attempt < max_retries:
                time.sleep(1)  # Brief wait before retry
                continue
            return {
                "model": model,
                "success": False,
                "response_time_ms": int((time.time() - start_time) * 1000),
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            }
    
    # Should not reach here, but fallback
    return {
        "model": model,
        "success": False,
        "response_time_ms": 0,
        "error": "Max retries exceeded",
        "timestamp": datetime.now().isoformat()
    }

def test_models(api_key, models, user_input="4rr443.servicevnow.com"):
    """Test all models with up to 16 parallel requests."""
    
    # Updated SOC Analyst Assistant prompt (conversational format)
    prompt = f"""You are an experienced SOC analyst helping a colleague. Provide clear, conversational analysis that's easy to understand while covering all the critical security details.

=== ANALYSIS REQUEST ===
{user_input}

=== RESPONSE GUIDELINES ===

**For Security Indicators (IPs, domains, hashes, URLs, emails):**
- Start with a clear assessment of what you found
- Explain the threat level in plain language
- Describe what the indicator does and why it's concerning
- Include relevant context about campaigns, attribution, or TTPs
- Mention organizational impact and recommended actions
- Provide technical details in an accessible way

**For General Security Questions:**
- Give practical, actionable guidance
- Explain concepts clearly without jargon when possible
- Include real-world context and examples
- Focus on what matters most for security operations

**Writing Style:**
- Write like you're explaining to a colleague over coffee
- Use natural paragraphs, not rigid formatting
- Include all critical information but make it readable
- Be conversational but professional
- Use bullet points sparingly and only when they improve clarity

**Key Information to Include When Relevant:**
- Threat level and confidence in assessment
- What the indicator does or represents
- Campaign associations or threat actor attribution
- Technical characteristics (infrastructure, certificates, etc.)
- Timeline information (first seen, recent activity)
- Organizational risk and sector targeting
- MITRE ATT&CK techniques when applicable
- Recommended actions or next steps

Remember: Your goal is to provide thorough analysis that's easy to understand and act upon."""

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    results = []
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    log_file = f"llm_test_results_{timestamp}.json"
    
    print(f"Testing {len(models)} models with input: {user_input}")
    print(f"Running up to 16 models in parallel")
    print(f"Results will be logged to: {log_file}")
    print("-" * 80)
    
    # Thread-safe counter for progress tracking
    completed_count = threading.Lock()
    completed = 0
    
    def update_progress(model, result):
        nonlocal completed
        with completed_count:
            completed += 1
            if result["success"]:
                print(f"[{completed}/{len(models)}] ✅ {model} ({result['response_time_ms']}ms, {result.get('tokens', 0)} tokens)")
            else:
                error_msg = result["error"][:50] + "..." if len(result["error"]) > 50 else result["error"]
                print(f"[{completed}/{len(models)}] ❌ {model} - {error_msg}")
    
    # Execute tests with ThreadPoolExecutor (max 8 parallel)
    with ThreadPoolExecutor(max_workers=16) as executor:
        # Submit all tasks
        future_to_model = {
            executor.submit(test_single_model, model, prompt, headers): model 
            for model in models
        }
        
        # Collect results as they complete
        for future in as_completed(future_to_model):
            model = future_to_model[future]
            try:
                result = future.result()
                results.append(result)
                update_progress(model, result)
            except Exception as e:
                # Fallback error handling
                result = {
                    "model": model,
                    "success": False,
                    "response_time_ms": 0,
                    "error": f"Execution error: {str(e)}",
                    "timestamp": datetime.now().isoformat()
                }
                results.append(result)
                update_progress(model, result)
    
    # Sort results by model name to maintain consistency
    results.sort(key=lambda x: x["model"])
    
    # Save results to JSON file
    output = {
        "test_metadata": {
            "input": user_input,
            "timestamp": datetime.now().isoformat(),
            "total_models": len(models),
            "successful": len([r for r in results if r["success"]]),
            "failed": len([r for r in results if not r["success"]]),
            "parallel_workers": 16
        },
        "results": results
    }
    
    with open(log_file, 'w') as f:
        json.dump(output, f, indent=2)
    
    # Print summary
    successful = [r for r in results if r["success"]]
    failed = [r for r in results if not r["success"]]
    
    print("\n" + "=" * 80)
    print("SUMMARY")
    print("=" * 80)
    print(f"Total models tested: {len(models)}")
    print(f"Successful: {len(successful)}")
    print(f"Failed: {len(failed)}")
    print(f"Parallel workers: 8")
    print(f"Results saved to: {log_file}")
    
    if successful:
        print("\nFastest models:")
        successful.sort(key=lambda x: x["response_time_ms"])
        for result in successful[:5]:
            print(f"  {result['model']}: {result['response_time_ms']}ms")

def analyze_results(json_file):
    """Enhanced analysis of test results with quality validation and performance categorization."""
    try:
        with open(json_file, 'r') as f:
            data = json.load(f)
        
        results = data.get('results', [])
        if not results:
            print("❌ No results found in file")
            return
        
        # Basic statistics
        total_results = len(results)
        successful_results = [r for r in results if r.get('success', False)]
        failed_results = [r for r in results if not r.get('success', False)]
        
        # Performance analysis (< 5 second response time = < 5000ms)
        fast_results = [r for r in successful_results if r.get('response_time_ms', 0) < 5000]
        
        print(f"\n📊 Test Results Summary:")
        print(f"Total tests: {total_results}")
        print(f"Successful: {len(successful_results)} ({len(successful_results)/total_results*100:.1f}%)")
        print(f"Failed: {len(failed_results)} ({len(failed_results)/total_results*100:.1f}%)")
        print(f"Fast responses (<5s): {len(fast_results)} ({len(fast_results)/len(successful_results)*100:.1f}% of successful)")
        
        # Initialize variables to avoid unbound issues
        quality_results = []
        response_times = []
        
        if successful_results:
            # Quality Analysis (if quality data available)
            quality_results = [r for r in successful_results if 'quality_valid' in r]
            if quality_results:
                high_quality = [r for r in quality_results if r.get('quality_valid', False)]
                quality_scores = [r.get('quality_score', 0) for r in quality_results if 'quality_score' in r]
                
                print(f"\n🎯 Quality Analysis:")
                print(f"High Quality Responses: {len(high_quality)} ({len(high_quality)/len(quality_results)*100:.1f}%)")
                if quality_scores:
                    avg_quality = sum(quality_scores) / len(quality_scores)
                    print(f"Average Quality Score: {avg_quality:.2f}")
                
                # Performance categories
                categories = {}
                for result in quality_results:
                    category = result.get('performance_category', 'Unknown')
                    categories[category] = categories.get(category, 0) + 1
                
                print(f"\n⚡ Performance Categories:")
                for category, count in sorted(categories.items()):
                    print(f"{category}: {count} models ({count/len(quality_results)*100:.1f}%)")
            
            # Response time statistics
            response_times = [r['response_time_ms'] for r in successful_results if 'response_time_ms' in r]
            if response_times:
                avg_time = sum(response_times) / len(response_times)
                min_time = min(response_times)
                max_time = max(response_times)
                print(f"\n⏱️  Response Time Stats:")
                print(f"Average: {avg_time/1000:.2f}s")
                print(f"Fastest: {min_time/1000:.2f}s")
                print(f"Slowest: {max_time/1000:.2f}s")
            
            # Token statistics
            tokens = [r['tokens'] for r in successful_results if 'tokens' in r and r['tokens'] > 0]
            if tokens:
                avg_tokens = sum(tokens) / len(tokens)
                min_tokens = min(tokens)
                max_tokens = max(tokens)
                print(f"\n🔢 Token Usage Stats:")
                print(f"Average: {avg_tokens:.0f} tokens")
                print(f"Minimum: {min_tokens} tokens")
                print(f"Maximum: {max_tokens} tokens")
            
            # Production Ready Models (Fast + High Quality)
            if quality_results:
                production_ready = [
                    r for r in quality_results 
                    if r.get('quality_valid', False) and 
                       r.get('response_time_ms', 0) < 5000 and
                       r.get('quality_score', 0) >= 0.8
                ]
                
                print(f"\n🚀 Production Ready Models ({len(production_ready)}):")
                print("   (Fast <5s + High Quality + Score ≥0.8)")
                production_ready.sort(key=lambda x: x.get('response_time_ms', float('inf')))
                for i, result in enumerate(production_ready[:10], 1):
                    model = result['model']
                    time_ms = result.get('response_time_ms', 0)
                    tokens = result.get('tokens', 0)
                    score = result.get('quality_score', 0)
                    print(f"{i}. {model}: {time_ms/1000:.2f}s, {tokens} tokens, Q:{score:.2f}")
            
            # Top performers by speed
            print(f"\n🏆 Top 5 Fastest Models:")
            sorted_results = sorted(successful_results, key=lambda x: x.get('response_time_ms', float('inf')))
            for i, result in enumerate(sorted_results[:5], 1):
                model = result['model']
                time_ms = result.get('response_time_ms', 0)
                tokens = result.get('tokens', 0)
                quality_note = ""
                if 'quality_valid' in result:
                    if result.get('quality_valid', False):
                        quality_note = " ✅"
                    else:
                        issues = result.get('quality_issues', [])
                        if issues:
                            quality_note = f" ⚠️  {issues[0]}"
                print(f"{i}. {model}: {time_ms/1000:.2f}s ({tokens} tokens){quality_note}")
            
            # Quality Issues Analysis
            if quality_results:
                all_issues = []
                for result in quality_results:
                    issues = result.get('quality_issues', [])
                    all_issues.extend(issues)
                
                if all_issues:
                    issue_counts = {}
                    for issue in all_issues:
                        issue_counts[issue] = issue_counts.get(issue, 0) + 1
                    
                    print(f"\n⚠️  Common Quality Issues:")
                    for issue, count in sorted(issue_counts.items(), key=lambda x: x[1], reverse=True):
                        print(f"   {issue}: {count} models")
        
        # Enhanced failure analysis
        if failed_results:
            print(f"\n❌ Failed Models ({len(failed_results)}):")
            
            # Categorize failures
            error_types = {}
            for result in failed_results:
                error = result.get('error', 'Unknown error')
                if '429' in error:
                    error_type = "Rate Limited (429)"
                elif '404' in error:
                    error_type = "Model Not Found (404)"
                elif '502' in error:
                    error_type = "Provider Error (502)"
                elif 'No endpoints found' in error:
                    error_type = "No Available Endpoints"
                elif 'timeout' in error.lower():
                    error_type = "Timeout"
                else:
                    error_type = "Other Error"
                
                error_types[error_type] = error_types.get(error_type, 0) + 1
            
            print("   Error breakdown:")
            for error_type, count in sorted(error_types.items(), key=lambda x: x[1], reverse=True):
                print(f"   - {error_type}: {count}")
            
            print("\n   First 10 failed models:")
            for result in failed_results[:10]:
                model = result['model']
                error = result.get('error', 'Unknown error')
                # Truncate long error messages
                if len(error) > 80:
                    error = error[:77] + "..."
                print(f"   {model}: {error}")
            
            if len(failed_results) > 10:
                print(f"   ... and {len(failed_results) - 10} more failures")
        
        # Recommendations
        print(f"\n💡 Recommendations:")
        if len(failed_results) > len(successful_results) * 0.3:  # >30% failure rate
            print("   - High failure rate detected - consider using enhanced filtering")
        
        if quality_results:
            low_quality = len(quality_results) - len([r for r in quality_results if r.get('quality_valid', False)])
            if low_quality > len(quality_results) * 0.2:  # >20% low quality
                print("   - Many models have quality issues - focus on production-ready models")
        
        if response_times and sum(response_times) / len(response_times) > 10000:  # >10s average
            print("   - Average response time is high - prioritize faster models for production")
        
        if successful_results:
            production_count = len([r for r in successful_results 
                                  if r.get('response_time_ms', 0) < 5000 and 
                                     r.get('quality_valid', True)])
            print(f"   - Consider focusing on the {production_count} fastest, high-quality models for production use")
    
    except Exception as e:
        print(f"❌ Error analyzing results: {str(e)}")

def main():
    parser = argparse.ArgumentParser(description="Test LLM models with SOC Analyst prompt")
    parser.add_argument("--api-key", "-k", help="OpenRouter API key")
    parser.add_argument("--input", "-i", default="4rr443.servicevnow.com", 
                       help="Input to analyze (default: 4rr443.servicevnow.com)")
    
    # Model management arguments
    parser.add_argument("--update-models", action="store_true", 
                       help="Fetch latest models from OpenRouter API")
    parser.add_argument("--save-models", type=str, 
                       help="Save fetched models to JSON file")
    parser.add_argument("--load-models", type=str, 
                       help="Load models from JSON file")
    parser.add_argument("--max-price", type=float, default=0.5,
                       help="Maximum price per 1K tokens (default: 0.5)")
    parser.add_argument("--min-context", type=int, default=8000,
                       help="Minimum context length (default: 8000)")
    
    # Analysis argument
    parser.add_argument("--analyze", "-a", type=str,
                       help="Analyze results from JSON file")
    
    args = parser.parse_args()
    
    # If analyzing results, do that instead of testing
    if args.analyze:
        analyze_results(args.analyze)
        return 0
        
    # Testing requires API key
    if not args.api_key:
        print("❌ API key required for testing (use --api-key)")
        return 1
    
    # Get the appropriate model list
    models = get_model_list(args.api_key, args)
    
    if not models:
        print("❌ No models available for testing")
        return 1
    
    # Test the models
    test_models(args.api_key, models, args.input)
    return 0

if __name__ == "__main__":
    main()
