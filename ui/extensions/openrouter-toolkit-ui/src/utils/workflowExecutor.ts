// src/utils/workflowExecutor.ts

import FalconApi from '@crowdstrike/foundry-js';
import { formatErrorMessage, wait } from './helpers';
import { responseCache } from './cache';
import { generateCacheKey } from './helpers';
import type { LLMResponse } from '../types';

/**
 * Interface for workflow execution parameters
 */
export interface WorkflowExecutionParams {
  query: string;
  model: string;
  temperature: number;
  online: boolean;
  providerSort: string;
  selectedContext: string;
  enableCaching: boolean;
}

/**
 * Interface for workflow execution result
 */
export interface WorkflowExecutionResult {
  success: boolean;
  content?: string;
  error?: string;
  fromCache?: boolean;
}

/**
 * Interface for workflow polling result
 */
interface WorkflowPollResult {
  status: string;
  output_data?: any;
  error?: string;
}

/**
 * Maximum number of polling attempts
 */
const MAX_POLL_ATTEMPTS = 30;

/**
 * Polling interval in milliseconds
 */
const POLL_INTERVAL = 2000;

/**
 * Build workflow execution payload
 * @param params - Workflow execution parameters
 * @returns Formatted payload for workflow execution
 */
const buildWorkflowPayload = (params: WorkflowExecutionParams): Record<string, any> => {
  const { query, model, temperature, online, providerSort, selectedContext } = params;

  const payload: Record<string, any> = {
    user_prompt_input: query,
    model_name_input: model,
    temperature_input: String(temperature), // Convert to string for API
    online_search_input: online,
    provider_sort_input: providerSort
  };

  // Add context if selected
  if (selectedContext && selectedContext.trim()) {
    payload.context_input = selectedContext;
  }

  return payload;
};

/**
 * Execute workflow via Falcon API
 * @param falcon - Falcon API instance
 * @param payload - Workflow execution payload
 * @returns Promise with workflow execution response
 */
const executeWorkflow = async (
  falcon: FalconApi, 
  payload: Record<string, any>
): Promise<any> => {
  const config = {
    workflow_id: "OpenRouter_Toolkit_Query"
  };

  try {
    const response = await falcon.api.workflows.postEntitiesExecuteV1(payload, config);
    
    if (response.errors && response.errors.length > 0) {
      throw new Error(response.errors[0]?.message || 'Workflow execution failed');
    }

    if (!response.resources || response.resources.length === 0) {
      throw new Error('No workflow execution ID returned');
    }

    return response;
  } catch (error) {
    console.error('Workflow execution error:', error);
    throw error;
  }
};

/**
 * Poll workflow for completion
 * @param falcon - Falcon API instance
 * @param workflowId - Workflow execution ID
 * @returns Promise with workflow completion result
 */
const pollWorkflowCompletion = async (
  falcon: FalconApi, 
  workflowId: string
): Promise<WorkflowPollResult> => {
  let attempts = 0;

  while (attempts < MAX_POLL_ATTEMPTS) {
    try {
      const result = await falcon.api.workflows.getEntitiesExecutionResultsV1({ ids: [workflowId] });

      if (result.errors && result.errors.length > 0) {
        throw new Error(result.errors[0]?.message || 'Failed to get workflow results');
      }

      if (!result.resources || result.resources.length === 0) {
        throw new Error('No workflow results found');
      }

      const workflowResult = result.resources[0] as any;
      
      // Check if workflow is complete
      if (workflowResult.status === 'Completed') {
        return {
          status: 'Completed',
          output_data: workflowResult.output_data
        };
      }

      // Check if workflow failed
      if (workflowResult.status === 'Failed') {
        return {
          status: 'Failed',
          error: 'Workflow execution failed'
        };
      }

      // Still running, wait and try again
      if (workflowResult.status === 'InProgress' || workflowResult.status === 'Running' || workflowResult.status === 'Pending') {
        attempts++;
        if (attempts < MAX_POLL_ATTEMPTS) {
          await wait(POLL_INTERVAL);
          continue;
        } else {
          throw new Error('Workflow execution timed out');
        }
      }

      // Unknown status
      throw new Error(`Unknown workflow status: ${workflowResult.status}`);

    } catch (error) {
      console.error(`Polling attempt ${attempts + 1} failed:`, error);
      
      // If this is the last attempt, throw the error
      if (attempts >= MAX_POLL_ATTEMPTS - 1) {
        throw error;
      }
      
      // Otherwise, wait and try again
      attempts++;
      await wait(POLL_INTERVAL);
    }
  }

  throw new Error('Workflow polling timed out after maximum attempts');
};

/**
 * Recursively extract string content from nested object
 * @param obj - Object to search for string content
 * @returns First string value found or null
 */
const findStringInNestedObject = (obj: any): string | null => {
  if (typeof obj === 'string') {
    return obj;
  }
  
  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    for (const value of Object.values(obj)) {
      const result = findStringInNestedObject(value);
      if (result) {
        return result;
      }
    }
  }
  
  return null;
};

/**
 * Extract content from workflow output
 * @param outputData - Workflow output data
 * @returns Extracted content string
 */
const extractWorkflowContent = (outputData: any): string => {
  if (!outputData) {
    throw new Error('No output data received from workflow');
  }

  // Try different possible content fields
  let content = '';
  
  if (outputData.content) {
    content = outputData.content;
  } else if (outputData.response) {
    content = outputData.response;
  } else if (outputData.result) {
    content = outputData.result;
  } else if (outputData.output) {
    content = outputData.output;
  } else if (typeof outputData === 'string') {
    content = outputData;
  } else {
    // Try to extract from nested structure
    const keys = Object.keys(outputData);
    if (keys.length > 0) {
      const firstKey = keys[0];
      if (firstKey) {
        const firstValue = outputData[firstKey];
        if (typeof firstValue === 'string') {
          content = firstValue;
        } else if (firstValue && typeof firstValue === 'object') {
          // First check for common content fields
          if (firstValue.content) {
            content = firstValue.content;
          } else {
            // Recursively search for any string content
            const nestedContent = findStringInNestedObject(firstValue);
            if (nestedContent) {
              content = nestedContent;
            }
          }
        }
      }
    }
  }

  if (!content || typeof content !== 'string') {
    console.error('Unable to extract content from output data:', outputData);
    throw new Error('Unable to extract content from workflow output');
  }

  // Validate content is not empty
  if (!content.trim()) {
    throw new Error('Workflow completed but produced no content');
  }

  return content.trim();
};

/**
 * Check cache for existing response
 * @param params - Workflow execution parameters
 * @returns Cached response or null
 */
const checkCache = (params: WorkflowExecutionParams): string | null => {
  if (!params.enableCaching) {
    return null;
  }

  try {
    const cacheKey = generateCacheKey(
      params.query,
      params.model,
      params.temperature,
      params.online,
      params.providerSort
    );
    
    const cachedResponse = responseCache.get(cacheKey);
    return cachedResponse?.content || null;
  } catch (error) {
    console.warn('Cache check failed:', error);
    return null;
  }
};

/**
 * Save response to cache
 * @param params - Workflow execution parameters
 * @param content - Response content to cache
 */
const saveResponseToCache = (params: WorkflowExecutionParams, content: string): void => {
  if (!params.enableCaching) {
    return;
  }

  try {
    const cacheKey = generateCacheKey(
      params.query,
      params.model,
      params.temperature,
      params.online,
      params.providerSort
    );
    
    const llmResponse: LLMResponse = {
      content,
      model: params.model
    };
    
    responseCache.set(cacheKey, llmResponse);
  } catch (error) {
    console.warn('Cache save failed:', error);
  }
};

/**
 * Validate workflow execution parameters
 * @param params - Parameters to validate
 * @returns Validation result
 */
const validateWorkflowParams = (params: WorkflowExecutionParams): { isValid: boolean; error?: string } => {
  if (!params.query || typeof params.query !== 'string' || !params.query.trim()) {
    return { isValid: false, error: 'Query is required' };
  }

  if (!params.model || typeof params.model !== 'string') {
    return { isValid: false, error: 'Model is required' };
  }

  if (typeof params.temperature !== 'number' || params.temperature < 0 || params.temperature > 2) {
    return { isValid: false, error: 'Temperature must be between 0 and 2' };
  }

  if (typeof params.online !== 'boolean') {
    return { isValid: false, error: 'Online search flag must be boolean' };
  }

  if (!params.providerSort || typeof params.providerSort !== 'string') {
    return { isValid: false, error: 'Provider sort is required' };
  }

  return { isValid: true };
};

/**
 * Execute workflow with full error handling and caching
 * Main function to execute LLM workflow
 * @param falcon - Falcon API instance
 * @param params - Workflow execution parameters
 * @returns Promise with workflow execution result
 */
export const executeWorkflowWithCache = async (
  falcon: FalconApi,
  params: WorkflowExecutionParams
): Promise<WorkflowExecutionResult> => {
  try {
    // Validate parameters
    const validation = validateWorkflowParams(params);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.error || 'Validation failed'
      };
    }

    // Check cache first
    const cachedResponse = checkCache(params);
    if (cachedResponse) {
      return {
        success: true,
        content: cachedResponse,
        fromCache: true
      };
    }

    // Build payload
    const payload = buildWorkflowPayload(params);
    console.log('Executing workflow with payload:', payload);

    // Execute workflow
    const executionResponse = await executeWorkflow(falcon, payload);
    const workflowId = executionResponse.resources[0];
    
    console.log('Workflow execution started:', workflowId);

    // Poll for completion
    const pollResult = await pollWorkflowCompletion(falcon, workflowId);
    
    if (pollResult.status === 'Failed') {
      return {
        success: false,
        error: pollResult.error || 'Workflow execution failed'
      };
    }

    // Extract content
    const content = extractWorkflowContent(pollResult.output_data);
    
    // Save to cache
    saveResponseToCache(params, content);

    return {
      success: true,
      content,
      fromCache: false
    };

  } catch (error) {
    console.error('Workflow execution error:', error);
    return {
      success: false,
      error: formatErrorMessage(error)
    };
  }
};

/**
 * Cancel workflow execution (if supported)
 * @param falcon - Falcon API instance
 * @param workflowId - Workflow execution ID to cancel
 * @returns Promise with cancellation result
 */
export const cancelWorkflowExecution = async (
  _falcon: FalconApi,
  workflowId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Note: This depends on the Falcon API supporting workflow cancellation
    // Implementation may vary based on available API endpoints
    console.log('Attempting to cancel workflow:', workflowId);
    
    // If cancellation API is available, use it here
    // For now, we'll just log the attempt
    
    return { success: true };
  } catch (error) {
    console.error('Workflow cancellation error:', error);
    return {
      success: false,
      error: formatErrorMessage(error)
    };
  }
};

/**
 * Get workflow execution status
 * @param falcon - Falcon API instance
 * @param workflowId - Workflow execution ID
 * @returns Promise with workflow status
 */
export const getWorkflowStatus = async (
  falcon: FalconApi,
  workflowId: string
): Promise<{ status: string; error?: string }> => {
  try {
    const result = await falcon.api.workflows.getEntitiesExecutionResultsV1({ 
      ids: [workflowId] 
    });

    if (result.errors && result.errors.length > 0) {
      throw new Error(result.errors[0]?.message || 'Failed to get workflow status');
    }

    if (!result.resources || result.resources.length === 0) {
      throw new Error('No workflow status found');
    }

    const workflowResult = result.resources[0] as any;
    return { status: workflowResult.status || 'Unknown' };

  } catch (error) {
    console.error('Get workflow status error:', error);
    return {
      status: 'Unknown',
      error: formatErrorMessage(error)
    };
  }
};
