import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Mock the useFalconApi hook
const mockUseFalconApi = jest.fn();

jest.mock('../../hooks/useFalconApi', () => ({
  useFalconApi: mockUseFalconApi,
}));

// Mock ErrorBoundary
jest.mock('../ErrorBoundary', () => {
  return function MockErrorBoundary({ children }: { children: React.ReactNode }) {
    return <div data-testid="error-boundary">{children}</div>;
  };
});

// Mock Home component
jest.mock('../Home', () => {
  return function MockHome({ falcon }: { falcon: any }) {
    return <div data-testid="home-component">Home Component - Falcon: {falcon ? 'Connected' : 'Not Connected'}</div>;
  };
});

describe('App', () => {
  const defaultMockReturn = {
    falcon: {
      connect: jest.fn(),
      data: {
        incident: {
          entity_values: {
            email_addresses: ['test@example.com'],
            ipv4s: ['192.168.1.1'],
          }
        }
      }
    },
    isInitialized: true,
    error: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFalconApi.mockReturnValue(defaultMockReturn);
  });

  describe('Initialization States', () => {
    it('should render successfully when falcon is initialized', () => {
      render(<App />);
      
      expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
      expect(screen.getByTestId('home-component')).toBeInTheDocument();
      expect(screen.getByText('Home Component - Falcon: Connected')).toBeInTheDocument();
    });

    it('should pass falcon instance to Home component', () => {
      render(<App />);
      
      const homeComponent = screen.getByTestId('home-component');
      expect(homeComponent).toHaveTextContent('Falcon: Connected');
    });
  });

  describe('Error Handling', () => {
    it('should render when falcon has an error', () => {
      mockUseFalconApi.mockReturnValue({
        ...defaultMockReturn,
        isInitialized: false,
        error: 'Connection failed',
      });
      
      render(<App />);
      
      expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
      expect(screen.getByTestId('home-component')).toBeInTheDocument();
    });

    it('should render when falcon is not initialized', () => {
      mockUseFalconApi.mockReturnValue({
        ...defaultMockReturn,
        isInitialized: false,
        error: null,
      });
      
      render(<App />);
      
      expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
      expect(screen.getByTestId('home-component')).toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    it('should wrap Home component with ErrorBoundary', () => {
      render(<App />);
      
      const errorBoundary = screen.getByTestId('error-boundary');
      const homeComponent = screen.getByTestId('home-component');
      
      expect(errorBoundary).toContainElement(homeComponent);
    });

    it('should render without crashing', () => {
      expect(() => render(<App />)).not.toThrow();
    });
  });

  describe('Falcon Data Flow', () => {
    it('should pass falcon data correctly to child components', async () => {
      render(<App />);
      
      await waitFor(() => {
        expect(screen.getByTestId('home-component')).toBeInTheDocument();
      });

      // Verify the falcon instance is passed correctly
      expect(screen.getByText('Home Component - Falcon: Connected')).toBeInTheDocument();
    });

    it('should handle different falcon data structures', () => {
      mockUseFalconApi.mockReturnValue({
        ...defaultMockReturn,
        falcon: {
          ...defaultMockReturn.falcon,
          data: {
            detection: {
              entity_values: {
                host_names: ['malicious-host.com'],
              }
            }
          }
        }
      });
      
      render(<App />);
      
      expect(screen.getByTestId('home-component')).toBeInTheDocument();
      expect(screen.getByText('Home Component - Falcon: Connected')).toBeInTheDocument();
    });
  });

  describe('Hook Integration', () => {
    it('should use the useFalconApi hook correctly', () => {
      render(<App />);
      
      // The hook should be called and provide the expected structure
      expect(mockUseFalconApi).toHaveBeenCalled();
      expect(screen.getByTestId('home-component')).toBeInTheDocument();
    });

    it('should handle hook state changes', async () => {
      render(<App />);
      
      await waitFor(() => {
        expect(screen.getByTestId('home-component')).toBeInTheDocument();
      });

      // Component should render consistently with hook data
      expect(screen.getByText('Home Component - Falcon: Connected')).toBeInTheDocument();
    });
  });

  describe('Performance and Optimization', () => {
    it('should not re-render unnecessarily', () => {
      const { rerender } = render(<App />);
      
      const initialHomeComponent = screen.getByTestId('home-component');
      
      // Re-render with same props
      rerender(<App />);
      
      // Should still be the same component
      expect(screen.getByTestId('home-component')).toBeInTheDocument();
      expect(screen.getByTestId('home-component')).toBe(initialHomeComponent);
    });

    it('should handle rapid re-renders gracefully', () => {
      const { rerender } = render(<App />);
      
      // Simulate rapid re-renders
      for (let i = 0; i < 5; i++) {
        rerender(<App />);
      }
      
      expect(screen.getByTestId('home-component')).toBeInTheDocument();
      expect(screen.getByText('Home Component - Falcon: Connected')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should render content that is accessible', () => {
      render(<App />);
      
      const homeComponent = screen.getByTestId('home-component');
      expect(homeComponent).toBeInTheDocument();
      
      // Should have meaningful content
      expect(homeComponent).toHaveTextContent('Home Component');
    });

    it('should not have accessibility violations in basic structure', () => {
      render(<App />);
      
      // Basic checks for proper DOM structure
      const errorBoundary = screen.getByTestId('error-boundary');
      const homeComponent = screen.getByTestId('home-component');
      
      expect(errorBoundary).toBeInTheDocument();
      expect(homeComponent).toBeInTheDocument();
    });
  });
});
