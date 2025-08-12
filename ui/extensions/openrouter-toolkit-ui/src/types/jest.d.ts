import '@testing-library/jest-dom';

declare global {
  var mockFalconApi: any;
  
  namespace NodeJS {
    interface Global {
      mockFalconApi: any;
    }
  }
}

export {};
