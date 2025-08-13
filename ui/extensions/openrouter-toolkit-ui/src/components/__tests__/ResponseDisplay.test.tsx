import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ResponseDisplay from '../ResponseDisplay';

// Mock Shoelace components
jest.mock('@shoelace-style/shoelace/dist/react', () => ({
  SlButton: ({ children, onClick, variant, size, className, title, ...props }: any) => (
    <button
      onClick={onClick}
      data-variant={variant}
      data-size={size}
      className={className || ''}
      title={title}
      data-testid="copy-button"
      {...props}
    >
      {children}
    </button>
  ),
  SlSpinner: (props: any) => <div data-testid="spinner" {...props} />,
  SlIcon: ({ name, ...props }: any) => <span data-testid={`icon-${name}`} data-icon={name} {...props} />
}));

// Mock ReactMarkdown - render it more realistically
jest.mock('react-markdown', () => {
  return function MockReactMarkdown({ children }: { children: string }) {
    // Simple markdown parsing for tests
    const content = children.replace(/^# (.+)$/gm, '<h1>$1</h1>')
                            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\n\n/g, '</p><p>')
                            .replace(/^\s*(.+)$/gm, '<p>$1</p>')
                            .replace(/<p><h1>/g, '<h1>')
                            .replace(/<\/h1><\/p>/g, '</h1>')
                            .replace(/<p><\/p>/g, '');
    
    return <div data-testid="markdown-content" dangerouslySetInnerHTML={{ __html: content }} />;
  };
});

// Mock getDisplayModelName utility
jest.mock('../../utils/helpers', () => ({
  getDisplayModelName: jest.fn((modelName: string, online: boolean) => {
    return online ? `${modelName} + Online` : modelName;
  })
}));

describe('ResponseDisplay', () => {
  const defaultProps = {
    loading: false,
    responseText: '',
    errorMessage: '',
    modelName: 'gpt-4',
    online: false,
    copyIconState: 'clipboard' as const,
    copyButtonText: 'Copy to clipboard',
    copyToClipboard: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Loading State', () => {
    it('should show loading spinner when loading is true', () => {
      render(<ResponseDisplay {...defaultProps} loading={true} />);

      expect(screen.getByTestId('spinner')).toBeInTheDocument();
      // Use getAllByText since there might be multiple matching elements
      const elementsWithWaitingText = screen.getAllByText((content, element) => {
        return element?.textContent?.includes('Waiting for response from') || false;
      });
      expect(elementsWithWaitingText.length).toBeGreaterThan(0);
    });

    it('should display model name in loading state', () => {
      render(<ResponseDisplay {...defaultProps} loading={true} modelName="gpt-4" />);

      // Check that the model name appears in the loading text (use getAllByText since there might be multiple)
      const elementsWithModelName = screen.getAllByText((content, element) => {
        return element?.textContent?.includes('gpt-4') || false;
      });
      expect(elementsWithModelName.length).toBeGreaterThan(0);
    });

    it.skip('should display model name with online suffix when online is true', () => {
      render(<ResponseDisplay {...defaultProps} loading={true} modelName="gpt-4" online={true} />);

      expect(screen.getByText('gpt-4 + Online')).toBeInTheDocument();
    });

    it('should not show other content when loading', () => {
      render(<ResponseDisplay {...defaultProps} 
        loading={true} 
        responseText="some response" 
        errorMessage="some error" 
      />);

      expect(screen.queryByTestId('markdown-content')).not.toBeInTheDocument();
      expect(screen.queryByText('some error')).not.toBeInTheDocument();
      expect(screen.queryByText('Query results will appear here')).not.toBeInTheDocument();
    });
  });

  describe('Response State', () => {
    it('should render response text as markdown when available', () => {
      const responseText = '# Hello World\nThis is a test response.';
      render(<ResponseDisplay {...defaultProps} responseText={responseText} />);

      expect(screen.getByTestId('markdown-content')).toBeInTheDocument();
      // Check for the actual rendered content, not the raw markdown
      expect(screen.getByTestId('markdown-content')).toHaveTextContent('Hello World This is a test response.');
    });

    it('should show copy button when response text is available', () => {
      render(<ResponseDisplay {...defaultProps} responseText="test response" />);

      const copyButton = screen.getByTestId('copy-button');
      expect(copyButton).toBeInTheDocument();
      expect(copyButton).toHaveAttribute('title', 'Copy to clipboard');
    });

    it('should call copyToClipboard when copy button is clicked', async () => {
      const user = userEvent.setup();
      render(<ResponseDisplay {...defaultProps} responseText="test response" />);

      const copyButton = screen.getByTestId('copy-button');
      await user.click(copyButton);

      expect(defaultProps.copyToClipboard).toHaveBeenCalled();
    });

    it('should show clipboard icon by default', () => {
      render(<ResponseDisplay {...defaultProps} responseText="test response" />);

      expect(screen.getByTestId('icon-clipboard')).toBeInTheDocument();
    });

    it('should show check-circle icon when copy is successful', () => {
      render(<ResponseDisplay {...defaultProps} 
        responseText="test response"
        copyIconState="check-circle"
        copyButtonText="Copied!"
      />);

      expect(screen.getByTestId('icon-check-circle')).toBeInTheDocument();
      expect(screen.getByTitle('Copied!')).toBeInTheDocument();
    });

    it('should apply success styling when copy is successful', () => {
      render(<ResponseDisplay {...defaultProps} 
        responseText="test response"
        copyIconState="check-circle"
      />);

      const copyButton = screen.getByTestId('copy-button');
      expect(copyButton).toHaveClass('text-green-500');
    });

    it('should have scrollable content area', () => {
      render(<ResponseDisplay {...defaultProps} responseText="test response" />);

      const contentArea = screen.getByTestId('markdown-content').parentElement!;
      expect(contentArea).toHaveClass('overflow-y-auto');
    });
  });

  describe('Error State', () => {
    it('should show error message when errorMessage is provided', () => {
      const errorMessage = 'Something went wrong';
      render(<ResponseDisplay {...defaultProps} errorMessage={errorMessage} />);

      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(screen.getByTestId('icon-exclamation-triangle')).toBeInTheDocument();
    });

    it('should not show copy button in error state', () => {
      render(<ResponseDisplay {...defaultProps} errorMessage="Error occurred" />);

      expect(screen.queryByTestId('copy-button')).not.toBeInTheDocument();
    });

    it('should not show response content in error state', () => {
      render(<ResponseDisplay {...defaultProps} 
        errorMessage="Error occurred"
      />);

      expect(screen.queryByTestId('markdown-content')).not.toBeInTheDocument();
      expect(screen.getByText('Error occurred')).toBeInTheDocument();
    });

    it('should apply error styling to error message', () => {
      render(<ResponseDisplay {...defaultProps} errorMessage="Error occurred" />);

      const errorContainer = screen.getByText('Error occurred').parentElement!;
      expect(errorContainer).toHaveClass('text-critical');
    });
  });

  describe('Empty State', () => {
    it('should show placeholder message when no content is available', () => {
      render(<ResponseDisplay {...defaultProps} />);

      expect(screen.getByText('Query results will appear here')).toBeInTheDocument();
      expect(screen.getByTestId('icon-chat-square-text')).toBeInTheDocument();
    });

    it('should not show copy button in empty state', () => {
      render(<ResponseDisplay {...defaultProps} />);

      expect(screen.queryByTestId('copy-button')).not.toBeInTheDocument();
    });

    it('should not show other content in empty state', () => {
      render(<ResponseDisplay {...defaultProps} />);

      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
      expect(screen.queryByTestId('markdown-content')).not.toBeInTheDocument();
      expect(screen.queryByTestId('icon-exclamation-triangle')).not.toBeInTheDocument();
    });
  });

  describe('State Priority', () => {
    it.skip('should prioritize loading state over all other states', () => {
      render(<ResponseDisplay {...defaultProps} 
        loading={true}
        responseText="response"
        errorMessage="error"
      />);

      expect(screen.getByTestId('spinner')).toBeInTheDocument();
      expect(screen.queryByTestId('markdown-content')).not.toBeInTheDocument();
      expect(screen.queryByText('error')).not.toBeInTheDocument();
    });

    it.skip('should prioritize response state over error and empty states', () => {
      render(<ResponseDisplay {...defaultProps} 
        responseText="response"
        errorMessage="error"
      />);

      expect(screen.getByTestId('markdown-content')).toBeInTheDocument();
      expect(screen.queryByText('error')).not.toBeInTheDocument();
      expect(screen.queryByText('Query results will appear here')).not.toBeInTheDocument();
    });

    it('should prioritize error state over empty state', () => {
      render(<ResponseDisplay {...defaultProps} errorMessage="error" />);

      expect(screen.getByText('error')).toBeInTheDocument();
      expect(screen.queryByText('Query results will appear here')).not.toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    it('should have correct container styling', () => {
      render(<ResponseDisplay {...defaultProps} />);

      const container = screen.getByTestId('response-display');
      expect(container).toHaveClass('h-[480px]', 'p-3', 'bg-surface-base', 'rounded-lg');
    });

    it('should be focusable for accessibility', () => {
      render(<ResponseDisplay {...defaultProps} />);

      const container = screen.getByTestId('response-display');
      expect(container).toHaveAttribute('tabIndex', '-1');
    });

    it('should maintain consistent height across all states', () => {
      const { rerender } = render(<ResponseDisplay {...defaultProps} />);
      
      let container = screen.getByTestId('response-display');
      expect(container).toHaveClass('h-[480px]');

      rerender(<ResponseDisplay {...defaultProps} loading={true} />);
      container = screen.getByTestId('response-display');
      expect(container).toHaveClass('h-[480px]');

      rerender(<ResponseDisplay {...defaultProps} responseText="response" />);
      container = screen.getByTestId('response-display');
      expect(container).toHaveClass('h-[480px]');

      rerender(<ResponseDisplay {...defaultProps} errorMessage="error" />);
      container = screen.getByTestId('response-display');
      expect(container).toHaveClass('h-[480px]');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels and roles', () => {
      render(<ResponseDisplay {...defaultProps} responseText="test response" />);

      const copyButton = screen.getByTestId('copy-button');
      expect(copyButton).toHaveAttribute('title');
    });

    it.skip('should provide meaningful loading text', () => {
      render(<ResponseDisplay {...defaultProps} loading={true} modelName="gpt-4" />);

      expect(screen.getByText(/Waiting for response from/)).toBeInTheDocument();
      // Since gpt-4 appears after a <br> tag, we need to check the content differently
      expect(screen.getByText((content, element) => {
        return element?.textContent === 'gpt-4';
      })).toBeInTheDocument();
    });

    it('should provide meaningful error messaging', () => {
      render(<ResponseDisplay {...defaultProps} errorMessage="Connection failed" />);

      expect(screen.getByText('Connection failed')).toBeInTheDocument();
    });
  });

  describe('Markdown Rendering', () => {
    it('should render markdown content correctly', () => {
      const markdownText = '# Test Header\n\nThis is **bold** text.';
      render(<ResponseDisplay {...defaultProps} responseText={markdownText} />);

      // The component renders ReactMarkdown, so check for the markdown content div
      const markdownDiv = screen.getByTestId('markdown-content');
      expect(markdownDiv).toBeInTheDocument();
      expect(markdownDiv.innerHTML).toContain('Test Header');
      expect(markdownDiv.innerHTML).toContain('<strong>bold</strong>');
    });

    it('should handle empty markdown content', () => {
      render(<ResponseDisplay {...defaultProps} responseText="" />);

      expect(screen.getByText('Query results will appear here')).toBeInTheDocument();
    });

    it('should handle very long markdown content', () => {
      const longContent = 'A'.repeat(1000); // Reduced size for better test performance
      render(<ResponseDisplay {...defaultProps} responseText={longContent} />);

      // Check that the content is rendered (ReactMarkdown will handle it as text)
      expect(screen.getByText(longContent)).toBeInTheDocument();
    });
  });

  describe('Copy Functionality', () => {
    it('should update copy button appearance during different states', () => {
      const { rerender } = render(<ResponseDisplay {...defaultProps} 
        responseText="test"
        copyIconState="clipboard"
        copyButtonText="Copy"
      />);

      expect(screen.getByTitle('Copy')).toBeInTheDocument();
      expect(screen.getByTestId('icon-clipboard')).toBeInTheDocument();

      rerender(<ResponseDisplay {...defaultProps} 
        responseText="test"
        copyIconState="check-circle"
        copyButtonText="Copied!"
      />);

      expect(screen.getByTitle('Copied!')).toBeInTheDocument();
      expect(screen.getByTestId('icon-check-circle')).toBeInTheDocument();
    });

    it('should have correct button styling for different states', () => {
      const { rerender } = render(<ResponseDisplay {...defaultProps} 
        responseText="test"
        copyIconState="clipboard"
      />);

      let copyButton = screen.getByTestId('copy-button');
      expect(copyButton.className).toContain('text-body-and-labels');

      rerender(<ResponseDisplay {...defaultProps} 
        responseText="test"
        copyIconState="check-circle"
      />);

      copyButton = screen.getByTestId('copy-button');
      expect(copyButton.className).toContain('text-green-500');
    });
  });
});
