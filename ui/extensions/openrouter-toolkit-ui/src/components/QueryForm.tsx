// src/components/QueryForm.tsx

import React, { useEffect, useRef, useState } from 'react';
import { SlTextarea, SlSelect, SlOption, SlButton, SlCheckbox, SlIcon, SlTooltip, SlDetails } from '@shoelace-style/shoelace/dist/react';
import { MODEL_GROUPS, TEMPERATURE_OPTIONS, PROVIDER_SORT_OPTIONS } from '../utils/constants';

interface ContextOption {
  value: string;
  displayName: string;
  type: 'domain' | 'file' | 'ip' | 'fqdn';
  subType?: 'filename' | 'md5' | 'sha256';
  parentFile?: string;
  queryTemplate: string;
  entityData?: any;
}

interface QueryFormProps {
  query: string;
  setQuery: (query: string) => void;
  modelName: string;
  setModelName: (modelName: string) => void;
  temperature: number;
  setTemperature: (temperature: number) => void;
  online: boolean;
  setOnline: (online: boolean) => void;
  providerSort: string;
  setProviderSort: (providerSort: string) => void;
  loading: boolean;
  tokenCount: number | null;
  handleSubmit: () => void;
  selectedContextEntity: string | null;
  setSelectedContextEntity: (selectedContextEntity: string | null) => void;
  availableContextOptions: ContextOption[];
  falcon: any;
}

const QueryForm = React.memo(({ 
  query, 
  setQuery, 
  modelName, 
  setModelName, 
  temperature, 
  setTemperature,
  online,
  setOnline,
  providerSort,
  setProviderSort,
  loading,
  tokenCount,
  handleSubmit,
  selectedContextEntity,
  setSelectedContextEntity,
  availableContextOptions,
  falcon
}: QueryFormProps) => {
  const textareaRef = useRef<any>(null);
  
  // State for debug copy button acknowledgement
  const [debugCopyIconState, setDebugCopyIconState] = useState<"clipboard" | "check-circle">("clipboard");
  const [debugCopyButtonText, setDebugCopyButtonText] = useState("Copy JSON");

  // Debug copy handler with acknowledgement
  const handleDebugCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(falcon?.data || {}, null, 2));
      setDebugCopyIconState("check-circle");
      setDebugCopyButtonText("Copied!");
      
      setTimeout(() => {
        setDebugCopyIconState("clipboard");
        setDebugCopyButtonText("Copy JSON");
      }, 2000);
    } catch (e) {
      console.error('Copy failed:', e);
    }
  };

  // Set initial textarea dimensions on mount with delayed calculation and no transitions
  useEffect(() => {
    if (textareaRef.current) {
      const element = textareaRef.current;
      
      // Disable transitions temporarily to prevent visible resize
      element.style.transition = 'none';
      
      // Delay calculation to ensure component is fully rendered
      setTimeout(() => {
        element.style.height = 'auto';
        const calculatedHeight = Math.max(element.scrollHeight, 96);
        element.style.height = `${calculatedHeight}px`;
        
        // Re-enable transitions after calculation
        setTimeout(() => {
          element.style.transition = 'height 0.15s ease-out';
        }, 50);
      }, 50);
    }
  }, []);

  // Handle immediate resize during input to prevent scrollbar flicker
  const handleTextareaInput = (e: CustomEvent) => {
    const target = e.target as HTMLTextAreaElement;
    const newValue = target.value;
    
    // Resize immediately before state update to prevent scrollbar flicker
    if (textareaRef.current) {
      const element = textareaRef.current;
      const currentHeight = element.offsetHeight;
      
      // Calculate required height for new content
      const newHeight = Math.min(element.scrollHeight, 300);
      
      // Only resize if there's a meaningful difference
      if (Math.abs(newHeight - currentHeight) > 2) {
        element.style.height = `${newHeight}px`;
      }
    }
    
    // Update React state after resize
    setQuery(newValue);
  };

  const handleModelChange = (e: CustomEvent) => {
    const target = e.target as HTMLSelectElement;
    const newModel = target.value;
    setModelName(newModel);
  };
  
  const handleTemperatureChange = (e: CustomEvent) => {
    const target = e.target as HTMLSelectElement;
    const newTemp = parseFloat(target.value);
    setTemperature(newTemp);
  };

  const handleOnlineChange = (e: CustomEvent) => {
    const target = e.target as HTMLInputElement;
    setOnline(target.checked);
  };

  const handleProviderSortChange = (e: CustomEvent) => {
    const target = e.target as HTMLSelectElement;
    setProviderSort(target.value);
  };

  const handleContextEntityChange = (e: CustomEvent) => {
    const target = e.target as HTMLSelectElement;
    const selectedValue = target.value;
    
    if (selectedValue) {
      const selectedOption = availableContextOptions.find(option => option.value === selectedValue);
      if (selectedOption) {
        setSelectedContextEntity(selectedValue);
        setQuery(selectedOption.queryTemplate);
      }
    } else {
      setSelectedContextEntity(null);
    }
  };

  const isContextDisabled = availableContextOptions.length === 0;

  return (
    <div className="flex flex-col gap-4 isolate">
      {/* Incident Context Dropdown - Moved to top */}
      {isContextDisabled ? (
        <SlTooltip content="No context detected for this incident">
          <div className="opacity-60 cursor-not-allowed">
            <SlSelect
              label="Incident Context"
              value=""
              disabled={true}
            >
              <SlIcon slot="prefix" name="layers" />
              <SlOption value="" disabled>No entities available</SlOption>
            </SlSelect>
          </div>
        </SlTooltip>
      ) : (
        <SlSelect
          label="Incident Context"
          value={selectedContextEntity || ""}
          onSlChange={handleContextEntityChange}
        >
          <SlIcon slot="prefix" name="layers" />
          
          <SlOption value="">None Selected</SlOption>
          
          {/* Group by entity type */}
          {['domain', 'file', 'ip', 'fqdn'].map(type => {
            const optionsOfType = availableContextOptions.filter(option => option.type === type);
            if (optionsOfType.length === 0) return null;
            
            const groupConfig = {
              domain: { name: 'Domains', icon: 'envelope' },
              file: { name: 'Files', icon: 'file-earmark' },
              ip: { name: 'IP Addresses', icon: 'router' },
              fqdn: { name: 'FQDNs', icon: 'pc-display' }
            }[type];
            
            if (!groupConfig) return null;
            
            return (
              <React.Fragment key={type}>
                <SlOption value="" disabled>
                  <SlIcon name={groupConfig.icon} className="mr-2" />
                  {groupConfig.name}
                </SlOption>
                {optionsOfType.map((option) => (
                  <SlOption 
                    key={option.value} 
                    value={option.value}
                    className={option.subType === 'md5' || option.subType === 'sha256' ? 'hash-option' : ''}
                  >
                    {(option.subType === 'md5' || option.subType === 'sha256') && (
                      <SlIcon slot="prefix" name="chevron-right" />
                    )}
                    {option.displayName}
                  </SlOption>
                ))}
              </React.Fragment>
            );
          })}
        </SlSelect>
      )}

      <div className="relative min-h-[120px] z-10">
        <SlTextarea
          ref={textareaRef}
          label="Query"
          value={query}
          rows={4}
          placeholder="Enter your question or indicator..."
          onSlInput={handleTextareaInput}
        >
          <SlIcon slot="prefix" name="pencil" />
        </SlTextarea>
      </div>

      <div className="flex flex-col gap-3 relative z-20 mt-2">
        <SlSelect
          label="Model"
          value={modelName}
          onSlChange={handleModelChange}
        >
          <SlIcon slot="prefix" name="cpu" />
          
          {(Object.entries(MODEL_GROUPS) as [string, string[]][]).map(([groupName, models]: [string, string[]]) => (
            <React.Fragment key={groupName}>
              <SlOption value="" disabled>{groupName}</SlOption>
              {models.map((m: string) => (
                <SlOption key={m} value={m}>
                  {m}
                </SlOption>
              ))}
            </React.Fragment>
          ))}
        </SlSelect>

      </div>

      {/* Online Search - Now positioned after model selection */}
      <div className="flex items-center gap-2 mt-2">
        <SlIcon name="search" />
        <SlTooltip content="Search the web for current information. May result in longer response times.">
          <SlCheckbox
            checked={online}
            onSlChange={handleOnlineChange}
          >
            Enable Online Search
          </SlCheckbox>
        </SlTooltip>
      </div>

      {/* Advanced Options Section */}
      <SlDetails 
        summary="Advanced Options" 
        className="advanced-options mt-2"
      >
        <div className="advanced-options-grid grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
          {/* Temperature */}
          <div className="temperature-container">
            <div className="flex items-center gap-2">
              <SlSelect
                label="Temperature"
                value={temperature.toString()}
                onSlChange={handleTemperatureChange}
                style={{
                  minWidth: '180px', 
                  width: '100%',
                  '--sl-input-option-padding-medium': '0.75rem 1rem'
                } as any}
              >
                <SlIcon slot="prefix" name="thermometer-half" />
                {TEMPERATURE_OPTIONS.map(option => (
                  <SlOption key={option.value} value={option.value.toString()}>
                    {option.label}
                  </SlOption>
                ))}
              </SlSelect>
              <SlTooltip>
                <div slot="content">
                  <div>Controls how creative vs predictable responses are.</div>
                  <div>Lower = more focused, Higher = more creative.</div>
                </div>
                <SlIcon name="info-circle" className="text-body-and-labels cursor-help mt-6" />
              </SlTooltip>
            </div>
          </div>

          {/* Provider Sort */}
          <div className="provider-sort-container">
            <div className="flex items-center gap-2">
              <SlSelect
                label="Provider Priority"
                value={providerSort}
                onSlChange={handleProviderSortChange}
                style={{
                  minWidth: '180px', 
                  width: '100%',
                  '--sl-input-option-padding-medium': '0.75rem 1rem'
                } as any}
              >
                <SlIcon slot="prefix" name="server" />
                {PROVIDER_SORT_OPTIONS.map(option => (
                  <SlOption key={option.value} value={option.value}>
                    {option.label}
                  </SlOption>
                ))}
              </SlSelect>
              <SlTooltip>
                <div slot="content">
                  <div>Throughput: Fastest response generation</div>
                  <div>Price: Lowest cost per token</div>
                  <div>Latency: Fastest time to first token</div>
                </div>
                <SlIcon name="info-circle" className="text-body-and-labels cursor-help mt-6" />
              </SlTooltip>
            </div>
          </div>
        </div>

        {/* Falcon Context Debug Section */}
        <SlDetails className="debug-section mt-4">
          <div slot="summary" className="flex items-center gap-2">
            <SlIcon name="code-square" />
            <span>Falcon Context Debug</span>
          </div>
          
          <div className="flex justify-end mb-2">
            <SlButton 
              size="small" 
              variant="text"
              onClick={handleDebugCopy}
              className={`compact-copy-btn ${
                debugCopyIconState === "check-circle" 
                  ? "text-green-500 transition-colors duration-200" 
                  : "text-body-and-labels"
              }`}
              title={debugCopyButtonText}
            >
              <SlIcon name={debugCopyIconState} />
            </SlButton>
          </div>
          
          <textarea
            value={JSON.stringify(falcon?.data || {}, null, 2)}
            readOnly
            placeholder="No Falcon data available"
            style={{
              fontFamily: 'monospace',
              fontSize: '11px',
              width: '100%',
              height: '250px',
              maxHeight: '400px',
              minHeight: '200px',
              border: '1px solid rgb(var(--sl-color-neutral-300))',
              borderRadius: '6px',
              padding: '12px',
              backgroundColor: 'rgb(var(--sl-color-neutral-50))',
              color: 'rgb(var(--sl-color-neutral-900))',
              resize: 'vertical',
              overflow: 'auto',
              lineHeight: '1.4',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </SlDetails>
      </SlDetails>

      <div className="flex flex-col gap-2 mt-3">
        <div className="flex justify-between items-center">
          <div className="text-body-and-labels whitespace-pre-line">
            {tokenCount && !loading && (
              <span>{tokenCount} tokens used</span>
            )}
          </div>
          
          <SlButton
            variant="primary"
            size="medium"
            disabled={loading || !query.trim()}
            onClick={handleSubmit}
          >
            <SlIcon slot="prefix" name={loading ? "hourglass-split" : "send"} />
            {loading ? "Running..." : "Submit"}
          </SlButton>
        </div>
      </div>
    </div>
  );
});

QueryForm.displayName = 'QueryForm';

export default QueryForm;
