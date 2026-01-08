import {
  wait,
  getDisplayModelName,
  generateCacheKey,
  validateQuery,
  formatErrorMessage,
  debounce,
  isDevelopment,
  safeJsonParse
} from '../helpers';

describe('helpers', () => {
  describe('wait', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should resolve after the specified time', async () => {
      const waitPromise = wait(100);
      
      // Fast-forward time
      jest.advanceTimersByTime(100);
      
      await expect(waitPromise).resolves.toBeUndefined();
    });

    it('should use default 1000ms when no parameter provided', async () => {
      const waitPromise = wait();
      
      // Fast-forward time
      jest.advanceTimersByTime(1000);
      
      await expect(waitPromise).resolves.toBeUndefined();
    });

    it('should handle zero delay', async () => {
      const waitPromise = wait(0);
      
      // Fast-forward time
      jest.advanceTimersByTime(0);
      
      await expect(waitPromise).resolves.toBeUndefined();
    });
  });

  describe('getDisplayModelName', () => {
    it('should return model name without suffix when online is false', () => {
      const result = getDisplayModelName('gpt-4', false);
      expect(result).toBe('gpt-4');
    });

    it('should return model name with :online suffix when online is true', () => {
      const result = getDisplayModelName('gpt-4', true);
      expect(result).toBe('gpt-4:online');
    });

    it('should handle empty model name', () => {
      const result = getDisplayModelName('', true);
      expect(result).toBe(':online');
    });

    it('should handle model names with special characters', () => {
      const result = getDisplayModelName('claude-3-opus-20240229', true);
      expect(result).toBe('claude-3-opus-20240229:online');
    });
  });

  describe('generateCacheKey', () => {
    it('should generate consistent cache keys for same inputs', () => {
      const key1 = generateCacheKey('test query', 'gpt-4', 0.7, true, 'throughput');
      const key2 = generateCacheKey('test query', 'gpt-4', 0.7, true, 'throughput');
      
      expect(key1).toBe(key2);
    });

    it('should generate different cache keys for different queries', () => {
      const key1 = generateCacheKey('query one', 'gpt-4', 0.7, true, 'throughput');
      const key2 = generateCacheKey('query two', 'gpt-4', 0.7, true, 'throughput');
      
      expect(key1).not.toBe(key2);
    });

    it('should generate different cache keys for different models', () => {
      const key1 = generateCacheKey('test query', 'gpt-4', 0.7, true, 'throughput');
      const key2 = generateCacheKey('test query', 'claude-3', 0.7, true, 'throughput');
      
      expect(key1).not.toBe(key2);
    });

    it('should generate different cache keys for different temperatures', () => {
      const key1 = generateCacheKey('test query', 'gpt-4', 0.7, true, 'throughput');
      const key2 = generateCacheKey('test query', 'gpt-4', 0.5, true, 'throughput');
      
      expect(key1).not.toBe(key2);
    });

    it('should generate different cache keys for different online settings', () => {
      const key1 = generateCacheKey('test query', 'gpt-4', 0.7, true, 'throughput');
      const key2 = generateCacheKey('test query', 'gpt-4', 0.7, false, 'throughput');
      
      expect(key1).not.toBe(key2);
    });

    it('should generate different cache keys for different provider sorts', () => {
      const key1 = generateCacheKey('test query', 'gpt-4', 0.7, true, 'throughput');
      const key2 = generateCacheKey('test query', 'gpt-4', 0.7, true, 'price');
      
      expect(key1).not.toBe(key2);
    });

    it('should handle long queries by truncating', () => {
      const longQuery = 'a'.repeat(200);
      const key = generateCacheKey(longQuery, 'gpt-4', 0.7, true, 'throughput');
      
      expect(key).toContain('gpt-4:0.7:true:throughput:');
      expect(key.length).toBeLessThan(300); // Should be truncated
    });

    it('should handle special characters in query', () => {
      const specialQuery = 'What is 2+2? Tell me about "test" & <script>';
      const key = generateCacheKey(specialQuery, 'gpt-4', 0.7, true, 'throughput');
      
      expect(key).toContain('gpt-4:0.7:true:throughput:');
      expect(typeof key).toBe('string');
    });
  });

  describe('validateQuery', () => {
    it('should return valid for proper query', () => {
      const result = validateQuery('This is a valid query');
      
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should return invalid for null query', () => {
      const result = validateQuery(null as any);
      
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Query is required');
    });

    it('should return invalid for undefined query', () => {
      const result = validateQuery(undefined as any);
      
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Query is required');
    });

    it('should return invalid for non-string query', () => {
      const result = validateQuery(123 as any);
      
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Query is required');
    });

    it('should return invalid for empty string', () => {
      const result = validateQuery('');
      
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Query is required'); // Empty string is falsy, so first condition applies
    });

    it('should return invalid for whitespace-only string', () => {
      const result = validateQuery('   \n\t   ');
      
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Query cannot be empty');
    });

    it('should return invalid for query that is too long', () => {
      const longQuery = 'a'.repeat(10001);
      const result = validateQuery(longQuery);
      
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Query is too long (max 10,000 characters)');
    });

    it('should return valid for query at maximum length', () => {
      const maxQuery = 'a'.repeat(10000);
      const result = validateQuery(maxQuery);
      
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should trim whitespace before validation', () => {
      const result = validateQuery('  valid query  ');
      
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });

  describe('formatErrorMessage', () => {
    it('should return string errors as-is', () => {
      const result = formatErrorMessage('This is an error');
      
      expect(result).toBe('This is an error');
    });

    it('should return Error message property', () => {
      const error = new Error('Something went wrong');
      const result = formatErrorMessage(error);
      
      expect(result).toBe('Something went wrong');
    });

    it('should handle objects with message property', () => {
      const error = { message: 'Custom error object' };
      const result = formatErrorMessage(error);
      
      expect(result).toBe('Custom error object');
    });

    it('should handle null error', () => {
      const result = formatErrorMessage(null);
      
      expect(result).toBe('An unexpected error occurred');
    });

    it('should handle undefined error', () => {
      const result = formatErrorMessage(undefined);
      
      expect(result).toBe('An unexpected error occurred');
    });

    it('should handle number error', () => {
      const result = formatErrorMessage(404);
      
      expect(result).toBe('An unexpected error occurred');
    });

    it('should handle object without message property', () => {
      const result = formatErrorMessage({ status: 500, code: 'INTERNAL_ERROR' });
      
      expect(result).toBe('An unexpected error occurred');
    });

    it('should handle empty string error', () => {
      const result = formatErrorMessage('');
      
      expect(result).toBe('');
    });

    it('should handle Error with empty message', () => {
      const error = new Error('');
      const result = formatErrorMessage(error);
      
      expect(result).toBe('');
    });
  });

  describe('debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should delay function execution', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);
      
      // Call the debounced function
      debouncedFn('test');
      
      // Function should not be called immediately
      expect(mockFn).not.toHaveBeenCalled();
      
      // Fast-forward time
      jest.advanceTimersByTime(100);
      
      // Now function should be called
      expect(mockFn).toHaveBeenCalledWith('test');
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should cancel previous call when called again', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);
      
      // Call the debounced function
      debouncedFn('first');
      
      // Call again before delay expires
      jest.advanceTimersByTime(50);
      debouncedFn('second');
      
      // Fast-forward to original delay time
      jest.advanceTimersByTime(50);
      
      // Original call should be cancelled, function not called yet
      expect(mockFn).not.toHaveBeenCalled();
      
      // Fast-forward to complete the second delay
      jest.advanceTimersByTime(50);
      
      // Only the second call should execute
      expect(mockFn).toHaveBeenCalledWith('second');
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple rapid calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);
      
      // Make multiple rapid calls
      debouncedFn('call1');
      debouncedFn('call2');
      debouncedFn('call3');
      
      // Function should not be called yet
      expect(mockFn).not.toHaveBeenCalled();
      
      // Fast-forward time
      jest.advanceTimersByTime(100);
      
      // Only the last call should execute
      expect(mockFn).toHaveBeenCalledWith('call3');
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should handle zero delay', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 0);
      
      debouncedFn('test');
      
      // With zero delay, should still be debounced (next tick)
      expect(mockFn).not.toHaveBeenCalled();
      
      jest.advanceTimersByTime(0);
      
      expect(mockFn).toHaveBeenCalledWith('test');
    });

    it('should preserve function context and arguments', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);
      
      // Call with multiple arguments
      debouncedFn('arg1', 'arg2', { key: 'value' });
      
      jest.advanceTimersByTime(100);
      
      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2', { key: 'value' });
    });
  });

  describe('isDevelopment', () => {
    const originalDev = (globalThis as any).__DEV__;
    const originalWindow = (globalThis as any).window;

    afterEach(() => {
      (globalThis as any).__DEV__ = originalDev;
      (globalThis as any).window = originalWindow;
    });

    it('should return true when globalThis.__DEV__ is set', () => {
      (globalThis as any).__DEV__ = true;
      
      expect(isDevelopment()).toBe(true);
    });

    it('should return false when globalThis.__DEV__ is false', () => {
      (globalThis as any).__DEV__ = false;
      
      expect(isDevelopment()).toBe(false);  
    });

    it('should return true when window.__DEV__ is set', () => {
      delete (globalThis as any).__DEV__;
      
      // In jsdom environment, window is already defined, so we modify it directly
      const originalWindowDev = (window as any).__DEV__;
      (window as any).__DEV__ = true;
      
      expect(isDevelopment()).toBe(true);
      
      // Clean up
      if (originalWindowDev !== undefined) {
        (window as any).__DEV__ = originalWindowDev;
      } else {
        delete (window as any).__DEV__;
      }
    });

    it('should return false when no dev flags are set', () => {
      delete (globalThis as any).__DEV__;
      (globalThis as any).window = {};
      
      expect(isDevelopment()).toBe(false);
    });

    it('should return false when window is undefined', () => {
      delete (globalThis as any).__DEV__;
      delete (globalThis as any).window;
      
      expect(isDevelopment()).toBe(false);
    });
  });

  describe('safeJsonParse', () => {
    it('should parse valid JSON', () => {
      const json = '{"name": "test", "value": 123}';
      const result = safeJsonParse(json);
      
      expect(result).toEqual({ name: 'test', value: 123 });
    });

    it('should parse valid JSON array', () => {
      const json = '[1, 2, 3, "test"]';
      const result = safeJsonParse(json);
      
      expect(result).toEqual([1, 2, 3, 'test']);
    });

    it('should parse valid JSON primitives', () => {
      expect(safeJsonParse('true')).toBe(true);
      expect(safeJsonParse('false')).toBe(false);
      expect(safeJsonParse('null')).toBe(null);
      expect(safeJsonParse('123')).toBe(123);
      expect(safeJsonParse('"string"')).toBe('string');
    });

    it('should return null for invalid JSON', () => {
      const invalidJson = '{"name": "test", "value":}';
      const result = safeJsonParse(invalidJson);
      
      expect(result).toBe(null);
    });

    it('should return null for malformed JSON', () => {
      const malformedJson = '{name: test}';
      const result = safeJsonParse(malformedJson);
      
      expect(result).toBe(null);
    });

    it('should return null for empty string', () => {
      const result = safeJsonParse('');
      
      expect(result).toBe(null);
    });

    it('should return null for non-JSON string', () => {
      const result = safeJsonParse('this is not json');
      
      expect(result).toBe(null);
    });

    it('should handle complex nested objects', () => {
      const complexJson = JSON.stringify({
        user: { name: 'John', age: 30 },
        items: [{ id: 1, name: 'item1' }, { id: 2, name: 'item2' }],
        metadata: { created: '2023-01-01', tags: ['test', 'json'] }
      });
      
      const result = safeJsonParse(complexJson);
      
      expect(result).toEqual({
        user: { name: 'John', age: 30 },
        items: [{ id: 1, name: 'item1' }, { id: 2, name: 'item2' }],
        metadata: { created: '2023-01-01', tags: ['test', 'json'] }
      });
    });

    it('should work with generic type parameter', () => {
      interface TestInterface {
        name: string;
        count: number;
      }
      
      const json = '{"name": "test", "count": 5}';
      const result = safeJsonParse<TestInterface>(json);
      
      expect(result).toEqual({ name: 'test', count: 5 });
      
      // TypeScript would enforce the type at compile time
      if (result) {
        expect(typeof result.name).toBe('string');
        expect(typeof result.count).toBe('number');
      }
    });
  });
});
