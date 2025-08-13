import '@testing-library/jest-dom';
import React from 'react';

// Mock navigator.clipboard - will be set up by userEvent.setup() in tests
const mockWriteText = jest.fn();

// Mock Shoelace components
jest.mock('@shoelace-style/shoelace/dist/react', () => ({
  SlCard: ({ children, ...props }: any) => 
    React.createElement('div', { 'data-testid': 'sl-card', ...props }, children),
  SlIcon: ({ name, ...props }: any) => 
    React.createElement('div', { 'data-testid': 'sl-icon', 'data-name': name, ...props }),
  SlTabGroup: ({ children, onSlTabShow, ...props }: any) =>
    React.createElement('div', { 'data-testid': 'sl-tab-group', ...props }, children),
  SlTab: ({ children, panel, disabled, ...props }: any) =>
    React.createElement('div', { 
      'data-testid': 'sl-tab', 
      'data-panel': panel, 
      'data-disabled': disabled, 
      ...props 
    }, children),
  SlTabPanel: ({ children, name, ...props }: any) =>
    React.createElement('div', { 'data-testid': 'sl-tab-panel', 'data-name': name, ...props }, children),
}));

// Remove global helpers mock - let individual tests mock as needed

const mockResponseCache = {
  get: jest.fn(),
  set: jest.fn(),
  clear: jest.fn(),
  size: jest.fn(),
  cleanup: jest.fn(),
  getStats: jest.fn().mockReturnValue({
    size: 0,
    maxSize: 100,
    hitRate: 0,
    totalHits: 0,
    totalMisses: 0
  })
};

jest.mock('./utils/cache', () => {
  const actual = jest.requireActual('./utils/cache');
  return {
    ...actual,
    responseCache: mockResponseCache,
  };
});

jest.mock('./utils/constants', () => {
  const actual = jest.requireActual('./utils/constants');
  return {
    ...actual,
    DEFAULT_MODEL: 'test-model',
    DEFAULT_TEMPERATURE: 0.7,
    DEFAULT_PROVIDER_SORT: 'test-sort',
  };
});

// Remove global component mocks - let individual tests mock as needed

// Create global test utilities
const mockFalconApi = {
  api: {
    workflows: {
      postEntitiesExecuteV1: jest.fn(),
      getEntitiesExecutionResultsV1: jest.fn(),
    },
  },
  data: {
    incident: {
      entity_values: {
        email_addresses: ['test@example.com', 'user@test.com'],
        ipv4s: ['192.168.1.1', '10.0.0.1'],
        host_names: ['example.com', 'test.example.org'],
      },
      entities_full: [
        {
          FileName: 'test.exe',
          MD5HashData: 'abcd1234efgh5678ijkl9012mnop3456',
          SHA256HashData: 'abcd1234efgh5678ijkl9012mnop3456abcd1234efgh5678ijkl9012mnop3456',
        },
      ],
    },
  },
};

// Export for use in tests
export {
  mockFalconApi,
  mockResponseCache,
  mockWriteText,
};

// Mock console methods to reduce noise in tests
const originalConsole = console;
Object.defineProperty(console, 'debug', { value: jest.fn(), writable: true });
Object.defineProperty(console, 'error', { value: jest.fn(), writable: true });
Object.defineProperty(console, 'warn', { value: jest.fn(), writable: true });
Object.defineProperty(console, 'log', { value: jest.fn(), writable: true });
