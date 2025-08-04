// src/utils/helpers.ts

import { MODEL_GROUPS } from './constants';

/**
 * Wait for a specified amount of time
 * @param ms - Time to wait in milliseconds
 * @returns Promise that resolves after the specified time
 */
export const wait = (ms: number = 1000): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));


/**
 * Create display model name with online suffix if needed
 * @param modelName - Base model name
 * @param online - Whether online search is enabled
 * @returns Display model name
 */
export const getDisplayModelName = (modelName: string, online: boolean): string => {
  return online ? `${modelName}:online` : modelName;
};

/**
 * Generate a cache key for LLM requests
 * @param query - User query
 * @param model - Model name
 * @param temperature - Temperature setting
 * @param online - Whether online search is enabled
 * @param providerSort - Provider sorting preference
 * @returns Cache key string
 */
export const generateCacheKey = (
  query: string, 
  model: string, 
  temperature: number, 
  online: boolean, 
  providerSort: string
): string => {
  return `${model}:${temperature}:${online}:${providerSort}:${btoa(query.slice(0, 100))}`;
};

/**
 * Validate query input
 * @param query - Query string to validate
 * @returns Validation result
 */
export const validateQuery = (query: string): { isValid: boolean; error?: string } => {
  if (!query || typeof query !== 'string') {
    return { isValid: false, error: 'Query is required' };
  }
  
  const trimmed = query.trim();
  if (trimmed.length === 0) {
    return { isValid: false, error: 'Query cannot be empty' };
  }
  
  if (trimmed.length > 10000) {
    return { isValid: false, error: 'Query is too long (max 10,000 characters)' };
  }
  
  return { isValid: true };
};

/**
 * Format error message for display
 * @param error - Error object or string
 * @returns Formatted error message
 */
export const formatErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') {
    return error;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }
  
  return 'An unexpected error occurred';
};

/**
 * Debounce function to limit API calls
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => func(...args), delay);
  };
};

/**
 * Check if the current environment is development
 * @returns True if in development mode
 */
export const isDevelopment = (): boolean => {
  // Check for build-time environment variable or development flag
  return Boolean(
    (globalThis as any).__DEV__ || 
    (typeof window !== 'undefined' && (window as any).__DEV__)
  );
};

/**
 * Safely parse JSON with error handling
 * @param jsonString - JSON string to parse
 * @returns Parsed object or null if parsing fails
 */
export const safeJsonParse = <T = any>(jsonString: string): T | null => {
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return null;
  }
};
