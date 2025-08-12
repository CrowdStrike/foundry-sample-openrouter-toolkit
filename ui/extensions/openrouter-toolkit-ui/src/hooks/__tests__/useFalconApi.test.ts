import { renderHook, waitFor } from '@testing-library/react';
import { useFalconApi } from '../useFalconApi';

// Mock FalconApi from foundry-js
const mockConnect = jest.fn();
const mockFalconApiInstance = {
  connect: mockConnect,
  // Add any other methods that might be used
};

jest.mock('@crowdstrike/foundry-js', () => {
  return jest.fn().mockImplementation(() => mockFalconApiInstance);
});

describe('useFalconApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  describe('Initial State', () => {
    it('should return initial state with falcon instance, not initialized, and no error', () => {
      mockConnect.mockImplementation(() => new Promise(() => {})); // Never resolves
      
      const { result } = renderHook(() => useFalconApi());

      expect(result.current.falcon).toBe(mockFalconApiInstance);
      expect(result.current.isInitialized).toBe(false);
      expect(result.current.error).toBe(null);
    });

    it('should create a memoized falcon instance', () => {
      mockConnect.mockImplementation(() => new Promise(() => {})); // Never resolves
      
      const { result, rerender } = renderHook(() => useFalconApi());
      const initialFalcon = result.current.falcon;

      rerender();
      
      expect(result.current.falcon).toBe(initialFalcon);
    });
  });

  describe('Successful Initialization', () => {
    it('should set isInitialized to true when falcon.connect() succeeds', async () => {
      mockConnect.mockResolvedValue(undefined);

      const { result } = renderHook(() => useFalconApi());

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      expect(result.current.error).toBe(null);
      expect(mockConnect).toHaveBeenCalledTimes(1);
    });

    it('should initialize successfully on first attempt', async () => {
      mockConnect.mockResolvedValue(undefined);

      const { result } = renderHook(() => useFalconApi());

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
        expect(result.current.error).toBe(null);
      });

      expect(mockConnect).toHaveBeenCalledTimes(1);
    });
  });

  describe('Failed Initialization', () => {
    it('should set error and keep isInitialized false when falcon.connect() fails with Error object', async () => {
      const errorMessage = 'Connection timeout';
      mockConnect.mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(() => useFalconApi());

      await waitFor(() => {
        expect(result.current.error).toBe(errorMessage);
      });

      expect(result.current.isInitialized).toBe(false);
      expect(console.error).toHaveBeenCalledWith('Failed to initialize Falcon API:', expect.any(Error));
    });

    it('should handle non-Error rejection with generic message', async () => {
      mockConnect.mockRejectedValue('String error');

      const { result } = renderHook(() => useFalconApi());

      await waitFor(() => {
        expect(result.current.error).toBe('Failed to initialize Falcon API');
      });

      expect(result.current.isInitialized).toBe(false);
      expect(console.error).toHaveBeenCalledWith('Failed to initialize Falcon API:', 'String error');
    });

    it('should handle null/undefined rejection with generic message', async () => {
      mockConnect.mockRejectedValue(null);

      const { result } = renderHook(() => useFalconApi());

      await waitFor(() => {
        expect(result.current.error).toBe('Failed to initialize Falcon API');
      });

      expect(result.current.isInitialized).toBe(false);
      expect(console.error).toHaveBeenCalledWith('Failed to initialize Falcon API:', null);
    });

    it('should log error to console on failed initialization', async () => {
      const error = new Error('API key invalid');
      mockConnect.mockRejectedValue(error);

      renderHook(() => useFalconApi());

      await waitFor(() => {
        expect(console.error).toHaveBeenCalledWith('Failed to initialize Falcon API:', error);
      });
    });
  });

  describe('Effect Dependencies', () => {
    it('should only initialize once with the same falcon instance', async () => {
      mockConnect.mockResolvedValue(undefined);

      const { rerender } = renderHook(() => useFalconApi());

      await waitFor(() => {
        expect(mockConnect).toHaveBeenCalledTimes(1);
      });

      // Rerender should not trigger another initialization
      rerender();
      
      await waitFor(() => {
        expect(mockConnect).toHaveBeenCalledTimes(1);
      });
    });

    it('should call connect on the correct falcon instance', async () => {
      mockConnect.mockResolvedValue(undefined);

      renderHook(() => useFalconApi());

      await waitFor(() => {
        expect(mockFalconApiInstance.connect).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('State Transitions', () => {
    it('should transition from uninitialized to initialized', async () => {
      let resolveConnect: () => void;
      const connectPromise = new Promise<void>((resolve) => {
        resolveConnect = resolve;
      });
      mockConnect.mockReturnValue(connectPromise);

      const { result } = renderHook(() => useFalconApi());

      // Initially not initialized
      expect(result.current.isInitialized).toBe(false);
      expect(result.current.error).toBe(null);

      // Resolve the connection
      resolveConnect!();

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
        expect(result.current.error).toBe(null);
      });
    });

    it('should transition from uninitialized to error state', async () => {
      let rejectConnect: (error: Error) => void;
      const connectPromise = new Promise<void>((_, reject) => {
        rejectConnect = reject;
      });
      mockConnect.mockReturnValue(connectPromise);

      const { result } = renderHook(() => useFalconApi());

      // Initially not initialized
      expect(result.current.isInitialized).toBe(false);
      expect(result.current.error).toBe(null);

      // Reject the connection
      const error = new Error('Network error');
      rejectConnect!(error);

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(false);
        expect(result.current.error).toBe('Network error');
      });
    });
  });

  describe('Return Value Structure', () => {
    it('should return object with correct properties', async () => {
      mockConnect.mockResolvedValue(undefined);

      const { result } = renderHook(() => useFalconApi());

      expect(result.current).toHaveProperty('falcon');
      expect(result.current).toHaveProperty('isInitialized');
      expect(result.current).toHaveProperty('error');
      expect(Object.keys(result.current)).toHaveLength(3);
    });

    it('should return stable reference for falcon instance across renders', () => {
      mockConnect.mockImplementation(() => new Promise(() => {})); // Never resolves
      
      const { result, rerender } = renderHook(() => useFalconApi());
      const initialReturn = result.current;

      rerender();
      
      expect(result.current.falcon).toBe(initialReturn.falcon);
    });
  });

  describe('Async Behavior', () => {
    it('should handle concurrent initialization attempts', async () => {
      let resolveCount = 0;
      mockConnect.mockImplementation(() => {
        resolveCount++;
        return Promise.resolve();
      });

      // Render the hook multiple times quickly
      const { result: result1 } = renderHook(() => useFalconApi());
      const { result: result2 } = renderHook(() => useFalconApi());

      await waitFor(() => {
        expect(result1.current.isInitialized).toBe(true);
        expect(result2.current.isInitialized).toBe(true);
      });

      // Each hook instance should initialize independently
      expect(resolveCount).toBe(2);
    });

    it('should handle slow initialization', async () => {
      const delay = 100;
      mockConnect.mockImplementation(() => 
        new Promise(resolve => setTimeout(resolve, delay))
      );

      const startTime = Date.now();
      const { result } = renderHook(() => useFalconApi());

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      const endTime = Date.now();
      expect(endTime - startTime).toBeGreaterThanOrEqual(delay);
    });
  });

  describe('Error Message Handling', () => {
    it('should preserve original error message from Error objects', async () => {
      const originalMessage = 'Specific API error message';
      mockConnect.mockRejectedValue(new Error(originalMessage));

      const { result } = renderHook(() => useFalconApi());

      await waitFor(() => {
        expect(result.current.error).toBe(originalMessage);
      });
    });

    it('should provide fallback message for non-Error rejections', async () => {
      const testCases = [
        'string error',
        { message: 'object error' },
        123,
        true,
        null,
        undefined
      ];

      for (const testCase of testCases) {
        mockConnect.mockRejectedValue(testCase);

        const { result } = renderHook(() => useFalconApi());

        await waitFor(() => {
          expect(result.current.error).toBe('Failed to initialize Falcon API');
        });
      }
    });
  });
});
