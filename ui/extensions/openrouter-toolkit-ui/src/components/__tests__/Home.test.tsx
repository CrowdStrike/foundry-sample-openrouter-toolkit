import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../Home';
import {
  mockFalconApi,
  mockValidateQuery,
  mockWait,
  mockGetDisplayModelName,
  mockFormatErrorMessage,
  mockGenerateCacheKey,
  mockResponseCache,
  mockWriteText,
} from '../../setupTests';

// Helper to create a mock falcon API with different data configurations
const createMockFalcon = (data?: any) => ({
  ...mockFalconApi,
  data: data || mockFalconApi.data,
});

describe('Home Component', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    // Set up clipboard mock before userEvent.setup()
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: mockWriteText,
      },
      writable: true,
      configurable: true,
    });
    
    user = userEvent.setup();
    jest.clearAllMocks();
    
    // Set up default mock implementations
    mockValidateQuery.mockReturnValue({ isValid: true });
    mockGetDisplayModelName.mockImplementation((model, online) => model);
    mockFormatErrorMessage.mockImplementation((error) => error.message || 'Unknown error');
    mockGenerateCacheKey.mockImplementation((...args) => `cache-key-${args.join('-')}`);
    mockResponseCache.get.mockReturnValue(null);
  });

  describe('Initial Rendering', () => {
    it('should render with default state', () => {
      const falcon = createMockFalcon();
      render(<Home falcon={falcon} />);

      expect(screen.getByTestId('sl-card')).toBeInTheDocument();
      expect(screen.getByTestId('sl-tab-group')).toBeInTheDocument();
      expect(screen.getByText('Request')).toBeInTheDocument();
      expect(screen.getByText('Response')).toBeInTheDocument();
    });

    it('should render QueryForm in Request tab', () => {
      const falcon = createMockFalcon();
      render(<Home falcon={falcon} />);

      expect(screen.getByTestId('query-form')).toBeInTheDocument();
      expect(screen.getByTestId('query-input')).toBeInTheDocument();
      expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    });

    it('should have Response tab disabled initially', () => {
      const falcon = createMockFalcon();
      render(<Home falcon={falcon} />);

      const responseTab = screen.getByText('Response').closest('[data-testid="sl-tab"]');
      expect(responseTab).toHaveAttribute('data-disabled', 'true');
    });
  });

  describe('Form Validation', () => {
    it('should show error message for invalid query', async () => {
      mockValidateQuery.mockReturnValue({ isValid: false, error: 'Query is required' });
      
      const falcon = createMockFalcon();
      render(<Home falcon={falcon} />);

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      // The component should handle the validation error and show it
      expect(mockValidateQuery).toHaveBeenCalled();
    });

    it('should proceed with valid query', async () => {
      mockValidateQuery.mockReturnValue({ isValid: true });
      
      const falcon = createMockFalcon();
      const mockPostEntities = jest.fn().mockResolvedValue({
        resources: ['workflow-id-123'],
        errors: null,
      });
      falcon.api.workflows.postEntitiesExecuteV1 = mockPostEntities;

      render(<Home falcon={falcon} />);

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      expect(mockValidateQuery).toHaveBeenCalled();
      expect(mockPostEntities).toHaveBeenCalled();
    });
  });

  describe('API Workflow Execution', () => {
    it('should handle successful workflow execution', async () => {
      mockValidateQuery.mockReturnValue({ isValid: true });
      
      const falcon = createMockFalcon();
      const mockPostEntities = jest.fn().mockResolvedValue({
        resources: ['workflow-id-123'],
        errors: null,
      });
      const mockGetResults = jest.fn().mockResolvedValue({
        resources: [{
          status: 'Completed',
          output_data: {
            model_output_text: 'Test response from API',
            total_tokens: 150,
          },
        }],
      });

      falcon.api.workflows.postEntitiesExecuteV1 = mockPostEntities;
      falcon.api.workflows.getEntitiesExecutionResultsV1 = mockGetResults;

      render(<Home falcon={falcon} />);

      const submitButton = screen.getByTestId('submit-button');
      
      await act(async () => {
        await user.click(submitButton);
      });

      // Wait for the polling to complete
      await waitFor(() => {
        expect(mockGetResults).toHaveBeenCalledWith({
          ids: ['workflow-id-123'],
        });
      });

      expect(mockPostEntities).toHaveBeenCalled();
      expect(mockResponseCache.set).toHaveBeenCalled();
    });

    it('should handle workflow execution errors', async () => {
      mockValidateQuery.mockReturnValue({ isValid: true });
      
      const falcon = createMockFalcon();
      const mockPostEntities = jest.fn().mockResolvedValue({
        resources: null,
        errors: [{ message: 'API Error occurred' }],
      });

      falcon.api.workflows.postEntitiesExecuteV1 = mockPostEntities;

      render(<Home falcon={falcon} />);

      const submitButton = screen.getByTestId('submit-button');
      
      await act(async () => {
        await user.click(submitButton);
      });

      expect(mockPostEntities).toHaveBeenCalled();
    });

    it('should handle workflow execution timeout', async () => {
      mockValidateQuery.mockReturnValue({ isValid: true });
      
      const falcon = createMockFalcon();
      const mockPostEntities = jest.fn().mockResolvedValue({
        resources: ['workflow-id-123'],
        errors: null,
      });
      const mockGetResults = jest.fn().mockResolvedValue({
        resources: [{
          status: 'Running',
          output_data: null,
        }],
      });

      falcon.api.workflows.postEntitiesExecuteV1 = mockPostEntities;
      falcon.api.workflows.getEntitiesExecutionResultsV1 = mockGetResults;

      render(<Home falcon={falcon} />);

      const submitButton = screen.getByTestId('submit-button');
      
      await act(async () => {
        await user.click(submitButton);
      });

      expect(mockPostEntities).toHaveBeenCalled();
    });
  });

  describe('Caching Behavior', () => {
    it('should use cached response when available', async () => {
      mockValidateQuery.mockReturnValue({ isValid: true });
      mockResponseCache.get.mockReturnValue({
        content: 'Cached response',
        usage: { total_tokens: 100 },
      });
      
      const falcon = createMockFalcon();
      render(<Home falcon={falcon} />);

      const submitButton = screen.getByTestId('submit-button');
      
      await act(async () => {
        await user.click(submitButton);
      });

      expect(mockResponseCache.get).toHaveBeenCalled();
      expect(falcon.api.workflows.postEntitiesExecuteV1).not.toHaveBeenCalled();
    });

    it('should generate correct cache key', async () => {
      mockValidateQuery.mockReturnValue({ isValid: true });
      
      const falcon = createMockFalcon();
      render(<Home falcon={falcon} />);

      const submitButton = screen.getByTestId('submit-button');
      
      await act(async () => {
        await user.click(submitButton);
      });

      expect(mockGenerateCacheKey).toHaveBeenCalled();
    });
  });

  describe('Copy to Clipboard', () => {
    it('should copy response text to clipboard', async () => {
      mockWriteText.mockResolvedValue(undefined);
      
      const falcon = createMockFalcon();
      
      // Set up a successful workflow response instead of relying on cache
      const mockPostEntities = jest.fn().mockResolvedValue({
        resources: ['workflow-id'],
        errors: null,
      });
      const mockGetResults = jest.fn().mockResolvedValue({
        resources: [{
          status: 'Completed',
          output_data: {
            model_output_text: 'Test response',
            total_tokens: 50,
          },
        }],
      });
      
      falcon.api.workflows.postEntitiesExecuteV1 = mockPostEntities;
      falcon.api.workflows.getEntitiesExecutionResultsV1 = mockGetResults;
      
      render(<Home falcon={falcon} />);

      const submitButton = screen.getByTestId('submit-button');
      
      await act(async () => {
        await user.click(submitButton);
      });

      // Wait for the response to be processed and displayed
      await waitFor(() => {
        expect(screen.getByTestId('response-display')).toBeInTheDocument();
        expect(screen.getByTestId('response')).toBeInTheDocument();
      });

      const copyButton = screen.getByTestId('copy-button');
      
      await act(async () => {
        await user.click(copyButton);
      });

      expect(mockWriteText).toHaveBeenCalledWith('Test response');
    });

    it('should handle clipboard copy failure', async () => {
      const mockClipboard = jest.spyOn(navigator.clipboard, 'writeText');
      mockClipboard.mockRejectedValue(new Error('Clipboard not available'));
      
      const falcon = createMockFalcon();
      render(<Home falcon={falcon} />);

      // Set up response first
      mockResponseCache.get.mockReturnValue({
        content: 'Test response',
        usage: { total_tokens: 50 },
      });

      const submitButton = screen.getByTestId('submit-button');
      
      await act(async () => {
        await user.click(submitButton);
      });

      // Wait for the response display to render
      await waitFor(() => {
        expect(screen.getByTestId('response-display')).toBeInTheDocument();
      });

      const copyButton = screen.getByTestId('copy-button');
      
      await act(async () => {
        await user.click(copyButton);
      });

      expect(mockClipboard).toHaveBeenCalledWith('Test response');
      mockClipboard.mockRestore();
    });
  });

  describe('Context Options Building', () => {
    it('should build context options from falcon data', () => {
      const falcon = createMockFalcon({
        incident: {
          entity_values: {
            email_addresses: ['user@test.com', 'admin@example.com'],
            ipv4s: ['192.168.1.1'],
            host_names: ['example.com', 'test.org'],
          },
          entities_full: [
            {
              FileName: 'malware.exe',
              MD5HashData: 'abcd1234',
              SHA256HashData: 'abcd1234efgh5678',
            },
          ],
        },
      });

      render(<Home falcon={falcon} />);

      // The component should process the context options
      expect(screen.getByTestId('query-form')).toBeInTheDocument();
    });

    it('should handle empty falcon data', () => {
      const falcon = createMockFalcon({});
      
      render(<Home falcon={falcon} />);

      expect(screen.getByTestId('query-form')).toBeInTheDocument();
    });

    it('should handle detection context as well as incident context', () => {
      const falcon = createMockFalcon({
        detection: {
          entity_values: {
            email_addresses: ['detection@test.com'],
            ipv4s: ['10.0.0.1'],
          },
        },
      });

      render(<Home falcon={falcon} />);

      expect(screen.getByTestId('query-form')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should display error messages correctly', async () => {
      mockValidateQuery.mockReturnValue({ isValid: false, error: 'Invalid input' });
      
      const falcon = createMockFalcon();
      render(<Home falcon={falcon} />);

      const submitButton = screen.getByTestId('submit-button');
      
      await act(async () => {
        await user.click(submitButton);
      });

      // Component should handle the validation error
      expect(mockValidateQuery).toHaveBeenCalled();
    });

    it('should handle network errors gracefully', async () => {
      mockValidateQuery.mockReturnValue({ isValid: true });
      
      const falcon = createMockFalcon();
      falcon.api.workflows.postEntitiesExecuteV1 = jest.fn().mockRejectedValue(
        new Error('Network error')
      );

      render(<Home falcon={falcon} />);

      const submitButton = screen.getByTestId('submit-button');
      
      await act(async () => {
        await user.click(submitButton);
      });

      expect(falcon.api.workflows.postEntitiesExecuteV1).toHaveBeenCalled();
    });
  });

  describe('Component State Management', () => {
    it('should update query state through QueryForm', async () => {
      const falcon = createMockFalcon();
      render(<Home falcon={falcon} />);

      const queryInput = screen.getByTestId('query-input');
      
      await act(async () => {
        await user.type(queryInput, 'test query');
      });

      expect(queryInput).toHaveValue('test query');
    });

    it('should handle loading states correctly', async () => {
      mockValidateQuery.mockReturnValue({ isValid: true });
      
      const falcon = createMockFalcon();
      const mockPostEntities = jest.fn().mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({
          resources: ['workflow-id'],
          errors: null,
        }), 100))
      );
      
      falcon.api.workflows.postEntitiesExecuteV1 = mockPostEntities;

      render(<Home falcon={falcon} />);

      const submitButton = screen.getByTestId('submit-button');
      
      await act(async () => {
        await user.click(submitButton);
      });

      // Should show loading state
      expect(submitButton).toBeDisabled();
    });
  });

  describe('Tab Management', () => {
    it('should enable Response tab after query submission', async () => {
      mockValidateQuery.mockReturnValue({ isValid: true });
      mockResponseCache.get.mockReturnValue({
        content: 'Cached response',
        usage: { total_tokens: 100 },
      });
      
      const falcon = createMockFalcon();
      render(<Home falcon={falcon} />);

      const submitButton = screen.getByTestId('submit-button');
      
      await act(async () => {
        await user.click(submitButton);
      });

      // Response tab should be enabled after submission
      const responseTab = screen.getByText('Response').closest('[data-testid="sl-tab"]');
      expect(responseTab).toHaveAttribute('data-disabled', 'false');
    });
  });
});
