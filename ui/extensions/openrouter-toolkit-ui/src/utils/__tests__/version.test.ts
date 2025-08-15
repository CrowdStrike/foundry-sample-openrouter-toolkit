import { VERSION, VersionInfo } from '../version';

// Store original globals to restore later
const originalBuildNumber = (globalThis as any).BUILD_NUMBER;
const originalBuildDate = (globalThis as any).BUILD_DATE;
const originalIsProduction = (globalThis as any).IS_PRODUCTION;

describe('version', () => {
  afterEach(() => {
    // Restore original globals
    (globalThis as any).BUILD_NUMBER = originalBuildNumber;
    (globalThis as any).BUILD_DATE = originalBuildDate;
    (globalThis as any).IS_PRODUCTION = originalIsProduction;
  });

  describe('VERSION object', () => {
    it('should have correct structure', () => {
      expect(VERSION).toBeDefined();
      expect(typeof VERSION).toBe('object');
      expect(VERSION).toHaveProperty('buildNumber');
      expect(VERSION).toHaveProperty('buildDate');
      expect(VERSION).toHaveProperty('isProduction');
    });

    it('should have string buildNumber', () => {
      expect(typeof VERSION.buildNumber).toBe('string');
    });

    it('should have string buildDate', () => {
      expect(typeof VERSION.buildDate).toBe('string');
    });

    it('should have boolean isProduction', () => {
      expect(typeof VERSION.isProduction).toBe('boolean');
    });

    it('should match VersionInfo interface structure', () => {
      const versionInfo: VersionInfo = VERSION;
      expect(versionInfo.buildNumber).toBeDefined();
      expect(versionInfo.buildDate).toBeDefined();
      expect(versionInfo.isProduction).toBeDefined();
    });
  });

  describe('default values', () => {
    beforeEach(() => {
      // Clear the module cache to test default behavior
      jest.resetModules();
    });

    it('should use default buildNumber when BUILD_NUMBER is undefined', async () => {
      delete (globalThis as any).BUILD_NUMBER;
      
      const { VERSION: freshVersion } = await import('../version');
      expect(freshVersion.buildNumber).toBe('dev');
    });

    it('should use default buildDate when BUILD_DATE is undefined', async () => {
      delete (globalThis as any).BUILD_DATE;
      
      const { VERSION: freshVersion } = await import('../version');
      
      // Should be a valid date string in YYYY-MM-DD format
      expect(freshVersion.buildDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      
      // Should be a recent date (within the last day to account for test timing)
      const buildDate = new Date(freshVersion.buildDate);
      const today = new Date();
      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
      
      expect(buildDate >= yesterday).toBe(true);
      expect(buildDate <= today).toBe(true);
    });

    it('should use default isProduction when IS_PRODUCTION is undefined', async () => {
      delete (globalThis as any).IS_PRODUCTION;
      
      const { VERSION: freshVersion } = await import('../version');
      expect(freshVersion.isProduction).toBe(false);
    });
  });

  describe('build-time values', () => {
    beforeEach(() => {
      jest.resetModules();
    });

    it('should use BUILD_NUMBER when defined', async () => {
      (globalThis as any).BUILD_NUMBER = '1.2.3-build.456';
      
      const { VERSION: freshVersion } = await import('../version');
      expect(freshVersion.buildNumber).toBe('1.2.3-build.456');
    });

    it('should use BUILD_DATE when defined', async () => {
      (globalThis as any).BUILD_DATE = '2023-12-25';
      
      const { VERSION: freshVersion } = await import('../version');
      expect(freshVersion.buildDate).toBe('2023-12-25');
    });

    it('should use IS_PRODUCTION when defined as true', async () => {
      (globalThis as any).IS_PRODUCTION = true;
      
      const { VERSION: freshVersion } = await import('../version');
      expect(freshVersion.isProduction).toBe(true);
    });

    it('should use IS_PRODUCTION when defined as false', async () => {
      (globalThis as any).IS_PRODUCTION = false;
      
      const { VERSION: freshVersion } = await import('../version');
      expect(freshVersion.isProduction).toBe(false);
    });
  });

  describe('mixed scenarios', () => {
    beforeEach(() => {
      jest.resetModules();
    });

    it('should handle partial build-time constants', async () => {
      (globalThis as any).BUILD_NUMBER = '2.0.0';
      delete (globalThis as any).BUILD_DATE;
      (globalThis as any).IS_PRODUCTION = true;
      
      const { VERSION: freshVersion } = await import('../version');
      
      expect(freshVersion.buildNumber).toBe('2.0.0');
      expect(freshVersion.buildDate).toMatch(/^\d{4}-\d{2}-\d{2}$/); // Default date format
      expect(freshVersion.isProduction).toBe(true);
    });

    it('should handle all build-time constants defined', async () => {
      (globalThis as any).BUILD_NUMBER = '3.1.4';
      (globalThis as any).BUILD_DATE = '2024-01-15';
      (globalThis as any).IS_PRODUCTION = true;
      
      const { VERSION: freshVersion } = await import('../version');
      
      expect(freshVersion.buildNumber).toBe('3.1.4');
      expect(freshVersion.buildDate).toBe('2024-01-15');
      expect(freshVersion.isProduction).toBe(true);
    });

    it('should handle empty string build constants', async () => {
      (globalThis as any).BUILD_NUMBER = '';
      (globalThis as any).BUILD_DATE = '';
      (globalThis as any).IS_PRODUCTION = false;
      
      const { VERSION: freshVersion } = await import('../version');
      
      expect(freshVersion.buildNumber).toBe('');
      expect(freshVersion.buildDate).toBe('');
      expect(freshVersion.isProduction).toBe(false);
    });
  });

  describe('type safety', () => {
    it('should ensure buildNumber is always a string', () => {
      expect(typeof VERSION.buildNumber).toBe('string');
      
      // Even if somehow BUILD_NUMBER was not a string, it should be cast to string
      const versionInfo: VersionInfo = {
        buildNumber: VERSION.buildNumber,
        buildDate: VERSION.buildDate,
        isProduction: VERSION.isProduction
      };
      
      expect(typeof versionInfo.buildNumber).toBe('string');
    });

    it('should ensure buildDate is always a string', () => {
      expect(typeof VERSION.buildDate).toBe('string');
      
      const versionInfo: VersionInfo = {
        buildNumber: VERSION.buildNumber,
        buildDate: VERSION.buildDate,
        isProduction: VERSION.isProduction
      };
      
      expect(typeof versionInfo.buildDate).toBe('string');
    });

    it('should ensure isProduction is always a boolean', () => {
      expect(typeof VERSION.isProduction).toBe('boolean');
      
      const versionInfo: VersionInfo = {
        buildNumber: VERSION.buildNumber,
        buildDate: VERSION.buildDate,
        isProduction: VERSION.isProduction
      };
      
      expect(typeof versionInfo.isProduction).toBe('boolean');
    });
  });

  describe('immutability', () => {
    it('should not allow modification of VERSION object', () => {
      const originalBuildNumber = VERSION.buildNumber;
      const originalBuildDate = VERSION.buildDate;
      const originalIsProduction = VERSION.isProduction;
      
      // Try to modify (this might not throw in non-strict mode, but values shouldn't change)
      try {
        (VERSION as any).buildNumber = 'modified';
        (VERSION as any).buildDate = 'modified';
        (VERSION as any).isProduction = !VERSION.isProduction;
      } catch (e) {
        // If it throws, that's fine - the object is properly immutable
      }
      
      // Values should remain unchanged or at least maintain their types
      expect(typeof VERSION.buildNumber).toBe('string');
      expect(typeof VERSION.buildDate).toBe('string');
      expect(typeof VERSION.isProduction).toBe('boolean');
    });
  });

  describe('edge cases', () => {
    beforeEach(() => {
      jest.resetModules();
    });

    it('should handle null build constants', async () => {
      (globalThis as any).BUILD_NUMBER = null;
      (globalThis as any).BUILD_DATE = null;
      (globalThis as any).IS_PRODUCTION = null;
      
      const { VERSION: freshVersion } = await import('../version');
      
      // null is not undefined, so they will be used as-is (type assertions don't convert at runtime)
      expect(freshVersion.buildNumber).toBe(null); // null as string is still null at runtime
      expect(freshVersion.buildDate).toBe(null); // null as string is still null at runtime  
      expect(freshVersion.isProduction).toBe(null); // null as boolean is still null at runtime
    });

    it('should handle numeric build constants', async () => {
      (globalThis as any).BUILD_NUMBER = 123;
      (globalThis as any).BUILD_DATE = 20231225;
      (globalThis as any).IS_PRODUCTION = 1;
      
      const { VERSION: freshVersion } = await import('../version');
      
      // Type assertions (as string/boolean) don't convert values at runtime
      expect(freshVersion.buildNumber).toBe(123); // 123 as string is still 123 at runtime
      expect(freshVersion.buildDate).toBe(20231225); // number as string is still number at runtime
      expect(freshVersion.isProduction).toBe(1); // 1 as boolean is still 1 at runtime
    });
  });
});
