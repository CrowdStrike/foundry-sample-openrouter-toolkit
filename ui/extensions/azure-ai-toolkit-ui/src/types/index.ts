// Core Foundry types
export interface FalconData {
  incident?: {
    id: string;
    name: string;
    description?: string;
    created_date?: string;
    modified_date?: string;
    status?: string;
    severity?: number;
  };
  detection?: {
    id: string;
    name: string;
    description?: string;
    created_date?: string;
    severity?: string;
  };
  host?: {
    id: string;
    hostname?: string;
    platform?: string;
    os_version?: string;
  };
}

export interface FalconContext {
  data?: FalconData;
  api: {
    workflows: {
      postEntitiesExecuteV1: (payload: WorkflowPayload, config?: any) => Promise<WorkflowPendingResponse>;
      getEntitiesExecutionResultsV1: (ids: string[], config?: any) => Promise<WorkflowResultResponse>;
    };
  };
}

// Workflow types
export interface WorkflowPayload {
  definition_id?: string;
  name?: string;
  parameters?: Record<string, any>;
}

export interface WorkflowPendingResponse {
  errors?: Array<{ message: string; code?: number }>;
  resources?: string[];
  meta?: {
    query_time: number;
    pagination?: {
      offset: number;
      limit: number;
      total: number;
    };
  };
}

export interface WorkflowResultResponse {
  errors?: Array<{ message: string; code?: number }>;
  resources?: Array<{
    id: string;
    status: 'InProgress' | 'Completed' | 'Failed' | 'Cancelled';
    output_data?: {
      content?: string;
      [key: string]: any;
    };
    created_date?: string;
    last_updated?: string;
  }>;
  meta?: {
    query_time: number;
  };
}

// LLM API types
export interface LLMResponse {
  content: string;
  model: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  finish_reason?: string;
}

export interface LLMError {
  message: string;
  code?: string;
  type?: string;
  retryable?: boolean;
}

// Component props types
export interface QueryFormProps {
  onSubmit: (query: string, model: string, temperature: number) => Promise<void>;
  loading: boolean;
  availableModels: ModelOption[];
}

export interface ResponseDisplayProps {
  response: string;
  loading: boolean;
  error: string | null;
  onClear: () => void;
}

export interface ModelOption {
  value: string;
  label: string;
  description?: string;
  maxTokens?: number;
  costPer1kTokens?: number;
}

// Hook return types
export interface UseFalconApiReturn {
  isInitialized: boolean;
  falcon: FalconContext | null;
  error: string | null;
}

// Cache types
export interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
  ttl: number;
}

export interface ResponseCache {
  get: (key: string) => LLMResponse | null;
  set: (key: string, value: LLMResponse, ttl?: number) => void;
  clear: () => void;
  size: () => number;
}

// Error boundary types
export interface ErrorInfo {
  componentStack: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

// Build info types
export interface BuildInfo {
  buildNumber: string;
  buildDate: string;
  isDevelopment: boolean;
}
