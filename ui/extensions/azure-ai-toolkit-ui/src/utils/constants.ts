// src/utils/constants.ts

export interface TemperatureOption {
  value: number;
  label: string;
}

export interface ModelGroups {
  [groupName: string]: string[];
}

export const MODEL_GROUPS: ModelGroups = {
  "Azure AI": [
    "gpt-5"
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

// Default values
export const DEFAULT_MODEL = "gpt-5";
export const DEFAULT_TEMPERATURE = 1.0;

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
