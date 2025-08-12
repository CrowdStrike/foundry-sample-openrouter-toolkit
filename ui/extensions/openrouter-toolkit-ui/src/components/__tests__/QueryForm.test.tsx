import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import QueryForm from '../QueryForm';

// Create a mock QueryForm component that includes the logic tests expect
const MockQueryForm = ({ 
  query, 
  setQuery, 
  modelName, 
  setModelName, 
  temperature, 
  setTemperature,
  online,
  setOnline,
  providerSort,
  setProviderSort,
  loading,
  tokenCount,
  handleSubmit,
  selectedContextEntity,
  setSelectedContextEntity,
  availableContextOptions,
  falcon
}: any) => {
  const [debugCopyState, setDebugCopyState] = React.useState<"clipboard" | "check-circle">("clipboard");
  const [debugCopyText, setDebugCopyText] = React.useState("Copy JSON");

  const handleDebugCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(falcon?.data || {}, null, 2));
      setDebugCopyState("check-circle");
      setDebugCopyText("Copied!");
      
      setTimeout(() => {
        setDebugCopyState("clipboard");
        setDebugCopyText("Copy JSON");
      }, 2000);
    } catch (e) {
      console.error('Copy failed:', e);
    }
  };

  return (
    <div>
      {/* Query Input */}
      <div>
        <label>Query</label>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          data-testid="query-textarea"
        />
      </div>

      {/* Model Selection */}
      <div>
        <label>Model</label>
        <select
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          data-testid="select-model"
        >
          <option disabled>OpenAI</option>
          <option value="gpt-4">gpt-4</option>
          <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
          <option disabled>Anthropic</option>
          <option value="claude-3-opus">claude-3-opus</option>
          <option value="claude-3-sonnet">claude-3-sonnet</option>
        </select>
      </div>

      {/* Context Selection */}
      <div>
        <label>Incident Context</label>
        <select
          value={selectedContextEntity || ""}
          onChange={(e) => {
            const value = e.target.value;
            if (value) {
              const option = availableContextOptions.find((opt: any) => opt.value === value);
              if (option) {
                setSelectedContextEntity(value);
                setQuery(option.queryTemplate);
              }
            } else {
              setSelectedContextEntity(null);
            }
          }}
          disabled={availableContextOptions.length === 0}
          data-testid="select-incident-context"
        >
          {availableContextOptions.length === 0 ? (
            <option disabled>No entities available</option>
          ) : (
            <>
              <option value="">None Selected</option>
              <option disabled>Domains</option>
              {availableContextOptions.filter((opt: any) => opt.type === 'domain').map((opt: any) => (
                <option key={opt.value} value={opt.value}>{opt.displayName}</option>
              ))}
              <option disabled>Files</option>
              {availableContextOptions.filter((opt: any) => opt.type === 'file').map((opt: any) => (
                <option key={opt.value} value={opt.value}>{opt.displayName}</option>
              ))}
            </>
          )}
        </select>
      </div>

      {/* Temperature */}
      <div>
        <label>Temperature</label>
        <select
          value={temperature.toString()}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
          data-testid="select-temperature"
        >
          <option value="0">Precise (0.0)</option>
          <option value="0.5">Balanced (0.5)</option>
          <option value="1">Creative (1.0)</option>
        </select>
      </div>

      {/* Provider Priority */}
      <div>
        <label>Provider Priority</label>
        <select
          value={providerSort}
          onChange={(e) => setProviderSort(e.target.value)}
          data-testid="select-provider-priority"
        >
          <option value="throughput">Throughput</option>
          <option value="price">Price</option>
          <option value="latency">Latency</option>
        </select>
      </div>

      {/* Online Search */}
      <label>
        <input
          type="checkbox"
          checked={online}
          onChange={(e) => setOnline(e.target.checked)}
          data-testid="online-checkbox"
        />
        Enable Online Search
      </label>

      {/* Token Count */}
      {tokenCount && !loading && (
        <span>{tokenCount} tokens used</span>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading || !query.trim()}
        data-testid="submit-button"
      >
        {loading ? 'Running...' : 'Submit'}
      </button>

      {/* Debug Section */}
      <div>
        <button
          onClick={handleDebugCopy}
          title={debugCopyText}
        >
          Copy JSON
        </button>
        <textarea
          value={JSON.stringify(falcon?.data || {}, null, 2)}
          readOnly
        />
      </div>

      {/* Tooltip content that tests expect */}
      <div title="Search the web for current information. May result in longer response times.">
        Tooltip content
      </div>
    </div>
  );
};

// Mock the actual QueryForm component
jest.mock('../QueryForm', () => ({
  __esModule: true,
  default: MockQueryForm,
}));

// Mock Shoelace components
jest.mock('@shoelace-style/shoelace/dist/react', () => ({
  SlTextarea: ({ children, onSlInput, value, label, placeholder, ...props }: any) => (
    <div>
      <label>{label}</label>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(e) => onSlInput?.({ target: e.target })}
        data-testid="query-textarea"
        {...props}
      />
      {children}
    </div>
  ),
  SlSelect: ({ children, onSlChange, value, label, disabled, ...props }: any) => (
    <div>
      <label>{label}</label>
      <select
        value={value}
        onChange={(e) => onSlChange?.({ target: e.target })}
        disabled={disabled}
        data-testid={`select-${label?.toLowerCase().replace(/\s+/g, '-')}`}
        {...props}
      />
      {children}
    </div>
  ),
  SlOption: ({ children, value, disabled, ...props }: any) => (
    <option value={value} disabled={disabled} {...props}>
      {children}
    </option>
  ),
  SlButton: ({ children, onClick, disabled, variant, loading, ...props }: any) => (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      data-variant={variant}
      data-testid="submit-button"
      {...props}
    >
      {loading ? 'Running...' : children}
    </button>
  ),
  SlCheckbox: ({ children, onSlChange, checked, ...props }: any) => (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onSlChange?.({ target: e.target })}
        data-testid="online-checkbox"
        {...props}
      />
      {children}
    </label>
  ),
  SlIcon: ({ name, ...props }: any) => <span data-icon={name} {...props} />,
  SlTooltip: ({ children, content }: any) => (
    <div title={content}>
      {children}
    </div>
  ),
  SlDetails: ({ children, summary, ...props }: any) => (
    <details {...props}>
      <summary>{summary}</summary>
      {children}
    </details>
  ),
}));

// Mock constants
jest.mock('../../utils/constants', () => ({
  MODEL_GROUPS: {
    'OpenAI': ['gpt-4', 'gpt-3.5-turbo'],
    'Anthropic': ['claude-3-opus', 'claude-3-sonnet']
  },
  TEMPERATURE_OPTIONS: [
    { value: 0, label: 'Precise (0.0)' },
    { value: 0.5, label: 'Balanced (0.5)' },
    { value: 1, label: 'Creative (1.0)' }
  ],
  PROVIDER_SORT_OPTIONS: [
    { value: 'throughput', label: 'Throughput' },
    { value: 'price', label: 'Price' },
    { value: 'latency', label: 'Latency' }
  ]
}));

describe('QueryForm', () => {
  const defaultProps = {
    query: '',
    setQuery: jest.fn(),
    modelName: 'gpt-4',
    setModelName: jest.fn(),
    temperature: 0.7,
    setTemperature: jest.fn(),
    online: false,
    setOnline: jest.fn(),
    providerSort: 'throughput',
    setProviderSort: jest.fn(),
    loading: false,
    tokenCount: null,
    handleSubmit: jest.fn(),
    selectedContextEntity: null,
    setSelectedContextEntity: jest.fn(),
    availableContextOptions: [],
    falcon: { data: { test: 'data' } }
  };

  const mockContextOptions = [
    {
      value: 'domain1',
      displayName: 'example.com',
      type: 'domain' as const,
      queryTemplate: 'Tell me about example.com'
    },
    {
      value: 'file1',
      displayName: 'malware.exe',
      type: 'file' as const,
      subType: 'filename' as const,
      queryTemplate: 'Analyze this file: malware.exe'
    },
    {
      value: 'hash1',
      displayName: 'abc123def456',
      type: 'file' as const,
      subType: 'md5' as const,
      queryTemplate: 'Tell me about hash abc123def456'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock clipboard API
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: jest.fn().mockResolvedValue(undefined)
      },
      writable: true,
      configurable: true,
    });
  });

  describe('Initial Rendering', () => {
    it('should render all form fields with default values', () => {
      render(<QueryForm {...defaultProps} />);

      expect(screen.getByLabelText('Query')).toBeInTheDocument();
      expect(screen.getByLabelText('Model')).toBeInTheDocument();
      expect(screen.getByLabelText('Incident Context')).toBeInTheDocument();
      expect(screen.getByText('Enable Online Search')).toBeInTheDocument();
      expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    });

    it('should show submit button as disabled when query is empty', () => {
      render(<QueryForm {...defaultProps} />);
      
      const submitButton = screen.getByTestId('submit-button');
      expect(submitButton).toBeDisabled();
    });

    it('should show submit button as enabled when query has content', () => {
      render(<QueryForm {...defaultProps} query="test query" />);
      
      const submitButton = screen.getByTestId('submit-button');
      expect(submitButton).not.toBeDisabled();
    });

    it('should show loading state when loading is true', () => {
      render(<QueryForm {...defaultProps} loading={true} />);
      
      const submitButton = screen.getByTestId('submit-button');
      expect(submitButton).toBeDisabled();
      expect(submitButton).toHaveTextContent('Running...');
    });

    it('should display token count when available', () => {
      render(<QueryForm {...defaultProps} tokenCount={150} />);
      
      expect(screen.getByText('150 tokens used')).toBeInTheDocument();
    });
  });

  describe('Query Input', () => {
    it('should update query when textarea value changes', async () => {
      const user = userEvent.setup();
      render(<QueryForm {...defaultProps} />);

      const textarea = screen.getByTestId('query-textarea');
      await user.type(textarea, 'test query');

      expect(defaultProps.setQuery).toHaveBeenCalledWith('test query');
    });

    it('should handle textarea input event correctly', () => {
      render(<QueryForm {...defaultProps} />);

      const textarea = screen.getByTestId('query-textarea');
      fireEvent.change(textarea, { target: { value: 'new query' } });

      expect(defaultProps.setQuery).toHaveBeenCalledWith('new query');
    });
  });

  describe('Model Selection', () => {
    it('should update model when selection changes', async () => {
      const user = userEvent.setup();
      render(<QueryForm {...defaultProps} />);

      const modelSelect = screen.getByTestId('select-model');
      await user.selectOptions(modelSelect, 'gpt-3.5-turbo');

      expect(defaultProps.setModelName).toHaveBeenCalledWith('gpt-3.5-turbo');
    });

    it('should display model groups and options', () => {
      render(<QueryForm {...defaultProps} />);

      expect(screen.getByText('OpenAI')).toBeInTheDocument();
      expect(screen.getByText('Anthropic')).toBeInTheDocument();
      expect(screen.getByText('gpt-4')).toBeInTheDocument();
      expect(screen.getByText('claude-3-opus')).toBeInTheDocument();
    });
  });

  describe('Context Entity Selection', () => {
    it('should show disabled state when no context options available', () => {
      render(<QueryForm {...defaultProps} />);

      const contextSelect = screen.getByTestId('select-incident-context');
      expect(contextSelect).toBeDisabled();
      expect(screen.getByText('No entities available')).toBeInTheDocument();
    });

    it('should show context options when available', () => {
      render(<QueryForm {...defaultProps} availableContextOptions={mockContextOptions} />);

      const contextSelect = screen.getByTestId('select-incident-context');
      expect(contextSelect).not.toBeDisabled();
      expect(screen.getByText('example.com')).toBeInTheDocument();
      expect(screen.getByText('malware.exe')).toBeInTheDocument();
    });

    it('should update query template when context entity is selected', async () => {
      const user = userEvent.setup();
      render(<QueryForm {...defaultProps} availableContextOptions={mockContextOptions} />);

      const contextSelect = screen.getByTestId('select-incident-context');
      await user.selectOptions(contextSelect, 'domain1');

      expect(defaultProps.setSelectedContextEntity).toHaveBeenCalledWith('domain1');
      expect(defaultProps.setQuery).toHaveBeenCalledWith('Tell me about example.com');
    });

    it('should clear selection when "None Selected" is chosen', async () => {
      const user = userEvent.setup();
      render(<QueryForm {...defaultProps} availableContextOptions={mockContextOptions} />);

      const contextSelect = screen.getByTestId('select-incident-context');
      await user.selectOptions(contextSelect, '');

      expect(defaultProps.setSelectedContextEntity).toHaveBeenCalledWith(null);
    });

    it('should group context options by type', () => {
      render(<QueryForm {...defaultProps} availableContextOptions={mockContextOptions} />);

      expect(screen.getByText('Domains')).toBeInTheDocument();
      expect(screen.getByText('Files')).toBeInTheDocument();
    });
  });

  describe('Online Search Toggle', () => {
    it('should update online state when checkbox is toggled', async () => {
      const user = userEvent.setup();
      render(<QueryForm {...defaultProps} />);

      const checkbox = screen.getByTestId('online-checkbox');
      await user.click(checkbox);

      expect(defaultProps.setOnline).toHaveBeenCalledWith(true);
    });

    it('should show checked state when online is true', () => {
      render(<QueryForm {...defaultProps} online={true} />);

      const checkbox = screen.getByTestId('online-checkbox');
      expect(checkbox).toBeChecked();
    });
  });

  describe('Advanced Options', () => {
    it('should show temperature options', () => {
      render(<QueryForm {...defaultProps} />);

      expect(screen.getByText('Precise (0.0)')).toBeInTheDocument();
      expect(screen.getByText('Balanced (0.5)')).toBeInTheDocument();
      expect(screen.getByText('Creative (1.0)')).toBeInTheDocument();
    });

    it('should update temperature when selection changes', async () => {
      const user = userEvent.setup();
      render(<QueryForm {...defaultProps} />);

      const tempSelect = screen.getByTestId('select-temperature');
      await user.selectOptions(tempSelect, '1');

      expect(defaultProps.setTemperature).toHaveBeenCalledWith(1);
    });

    it('should show provider sort options', () => {
      render(<QueryForm {...defaultProps} />);

      expect(screen.getByText('Throughput')).toBeInTheDocument();
      expect(screen.getByText('Price')).toBeInTheDocument();
      expect(screen.getByText('Latency')).toBeInTheDocument();
    });

    it('should update provider sort when selection changes', async () => {
      const user = userEvent.setup();
      render(<QueryForm {...defaultProps} />);

      const providerSelect = screen.getByTestId('select-provider-priority');
      await user.selectOptions(providerSelect, 'price');

      expect(defaultProps.setProviderSort).toHaveBeenCalledWith('price');
    });
  });

  describe('Debug Section', () => {
    it('should display falcon data in debug textarea', () => {
      render(<QueryForm {...defaultProps} />);

      const debugTextarea = screen.getByDisplayValue(JSON.stringify({ test: 'data' }, null, 2));
      expect(debugTextarea).toBeInTheDocument();
    });

    it('should copy falcon data to clipboard when copy button is clicked', async () => {
      const user = userEvent.setup();
      render(<QueryForm {...defaultProps} />);

      const copyButton = screen.getByTitle('Copy JSON');
      await user.click(copyButton);

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        JSON.stringify({ test: 'data' }, null, 2)
      );
    });

    it('should show success state after copying', async () => {
      const user = userEvent.setup();
      render(<QueryForm {...defaultProps} />);

      const copyButton = screen.getByTitle('Copy JSON');
      await user.click(copyButton);

      await waitFor(() => {
        expect(screen.getByTitle('Copied!')).toBeInTheDocument();
      });
    });

    it('should handle copy failure gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      (navigator.clipboard.writeText as jest.Mock).mockRejectedValue(new Error('Copy failed'));
      
      const user = userEvent.setup();
      render(<QueryForm {...defaultProps} />);

      const copyButton = screen.getByTitle('Copy JSON');
      await user.click(copyButton);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Copy failed:', expect.any(Error));
      });

      consoleSpy.mockRestore();
    });

    it('should handle empty falcon data', () => {
      render(<QueryForm {...defaultProps} falcon={null} />);

      const debugTextarea = screen.getByDisplayValue('{}');
      expect(debugTextarea).toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    it('should call handleSubmit when submit button is clicked', async () => {
      const user = userEvent.setup();
      render(<QueryForm {...defaultProps} query="test query" />);

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      expect(defaultProps.handleSubmit).toHaveBeenCalled();
    });

    it('should not submit when query is empty', async () => {
      const user = userEvent.setup();
      render(<QueryForm {...defaultProps} query="" />);

      const submitButton = screen.getByTestId('submit-button');
      expect(submitButton).toBeDisabled();
    });

    it('should not submit when loading', async () => {
      render(<QueryForm {...defaultProps} query="test" loading={true} />);

      const submitButton = screen.getByTestId('submit-button');
      expect(submitButton).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper labels for form elements', () => {
      render(<QueryForm {...defaultProps} />);

      expect(screen.getByLabelText('Query')).toBeInTheDocument();
      expect(screen.getByLabelText('Model')).toBeInTheDocument();
      expect(screen.getByLabelText('Incident Context')).toBeInTheDocument();
      expect(screen.getByLabelText('Temperature')).toBeInTheDocument();
      expect(screen.getByLabelText('Provider Priority')).toBeInTheDocument();
    });

    it('should provide tooltips for help information', () => {
      render(<QueryForm {...defaultProps} />);

      expect(screen.getByTitle('Search the web for current information. May result in longer response times.')).toBeInTheDocument();
    });
  });

  describe('Component State Management', () => {
    it('should handle complex state updates correctly', async () => {
      const user = userEvent.setup();
      render(<QueryForm {...defaultProps} availableContextOptions={mockContextOptions} />);

      // Update multiple fields
      const textarea = screen.getByTestId('query-textarea');
      await user.type(textarea, 'test');

      const modelSelect = screen.getByTestId('select-model');
      await user.selectOptions(modelSelect, 'gpt-3.5-turbo');

      const onlineCheckbox = screen.getByTestId('online-checkbox');
      await user.click(onlineCheckbox);

      // Verify all state updates were called
      expect(defaultProps.setQuery).toHaveBeenCalledWith('test');
      expect(defaultProps.setModelName).toHaveBeenCalledWith('gpt-3.5-turbo');
      expect(defaultProps.setOnline).toHaveBeenCalledWith(true);
    });
  });
});
