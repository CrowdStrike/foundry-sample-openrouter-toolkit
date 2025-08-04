// src/utils/constants.ts

export interface TemperatureOption {
  value: number;
  label: string;
}

export interface ModelGroups {
  [groupName: string]: string[];
}

export const MODEL_GROUPS: ModelGroups = {
  "Amazon": [
    "amazon/olympus-pro-v1",
    "amazon/olympus-mini-v1",
    "amazon/nova-medium-v1"
  ],
  "Anthropic": [
    "anthropic/claude-3-sonnet",
    "anthropic/claude-3-haiku",
    "anthropic/claude-3-instant"
  ],
  "Cohere": [
    "cohere/command-r",
    "cohere/command-a",
    "cohere/command-light"
  ],
  "Google": [
    "google/gemma-2-9b-it",
    "google/gpt-tychant-9b",
    "google/t5-flan-ultra-11b"
  ],
  "Meta": [
    "meta-llama/llama-3.3-70b-instruct",
    "meta-llama/llama-3.2-8b-halcyon",
    "meta-llama/llama-3.1-70b-vision"
  ],
  "Microsoft": [
    "microsoft/phi-3-mini-128k-instruct",
    "microsoft/phi-3-base-128k-instruct",
    "microsoft/research-phicus-33b"
  ],
  "MistralAI": [
    "mistralai/mixtral-8x7b-instruct",
    "mistralai/mixtral-8x22b-instruct",
    "mistralai/mistral-7b-instruct"
  ],
  "OpenAI": [
    "openai/o3-mini-high",
    "openai/o3",
    "openai/gpt-4.1-mini"
  ],
  "StabilityAI": [
    "stabilityai/stable-lm-15b-4e1t-instruct",
    "stabilityai/stable-lm-3b-4e1t-instruct",
    "stabilityai/stable-lm-7b-4e1t-instruct"
  ],
  "xAI": [
    "x-ai/grok-3",
    "x-ai/grok-3-mini",
    "x-ai/grok-2"
  ],
  "Others": [
    "raifle/sorcererlm-8x22b",
    "nousresearch/nous-hermes-2-mixtral-8x7b-dpo",
    "nousresearch/hermes-2-pro-llama-3-8b",
    "aion-labs/aion-1.0-mini",
    "mancer/weaver",
    "neversleep/noromaid-20b",
    "neversleep/llama-3.1-lumimaid-8b",
    "sao10k/l3.1-euryale-70b",
    "deepseek/deepseek-r1-distill-llama-8b",
    "aetherwiing/mn-starcannon-12b"
  ]
} as const;

// Temperature options with labels
export const TEMPERATURE_OPTIONS: readonly TemperatureOption[] = [
  { value: 0.0, label: "0.0 - Precise" },
  { value: 0.1, label: "0.1" },
  { value: 0.2, label: "0.2 - Focused" },
  { value: 0.3, label: "0.3" },
  { value: 0.4, label: "0.4 - Balanced" },
  { value: 0.5, label: "0.5" },
  { value: 0.6, label: "0.6 - Flexible" },
  { value: 0.7, label: "0.7" },
  { value: 0.8, label: "0.8 - Varied" },
  { value: 0.9, label: "0.9" },
  { value: 1.0, label: "1.0 - Creative" }
] as const;

// Provider sort options for OpenRouter
export interface ProviderSortOption {
  value: string;
  label: string;
  tooltip: string;
}

export const PROVIDER_SORT_OPTIONS: readonly ProviderSortOption[] = [
  {
    value: "throughput",
    label: "Throughput",
    tooltip: "Prioritize providers with highest throughput (fastest response generation). Best for real-time applications."
  },
  {
    value: "price", 
    label: "Price",
    tooltip: "Prioritize providers with lowest cost per token. Best for cost-conscious usage and bulk processing."
  },
  {
    value: "latency",
    label: "Latency", 
    tooltip: "Prioritize providers with lowest response latency (fastest time to first token). Best for interactive experiences."
  }
] as const;

// Default values
export const DEFAULT_MODEL = "openai/gpt-4.1-mini";
export const DEFAULT_TEMPERATURE = 0.4;
export const DEFAULT_PROVIDER_SORT = "throughput";

// Cache configuration
export const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds
export const MAX_CACHE_SIZE = 100;

// API configuration
export const WORKFLOW_POLL_INTERVAL = 2000; // 2 seconds
export const MAX_POLL_ATTEMPTS = 150; // 5 minutes total (150 * 2s)
export const REQUEST_TIMEOUT = 30000; // 30 seconds

// UI configuration
export const DEBOUNCE_DELAY = 300; // milliseconds
export const MAX_QUERY_LENGTH = 10000; // characters
export const MIN_QUERY_LENGTH = 1; // characters
