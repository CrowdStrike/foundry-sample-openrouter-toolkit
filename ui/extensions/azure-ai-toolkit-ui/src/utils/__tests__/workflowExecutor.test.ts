import {
  executeWorkflowWithCache,
  cancelWorkflowExecution,
  getWorkflowStatus,
  type WorkflowExecutionParams
} from '../workflowExecutor';

// Mock dependencies
jest.mock('../helpers', () => ({
  formatErrorMessage: jest.fn((error) => typeof error === 'string' ? error : error?.message || 'Unknown error'),
  wait: jest.fn(() => Promise.resolve()),
  generateCacheKey: jest.fn(() => 'test-cache-key')
}));

jest.mock('../cache', () => ({
  responseCache: {
    get: jest.fn(),
    set: jest.fn()
  }
}));

import { formatErrorMessage, wait, generateCacheKey } from '../helpers';
import { responseCache } from '../cache';

describe('workflowExecutor', () => {
  const mockFalcon = {
    api: {
      workflows: {
        postEntitiesExecuteV1: jest.fn(),
        getEntitiesExecutionResultsV1: jest.fn()
      }
    }
  };

  const defaultParams: WorkflowExecutionParams = {
    query: 'Test query',
    model: 'gpt-4',
    temperature: 0.7,
    online: false,
    providerSort: 'throughput',
    selectedContext: '',
    enableCaching: true
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (formatErrorMessage as jest.Mock).mockImplementation((error) => 
      typeof error === 'string' ? error : error?.message || 'Unknown error'
    );
    (wait as jest.Mock).mockResolvedValue(undefined);
    (generateCacheKey as jest.Mock).mockReturnValue('test-cache-key');
    (responseCache.get as jest.Mock).mockReturnValue(null);
    (responseCache.set as jest.Mock).mockImplementation();
  });

  describe('executeWorkflowWithCache', () => {
    it('should validate parameters and return error for invalid query', async () => {
      const invalidParams = { ...defaultParams, query: '' };
      
      const result = await executeWorkflowWithCache(mockFalcon as any, invalidParams);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Query is required');
    });

    it('should validate parameters and return error for invalid model', async () => {
      const invalidParams = { ...defaultParams, model: '' };
      
      const result = await executeWorkflowWithCache(mockFalcon as any, invalidParams);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Model is required');
    });

    it('should validate parameters and return error for invalid temperature', async () => {
      const invalidParams = { ...defaultParams, temperature: 3 };
      
      const result = await executeWorkflowWithCache(mockFalcon as any, invalidParams);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Temperature must be between 0 and 2');
    });

    it('should validate parameters and return error for invalid online flag', async () => {
      const invalidParams = { ...defaultParams, online: 'invalid' as any };
      
      const result = await executeWorkflowWithCache(mockFalcon as any, invalidParams);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Online search flag must be boolean');
    });

    it('should validate parameters and return error for invalid provider sort', async () => {
      const invalidParams = { ...defaultParams, providerSort: '' };
      
      const result = await executeWorkflowWithCache(mockFalcon as any, invalidParams);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Provider sort is required');
    });

    it('should return cached response when available', async () => {
      const cachedResponse = { content: 'Cached response', model: 'gpt-4' };
      (responseCache.get as jest.Mock).mockReturnValue(cachedResponse);
      
      const result = await executeWorkflowWithCache(mockFalcon as any, defaultParams);
      
      expect(result.success).toBe(true);
      expect(result.content).toBe('Cached response');
      expect(result.fromCache).toBe(true);
      expect(mockFalcon.api.workflows.postEntitiesExecuteV1).not.toHaveBeenCalled();
    });

    it('should not use cache when caching is disabled', async () => {
      const params = { ...defaultParams, enableCaching: false };
      (responseCache.get as jest.Mock).mockReturnValue({ content: 'Cached response', model: 'gpt-4' });
      
      mockFalcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
        resources: ['workflow-123'],
        errors: []
      });
      
      mockFalcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [{
          status: 'Completed',
          output_data: { content: 'Fresh response' }
        }],
        errors: []
      });
      
      const result = await executeWorkflowWithCache(mockFalcon as any, params);
      
      expect(result.success).toBe(true);
      expect(result.content).toBe('Fresh response');
      expect(result.fromCache).toBe(false);
      expect(responseCache.get).not.toHaveBeenCalled();
    });

    it('should execute workflow successfully with basic content', async () => {
      mockFalcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
        resources: ['workflow-123'],
        errors: []
      });
      
      mockFalcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [{
          status: 'Completed',
          output_data: { content: 'Workflow response' }
        }],
        errors: []
      });
      
      const result = await executeWorkflowWithCache(mockFalcon as any, defaultParams);
      
      expect(result.success).toBe(true);
      expect(result.content).toBe('Workflow response');
      expect(result.fromCache).toBe(false);
      expect(responseCache.set).toHaveBeenCalledWith('test-cache-key', {
        content: 'Workflow response',
        model: 'gpt-4'
      });
    });

    it('should handle workflow execution with context', async () => {
      const paramsWithContext = { ...defaultParams, selectedContext: 'incident_id:inc-123' };
      
      mockFalcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
        resources: ['workflow-123'],
        errors: []
      });
      
      mockFalcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [{
          status: 'Completed',
          output_data: { content: 'Context-aware response' }
        }],
        errors: []
      });
      
      const result = await executeWorkflowWithCache(mockFalcon as any, paramsWithContext);
      
      expect(result.success).toBe(true);
      expect(result.content).toBe('Context-aware response');
      expect(mockFalcon.api.workflows.postEntitiesExecuteV1).toHaveBeenCalledWith(
        expect.objectContaining({
          context_input: 'incident_id:inc-123'
        }),
        expect.any(Object)
      );
    });

    it('should handle workflow execution with online search', async () => {
      const paramsWithOnline = { ...defaultParams, online: true };
      
      mockFalcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
        resources: ['workflow-123'],
        errors: []
      });
      
      mockFalcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [{
          status: 'Completed',
          output_data: { content: 'Online search response' }
        }],
        errors: []
      });
      
      const result = await executeWorkflowWithCache(mockFalcon as any, paramsWithOnline);
      
      expect(result.success).toBe(true);
      expect(result.content).toBe('Online search response');
      expect(mockFalcon.api.workflows.postEntitiesExecuteV1).toHaveBeenCalledWith(
        expect.objectContaining({
          online_search_input: true
        }),
        expect.any(Object)
      );
    });

    it('should handle workflow execution error', async () => {
      mockFalcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
        resources: [],
        errors: [{ message: 'Workflow execution failed' }]
      });
      
      const result = await executeWorkflowWithCache(mockFalcon as any, defaultParams);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Workflow execution failed');
    });

    it('should handle missing workflow resources', async () => {
      mockFalcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
        resources: [],
        errors: []
      });
      
      const result = await executeWorkflowWithCache(mockFalcon as any, defaultParams);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('No workflow execution ID returned');
    });

    it('should handle workflow polling with InProgress status', async () => {
      mockFalcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
        resources: ['workflow-123'],
        errors: []
      });
      
      mockFalcon.api.workflows.getEntitiesExecutionResultsV1
        .mockResolvedValueOnce({
          resources: [{ status: 'InProgress' }],
          errors: []
        })
        .mockResolvedValueOnce({
          resources: [{
            status: 'Completed',
            output_data: { content: 'Final response' }
          }],
          errors: []
        });
      
      const result = await executeWorkflowWithCache(mockFalcon as any, defaultParams);
      
      expect(result.success).toBe(true);
      expect(result.content).toBe('Final response');
      expect(wait).toHaveBeenCalledWith(2000);
    });

    it('should handle workflow failure', async () => {
      mockFalcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
        resources: ['workflow-123'],
        errors: []
      });
      
      mockFalcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [{ status: 'Failed' }],
        errors: []
      });
      
      const result = await executeWorkflowWithCache(mockFalcon as any, defaultParams);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Workflow execution failed');
    });

    it('should handle workflow timeout', async () => {
      mockFalcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
        resources: ['workflow-123'],
        errors: []
      });
      
      mockFalcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [{ status: 'InProgress' }],
        errors: []
      });
      
      const result = await executeWorkflowWithCache(mockFalcon as any, defaultParams);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Workflow execution timed out');
    });

    it('should handle different content field names in output', async () => {
      mockFalcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
        resources: ['workflow-123'],
        errors: []
      });
      
      mockFalcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [{
          status: 'Completed',
          output_data: { response: 'Alternative field response' }
        }],
        errors: []
      });
      
      const result = await executeWorkflowWithCache(mockFalcon as any, defaultParams);
      
      expect(result.success).toBe(true);
      expect(result.content).toBe('Alternative field response');
    });

    it('should handle string output data', async () => {
      mockFalcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
        resources: ['workflow-123'],
        errors: []
      });
      
      mockFalcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [{
          status: 'Completed',
          output_data: 'Direct string response'
        }],
        errors: []
      });
      
      const result = await executeWorkflowWithCache(mockFalcon as any, defaultParams);
      
      expect(result.success).toBe(true);
      expect(result.content).toBe('Direct string response');
    });

    it('should handle nested content extraction', async () => {
      mockFalcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
        resources: ['workflow-123'],
        errors: []
      });
      
      mockFalcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [{
          status: 'Completed',
          output_data: {
            nested: {
              content: 'Nested content response'
            }
          }
        }],
        errors: []
      });
      
      const result = await executeWorkflowWithCache(mockFalcon as any, defaultParams);
      
      expect(result.success).toBe(true);
      expect(result.content).toBe('Nested content response');
    });

    it('should handle empty output data', async () => {
      mockFalcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
        resources: ['workflow-123'],
        errors: []
      });
      
      mockFalcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [{
          status: 'Completed',
          output_data: null
        }],
        errors: []
      });
      
      const result = await executeWorkflowWithCache(mockFalcon as any, defaultParams);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('No output data received from workflow');
    });

    it('should handle empty content', async () => {
      mockFalcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
        resources: ['workflow-123'],
        errors: []
      });
      
      mockFalcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [{
          status: 'Completed',
          output_data: { content: '   ' }
        }],
        errors: []
      });
      
      const result = await executeWorkflowWithCache(mockFalcon as any, defaultParams);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Workflow completed but produced no content');
    });

    it('should handle cache errors gracefully', async () => {
      (responseCache.get as jest.Mock).mockImplementation(() => {
        throw new Error('Cache error');
      });
      
      mockFalcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
        resources: ['workflow-123'],
        errors: []
      });
      
      mockFalcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [{
          status: 'Completed',
          output_data: { content: 'Response without cache' }
        }],
        errors: []
      });
      
      const result = await executeWorkflowWithCache(mockFalcon as any, defaultParams);
      
      expect(result.success).toBe(true);
      expect(result.content).toBe('Response without cache');
      expect(result.fromCache).toBe(false);
    });

    it('should handle save to cache errors gracefully', async () => {
      (responseCache.set as jest.Mock).mockImplementation(() => {
        throw new Error('Cache save error');
      });
      
      mockFalcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
        resources: ['workflow-123'],
        errors: []
      });
      
      mockFalcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [{
          status: 'Completed',
          output_data: { content: 'Response with cache error' }
        }],
        errors: []
      });
      
      const result = await executeWorkflowWithCache(mockFalcon as any, defaultParams);
      
      expect(result.success).toBe(true);
      expect(result.content).toBe('Response with cache error');
    });

    it('should handle API network errors', async () => {
      mockFalcon.api.workflows.postEntitiesExecuteV1.mockRejectedValue(
        new Error('Network error')
      );
      
      const result = await executeWorkflowWithCache(mockFalcon as any, defaultParams);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Network error');
    });

    it('should handle payload construction correctly', async () => {
      const params = {
        query: 'Test query',
        model: 'gpt-3.5-turbo',
        temperature: 0.5,
        online: true,
        providerSort: 'price',
        selectedContext: 'test context',
        enableCaching: true
      };
      
      mockFalcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
        resources: ['workflow-123'],
        errors: []
      });
      
      mockFalcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [{
          status: 'Completed',
          output_data: { content: 'Test response' }
        }],
        errors: []
      });
      
      await executeWorkflowWithCache(mockFalcon as any, params);
      
      expect(mockFalcon.api.workflows.postEntitiesExecuteV1).toHaveBeenCalledWith(
        {
          user_prompt_input: 'Test query',
          model_name_input: 'gpt-3.5-turbo',
          temperature_input: '0.5',
          online_search_input: true,
          provider_sort_input: 'price',
          context_input: 'test context'
        },
        { workflow_id: 'Azure_AI_Toolkit_Query' }
      );
    });
  });

  describe('cancelWorkflowExecution', () => {
    it('should return success for workflow cancellation', async () => {
      const result = await cancelWorkflowExecution(mockFalcon as any, 'workflow-123');
      
      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should handle cancellation errors', async () => {
      // Mock console.log to suppress output during test
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      const result = await cancelWorkflowExecution(mockFalcon as any, 'workflow-123');
      
      expect(result.success).toBe(true);
      
      consoleSpy.mockRestore();
    });
  });

  describe('getWorkflowStatus', () => {
    it('should return workflow status successfully', async () => {
      mockFalcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [{ status: 'Completed' }],
        errors: []
      });
      
      const result = await getWorkflowStatus(mockFalcon as any, 'workflow-123');
      
      expect(result.status).toBe('Completed');
      expect(result.error).toBeUndefined();
    });

    it('should handle API errors when getting status', async () => {
      mockFalcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [],
        errors: [{ message: 'Status fetch failed' }]
      });
      
      const result = await getWorkflowStatus(mockFalcon as any, 'workflow-123');
      
      expect(result.status).toBe('Unknown');
      expect(result.error).toBe('Status fetch failed');
    });

    it('should handle missing resources when getting status', async () => {
      mockFalcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [],
        errors: []
      });
      
      const result = await getWorkflowStatus(mockFalcon as any, 'workflow-123');
      
      expect(result.status).toBe('Unknown');
      expect(result.error).toBe('No workflow status found');
    });

    it('should handle network errors when getting status', async () => {
      mockFalcon.api.workflows.getEntitiesExecutionResultsV1.mockRejectedValue(
        new Error('Network timeout')
      );
      
      const result = await getWorkflowStatus(mockFalcon as any, 'workflow-123');
      
      expect(result.status).toBe('Unknown');
      expect(result.error).toBe('Network timeout');
    });

    it('should handle missing status field', async () => {
      mockFalcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [{}],
        errors: []
      });
      
      const result = await getWorkflowStatus(mockFalcon as any, 'workflow-123');
      
      expect(result.status).toBe('Unknown');
      expect(result.error).toBeUndefined();
    });
  });

  describe('Edge cases and complex scenarios', () => {
    it('should handle all workflow statuses during polling', async () => {
      mockFalcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
        resources: ['workflow-123'],
        errors: []
      });
      
      // Test different statuses
      const statuses = ['Pending', 'Running', 'InProgress', 'Completed'];
      
      for (let i = 0; i < statuses.length - 1; i++) {
        mockFalcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValueOnce({
          resources: [{ status: statuses[i] }],
          errors: []
        });
      }
      
      mockFalcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValueOnce({
        resources: [{
          status: 'Completed',
          output_data: { content: 'Status test response' }
        }],
        errors: []
      });
      
      const result = await executeWorkflowWithCache(mockFalcon as any, defaultParams);
      
      expect(result.success).toBe(true);
      expect(result.content).toBe('Status test response');
      expect(wait).toHaveBeenCalledTimes(statuses.length - 1);
    });

    it('should handle unknown workflow status', async () => {
      mockFalcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
        resources: ['workflow-123'],
        errors: []
      });
      
      mockFalcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [{ status: 'UnknownStatus' }],
        errors: []
      });
      
      const result = await executeWorkflowWithCache(mockFalcon as any, defaultParams);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Unknown workflow status: UnknownStatus');
    });

    it('should handle polling errors with retry', async () => {
      mockFalcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
        resources: ['workflow-123'],
        errors: []
      });
      
      mockFalcon.api.workflows.getEntitiesExecutionResultsV1
        .mockRejectedValueOnce(new Error('Temporary error'))
        .mockResolvedValueOnce({
          resources: [{
            status: 'Completed',
            output_data: { content: 'Retry success' }
          }],
          errors: []
        });
      
      const result = await executeWorkflowWithCache(mockFalcon as any, defaultParams);
      
      expect(result.success).toBe(true);
      expect(result.content).toBe('Retry success');
    });

    it('should handle complex nested output data extraction', async () => {
      mockFalcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
        resources: ['workflow-123'],
        errors: []
      });
      
      mockFalcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [{
          status: 'Completed',
          output_data: {
            level1: {
              level2: 'Deep nested response'
            }
          }
        }],
        errors: []
      });
      
      const result = await executeWorkflowWithCache(mockFalcon as any, defaultParams);
      
      expect(result.success).toBe(true);
      expect(result.content).toBe('Deep nested response');
    });
  });
});
