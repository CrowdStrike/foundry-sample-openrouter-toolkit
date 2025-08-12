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

// Mock utility functions
const mockValidateQuery = jest.fn();
const mockWait = jest.fn((ms: number) => Promise.resolve());
const mockGetDisplayModelName = jest.fn((model: string, online: boolean) => model);
const mockFormatErrorMessage = jest.fn((error: any) => error.message || 'Unknown error');
const mockGenerateCacheKey = jest.fn((...args: any[]) => `cache-key-${args.join('-')}`);

jest.mock('./utils/helpers', () => ({
  validateQuery: mockValidateQuery,
  wait: mockWait,
  getDisplayModelName: mockGetDisplayModelName,
  formatErrorMessage: mockFormatErrorMessage,
  generateCacheKey: mockGenerateCacheKey,
}));

const mockResponseCache = {
  get: jest.fn(),
  set: jest.fn(),
  clear: jest.fn(),
};

jest.mock('./utils/cache', () => ({
  responseCache: mockResponseCache,
}));

jest.mock('./utils/constants', () => ({
  DEFAULT_MODEL: 'test-model',
  DEFAULT_TEMPERATURE: 0.7,
  DEFAULT_PROVIDER_SORT: 'test-sort',
}));

// Mock child components
jest.mock('./components/QueryForm', () => {
  return function MockQueryForm(props: any) {
    return React.createElement('div', { 'data-testid': 'query-form' },
      React.createElement('input', {
        'data-testid': 'query-input',
        value: props.query,
        onChange: (e: any) => props.setQuery(e.target.value)
      }),
      React.createElement('button', {
        'data-testid': 'submit-button',
        onClick: props.handleSubmit,
        disabled: props.loading
      }, 'Submit')
    );
  };
});

jest.mock('./components/ResponseDisplay', () => {
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
  mockValidateQuery,
  mockWait,
  mockGetDisplayModelName,
  mockFormatErrorMessage,
  mockGenerateCacheKey,
  mockResponseCache,
  mockWriteText,
};

// Mock console methods to reduce noise in tests
const originalConsole = console;
Object.defineProperty(console, 'debug', { value: jest.fn(), writable: true });
Object.defineProperty(console, 'error', { value: jest.fn(), writable: true });
Object.defineProperty(console, 'warn', { value: jest.fn(), writable: true });
