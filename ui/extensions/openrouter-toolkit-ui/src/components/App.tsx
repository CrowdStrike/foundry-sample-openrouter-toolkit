// src/components/App.tsx

import React from "react";
import { useFalconApi } from "../hooks/useFalconApi";
import { ErrorBoundary } from "./ErrorBoundary";
import Home from "./Home";

/**
 * Main App component with error boundary
 */
function App(): React.ReactNode {
  const { isInitialized, falcon, error, retry } = useFalconApi();
  
  // Show error state if Falcon API failed to initialize
  if (error) {
    return (
      <div className="error-state p-6 rounded-lg">
        <h3 className="text-lg font-medium error-text mb-2">
          Failed to Initialize
        </h3>
        <p className="text-sm secondary-text mb-4">
          Unable to connect to the Falcon API: {error}
        </p>
        <button
          onClick={retry}
          className="error-button px-4 py-2 rounded hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Retry
        </button>
      </div>
    );
  }
  
  // Show loading state while initializing
  if (!isInitialized) {
    return (
      <div className="loading-state flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="loading-spinner animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-4"></div>
          <p className="secondary-text">Initializing...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <React.StrictMode>
        <div className="app-container font-sans min-h-screen p-4" data-testid="app-container">
          <Home falcon={falcon} />
        </div>
      </React.StrictMode>
    </ErrorBoundary>
  );
}

export default App;
