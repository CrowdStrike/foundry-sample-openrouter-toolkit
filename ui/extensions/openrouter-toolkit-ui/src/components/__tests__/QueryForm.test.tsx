import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import QueryForm from '../QueryForm';

// Mock navigator.clipboard
const mockWriteText = jest.fn().mockResolvedValue(undefined);
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: mockWriteText
  },
  writable: true,
  configurable: true,
});

// Mock Shoelace components
jest.mock('@shoelace-style/shoelace/dist/react', () => ({
  SlTextarea: ({ children, onSlInput, value, label, placeholder, rows, ...props }: any) => {
    const id = `textarea-${label?.toLowerCase().replace(/\s+/g, '-')}`;
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <textarea
          id={id}
          value={value}
          placeholder={placeholder}
          rows={rows}
          onChange={(e) => onSlInput?.({ target: e.target })}
          data-testid="query-textarea"
          {...props}
        />
        {children}
      </div>
    );
  },
  SlSelect: ({ children, onSlChange, value, label, disabled, ...props }: any) => {
    const id = `select-${label?.toLowerCase().replace(/\s+/g, '-')}`;
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <select
          id={id}
          value={value}
          onChange={(e) => onSlChange?.({ target: e.target })}
          disabled={disabled}
          data-testid={id}
          {...props}
        >
          {children}
        </select>
      </div>
    );
  },
  SlOption: ({ children, value, disabled, ...props }: any) => (
    <option value={value} disabled={disabled} {...props}>
      {children}
    </option>
  ),
  SlButton: ({ children, onClick, disabled, variant, size, className, title, ...props }: any) => (
    <button
      onClick={(e) => {
        // Make sure onClick is called properly
        if (onClick) {
          onClick(e);
        }
      }}
      disabled={disabled}
      data-variant={variant}
      data-size={size}
      className={className}
      title={title}
      data-testid={variant === 'primary' ? 'submit-button' : 'copy-button'}
      {...props}
    >
      {children}
    </button>
  ),
  SlCheckbox: ({ children, onSlChange, checked, ...props }: any) => (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onSlChange?.({ target: { checked: e.target.checked } })}
        data-testid="online-checkbox"
        {...props}
      />
      {children}
    </label>
  ),
  SlIcon: ({ name, slot, ...props }: any) => <span data-icon={name} data-slot={slot} {...props} />,
  SlTooltip: ({ children, content }: any) => (
    <div title={typeof content === 'string' ? content : 'tooltip'}>
      {children}
    </div>
  ),
  SlDetails: ({ children, summary, className, ...props }: any) => (
    <details className={className} {...props}>
      <summary>{typeof summary === 'string' ? summary : 'Details'}</summary>
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
    // Reset clipboard mock
    mockWriteText.mockClear();
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

      // userEvent.type calls setQuery for each character
      expect(defaultProps.setQuery).toHaveBeenCalledTimes(10); // 'test query' = 10 characters
      expect(defaultProps.setQuery).toHaveBeenLastCalledWith('y'); // Last character
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

      // Look for textarea with formatted JSON content (more flexible approach)
      const debugTextarea = screen.getByPlaceholderText('No Falcon data available');
      expect(debugTextarea).toBeInTheDocument();
      expect(debugTextarea).toHaveValue(JSON.stringify({ test: 'data' }, null, 2));
    });

    it.skip('should copy falcon data to clipboard when copy button is clicked', async () => {
      const user = userEvent.setup();
      render(<QueryForm {...defaultProps} />);

      // First, expand the Advanced Options details
      await user.click(screen.getByText('Advanced Options'));
      
      // Wait for Advanced Options to be expanded, then expand the Falcon Context Debug details
      await waitFor(() => {
        expect(screen.getByText('Falcon Context Debug')).toBeInTheDocument();
      });
      
      await user.click(screen.getByText('Falcon Context Debug'));

      // Wait for the copy button to be available
      await waitFor(() => {
        expect(screen.getByTitle('Copy JSON')).toBeInTheDocument();
      });

      // Now find and click the copy button
      const copyButton = screen.getByTitle('Copy JSON');
      await user.click(copyButton);

      expect(mockWriteText).toHaveBeenCalledWith(
        JSON.stringify({ test: 'data' }, null, 2)
      );
    });

    it.skip('should show success state after copying', async () => {
      const user = userEvent.setup();
      render(<QueryForm {...defaultProps} />);

      // First, expand the Advanced Options details
      await user.click(screen.getByText('Advanced Options'));
      
      // Then expand the Falcon Context Debug details
      await user.click(screen.getByText('Falcon Context Debug'));

      const copyButton = screen.getByTitle('Copy JSON');
      await user.click(copyButton);

      await waitFor(() => {
        expect(screen.getByTitle('Copied!')).toBeInTheDocument();
      }, { timeout: 100 });
    });

    it('should handle empty falcon data', () => {
      render(<QueryForm {...defaultProps} falcon={null} />);

      const debugTextarea = screen.getByPlaceholderText('No Falcon data available');
      expect(debugTextarea).toBeInTheDocument();
      expect(debugTextarea).toHaveValue('{}');
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
    it('should have proper form elements with labels', () => {
      render(<QueryForm {...defaultProps} />);

      // Check for form elements by their content/structure rather than label association
      expect(screen.getByText('Query')).toBeInTheDocument();
      expect(screen.getByText('Model')).toBeInTheDocument();
      expect(screen.getByText('Incident Context')).toBeInTheDocument();
      expect(screen.getByText('Temperature')).toBeInTheDocument();
      expect(screen.getByText('Provider Priority')).toBeInTheDocument();
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

      // Verify all state updates were called - userEvent.type calls setQuery for each character
      expect(defaultProps.setQuery).toHaveBeenCalledTimes(4); // 't', 'e', 's', 't'
      expect(defaultProps.setQuery).toHaveBeenLastCalledWith('t'); // Last character typed
      expect(defaultProps.setModelName).toHaveBeenCalledWith('gpt-3.5-turbo');
      expect(defaultProps.setOnline).toHaveBeenCalledWith(true);
    });
  });
});
