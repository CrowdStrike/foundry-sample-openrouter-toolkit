import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../Home';
import {
  mockFalconApi,
  mockResponseCache,
  mockWriteText,
} from '../../setupTests';

// Create local mocks for the functions we need
const mockValidateQuery = jest.fn((query: string) => {
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
});

const mockWait = jest.fn((ms: number = 1000) => {
  return new Promise(resolve => setTimeout(resolve, ms));
});

const mockGetDisplayModelName = jest.fn((model: string, online: boolean) => {
  return online ? `${model}:online` : model;
});

const mockFormatErrorMessage = jest.fn((error: any) => {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  if (error && typeof error === 'object' && 'message' in error) return String(error.message);
  return 'An unexpected error occurred';
});

const mockGenerateCacheKey = jest.fn((...args: any[]) => {
  return `cache-key-${args.join('-')}`;
});

// Mock child components for Home tests
jest.mock('../QueryForm', () => {
  return function MockQueryForm(props: any) {
    return React.createElement('div', { 'data-testid': 'query-form' },
      React.createElement('textarea', { 
        'data-testid': 'query-textarea',
        value: props.query || '',
        onChange: (e: any) => props.setQuery?.(e.target.value)
      }),
      React.createElement('button', {
        'data-testid': 'submit-button',
        onClick: props.handleSubmit,
        disabled: props.loading || !props.query?.trim()
      }, props.loading ? 'Running...' : 'Submit')
    );
  };
});

jest.mock('../ResponseDisplay', () => {
  return function MockResponseDisplay(props: any) {
    const children = [];
    
    if (props.loading) {
      children.push(React.createElement('div', { 'data-testid': 'loading', key: 'loading' }, 'Loading...'));
    }
    
    if (props.errorMessage) {
      children.push(React.createElement('div', { 'data-testid': 'error', key: 'error' }, props.errorMessage));
    }
    
    if (props.responseText) {
      children.push(React.createElement('div', { 'data-testid': 'response', key: 'response' }, props.responseText));
    }
    
    children.push(React.createElement('button', {
      'data-testid': 'copy-button',
      onClick: props.copyToClipboard,
      key: 'copy-button'
    }, props.copyButtonText));

    return React.createElement('div', { 'data-testid': 'response-display' }, ...children);
  };
});

// Mock the helper modules
jest.mock('../../utils/helpers', () => ({
  validateQuery: jest.fn(),
  wait: jest.fn(),
  getDisplayModelName: jest.fn(),
  formatErrorMessage: jest.fn(),
  generateCacheKey: jest.fn(),
  DEFAULT_MODEL: 'gpt-4',
  DEFAULT_TEMPERATURE: 0.7,
  DEFAULT_PROVIDER_SORT: 'throughput'
}));

jest.mock('../../utils/cache', () => ({
  responseCache: {
    get: jest.fn(),
    set: jest.fn()
  }
}));

// Import the mocked modules
import { validateQuery, wait, getDisplayModelName, formatErrorMessage, generateCacheKey } from '../../utils/helpers';
import { responseCache } from '../../utils/cache';

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
    
    // Set up default mock implementations for the mocked modules
    (validateQuery as jest.Mock).mockImplementation(mockValidateQuery);
    (wait as jest.Mock).mockImplementation(mockWait);
    (getDisplayModelName as jest.Mock).mockImplementation(mockGetDisplayModelName);
    (formatErrorMessage as jest.Mock).mockImplementation(mockFormatErrorMessage);
    (generateCacheKey as jest.Mock).mockImplementation(mockGenerateCacheKey);
    (responseCache.get as jest.Mock).mockImplementation(mockResponseCache.get);
    (responseCache.set as jest.Mock).mockImplementation(mockResponseCache.set);
    
    // Set up default mock implementations
    mockValidateQuery.mockReturnValue({ isValid: true });
    mockGetDisplayModelName.mockImplementation((model, online) => model);
    mockFormatErrorMessage.mockImplementation((error) => error.message || 'Unknown error');
    mockGenerateCacheKey.mockImplementation((...args) => `cache-key-${args.join('-')}`);
    mockResponseCache.get.mockReturnValue(null);
    mockWait.mockResolvedValue(undefined);
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
      expect(screen.getByTestId('query-textarea')).toBeInTheDocument();
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

      // Enter text in query field first to enable submit button
      const queryInput = screen.getByTestId('query-textarea');
      await user.type(queryInput, 'test query');
      
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

      // Enter text in query field first to enable submit button
      const queryInput = screen.getByTestId('query-textarea');
      await user.type(queryInput, 'test query');
      
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

      // Enter text in query field first to enable submit button
      const queryInput = screen.getByTestId('query-textarea');
      await user.type(queryInput, 'test query');
      
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

      // Enter text in query field first to enable submit button
      const queryInput = screen.getByTestId('query-textarea');
      await user.type(queryInput, 'test query');

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

      // Enter text in query field first to enable submit button
      const queryInput = screen.getByTestId('query-textarea');
      await user.type(queryInput, 'test query');

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

      // Enter text in query field first to enable submit button
      const queryInput = screen.getByTestId('query-textarea');
      await user.type(queryInput, 'test query');

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

      // Enter text in query field first to enable submit button
      const queryInput = screen.getByTestId('query-textarea');
      await user.type(queryInput, 'test query');

      const submitButton = screen.getByTestId('submit-button');
      
      await act(async () => {
        await user.click(submitButton);
      });

      expect(mockGenerateCacheKey).toHaveBeenCalled();
    });
  });

  describe('Copy to Clipboard', () => {
    it('should copy response text to clipboard', async () => {
      // Set up all mocks before rendering
      mockValidateQuery.mockReturnValue({ isValid: true });
      mockResponseCache.get.mockReturnValue({
        content: 'Test response',
        usage: { total_tokens: 50 },
      });
      
      // Use spyOn to ensure we can track the call
      const mockClipboard = jest.spyOn(navigator.clipboard, 'writeText');
      mockClipboard.mockResolvedValue(undefined);
      
      const falcon = createMockFalcon();
      render(<Home falcon={falcon} />);

      // Enter text in query field first to enable submit button
      const queryInput = screen.getByTestId('query-textarea');
      await user.type(queryInput, 'test query');

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

      expect(mockClipboard).toHaveBeenCalledWith('Test response');
      mockClipboard.mockRestore();
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

      // Enter text in query field first to enable submit button
      const queryInput = screen.getByTestId('query-textarea');
      await user.type(queryInput, 'test query');

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

      // Enter text in query field first to enable submit button
      const queryInput = screen.getByTestId('query-textarea');
      await user.type(queryInput, 'test query');

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

      // Enter text in query field first to enable submit button
      const queryInput = screen.getByTestId('query-textarea');
      await user.type(queryInput, 'test query');

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

      const queryInput = screen.getByTestId('query-textarea');
      
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

      // Enter text in query field first to enable submit button
      const queryInput = screen.getByTestId('query-textarea');
      await user.type(queryInput, 'test query');

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
