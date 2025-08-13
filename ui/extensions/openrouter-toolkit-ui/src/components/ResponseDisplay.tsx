// src/components/ResponseDisplay.tsx

import React from 'react';
import { SlButton, SlSpinner, SlIcon } from '@shoelace-style/shoelace/dist/react';
import ReactMarkdown from 'react-markdown';
import { getDisplayModelName } from '../utils/helpers';

interface ResponseDisplayProps {
  loading: boolean;
  responseText: string;
  errorMessage: string;
  modelName: string;
  online: boolean;
  copyIconState: "clipboard" | "check-circle";
  copyButtonText: string;
  copyToClipboard: () => void;
}

const ResponseDisplay = React.memo(({ 
  loading, 
  responseText, 
  errorMessage, 
  modelName, 
  online,
  copyIconState, 
  copyButtonText, 
  copyToClipboard
}: ResponseDisplayProps) => {
  // Create the display model name with online suffix if needed
  const displayModel = getDisplayModelName(modelName, online);

  return (
    <div className="h-[480px] p-3 bg-surface-base rounded-lg focus:outline-none border border-lines-light" tabIndex={-1} data-testid="response-display">
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-96 gap-3 text-body-and-labels">
          <SlSpinner />
          <p className="text-base text-center text-titles-and-attributes">
            Waiting for response from<br />{displayModel}
          </p>
        </div>
      ) : responseText ? (
        <div className="relative h-full max-h-[420px] flex flex-col">
          <div className="flex justify-end mb-3 flex-shrink-0">
            <SlButton 
              size="small" 
              variant="text" 
              onClick={copyToClipboard}
              className={`compact-copy-btn ${
                copyIconState === "check-circle" 
                  ? "text-green-500 transition-colors duration-200" 
                  : "text-body-and-labels"
              }`}
              title={copyButtonText}
              data-testid="copy-button"
            >
              <SlIcon name={copyIconState} />
            </SlButton>
          </div>
          <div className="flex-1 overflow-y-auto bg-transparent text-text-and-icons response-content" data-testid="response">
            <ReactMarkdown>
              {responseText}
            </ReactMarkdown>
          </div>
        </div>
      ) : errorMessage ? (
        <div className="flex flex-col items-center justify-center min-h-96 text-critical gap-3">
          <SlIcon name="exclamation-triangle" />
          <p className="text-base text-center">{errorMessage}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-96 text-body-and-labels gap-3">
          <SlIcon name="chat-square-text" />
          <p className="text-base">Query results will appear here</p>
        </div>
      )}
    </div>
  );
});

ResponseDisplay.displayName = 'ResponseDisplay';

export default ResponseDisplay;
