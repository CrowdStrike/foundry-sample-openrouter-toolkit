// src/components/Home.tsx

import React, { useState, useCallback, useRef, useEffect } from "react";
import { SlCard, SlIcon, SlTabGroup, SlTab, SlTabPanel } from '@shoelace-style/shoelace/dist/react';
import QueryForm from './QueryForm';
import ResponseDisplay from './ResponseDisplay';
import { DEFAULT_MODEL, DEFAULT_TEMPERATURE, DEFAULT_PROVIDER_SORT } from '../utils/constants';
import { 
  validateQuery, 
  wait, 
  getDisplayModelName,
  formatErrorMessage,
  generateCacheKey
} from '../utils/helpers';
import { responseCache } from '../utils/cache';

interface HomeProps {
  falcon: any; // Use any for now since FalconApi types are complex
}

interface ContextOption {
  value: string;
  displayName: string;
  type: 'domain' | 'file' | 'ip' | 'fqdn';
  subType?: 'filename' | 'md5' | 'sha256';
  parentFile?: string;
  queryTemplate: string;
  entityData?: any;
}

interface HomeState {
  query: string;
  modelName: string;
  online: boolean;
  temperature: number;
  providerSort: string;
  responseText: string;
  status: string;
  loading: boolean;
  tokenCount: number | null;
  errorMessage: string;
  copyIconState: "clipboard" | "check-circle";
  copyButtonText: string;
  hasSubmittedQuery: boolean;
  activeTab: "request" | "response";
  selectedContextEntity: string | null;
  availableContextOptions: ContextOption[];
}

const Home = React.memo(({ falcon }: HomeProps) => {
  const tabGroupRef = useRef<any>(null);
  const [state, setState] = useState<HomeState>({
    query: "",
    modelName: DEFAULT_MODEL,
    online: false,
    temperature: DEFAULT_TEMPERATURE,
    providerSort: DEFAULT_PROVIDER_SORT,
    responseText: "",
    status: "",
    loading: false,
    tokenCount: null,
    errorMessage: "",
    copyIconState: "clipboard",
    copyButtonText: "Copy",
    hasSubmittedQuery: false,
    activeTab: "request",
    selectedContextEntity: null,
    availableContextOptions: []
  });

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(state.responseText);
      setState(prev => ({
        ...prev,
        copyIconState: "check-circle",
        copyButtonText: "Copied!"
      }));
      
      setTimeout(() => {
        setState(prev => ({
          ...prev,
          copyIconState: "clipboard",
          copyButtonText: "Copy"
        }));
      }, 2000);
    } catch (e) {
      console.error("Copy failed:", e);
      setState(prev => ({
        ...prev,
        status: "Copy not supported in this environment"
      }));
      
      setTimeout(() => {
        setState(prev => ({
          ...prev,
          status: prev.loading ? "Waiting for response..." : ""
        }));
      }, 2000);
    }
  }, [state.responseText, state.loading]);

  const handleSubmit = useCallback(async () => {
    // Validate input
    const validation = validateQuery(state.query);
    if (!validation.isValid) {
      setState(prev => ({
        ...prev,
        errorMessage: validation.error || "Invalid query",
        activeTab: "request"
      }));
      return;
    }

    // Check cache first
    const cacheKey = generateCacheKey(state.query, state.modelName, state.temperature, state.online, state.providerSort);
    const cachedResponse = responseCache.get(cacheKey);
    
    if (cachedResponse) {
      setState(prev => ({
        ...prev,
        hasSubmittedQuery: true,
        activeTab: "response",
        responseText: cachedResponse.content,
        status: "Done (cached)",
        errorMessage: "",
        tokenCount: cachedResponse.usage?.total_tokens || null
      }));
      return;
    }

    // Enable response tab and switch to it
    setState(prev => ({
      ...prev,
      hasSubmittedQuery: true,
      activeTab: "response",
      loading: true,
      status: `Waiting for response from ${state.modelName}`,
      responseText: "",
      tokenCount: null,
      errorMessage: ""
    }));

    try {
      // Use consistent workflow configuration for all models
      const workflowConfig = { name: "OpenRouter Toolkit Query", depth: 0 };
      const actualModel = getDisplayModelName(state.modelName, state.online);
      
      const requestPayload: any = {
        user_prompt_input: state.query,
        model_name_input: actualModel,
        temperature_input: state.temperature,
        online_input: state.online,
        provider_sort_input: state.providerSort
      };
      
      // Add context data if entity is selected
      if (state.selectedContextEntity) {
        requestPayload.context_data_input = state.selectedContextEntity;
      }

      const pending = await falcon.api.workflows.postEntitiesExecuteV1(
        requestPayload,
        workflowConfig
      );

      if (pending.errors) {
        const errorMsg = pending.errors[0]?.message || "Unknown error occurred";
        setState(prev => ({
          ...prev,
          responseText: "",
          errorMessage: `Error: ${errorMsg}`,
          status: "Error",
          loading: false
        }));
        return;
      }

      const workflowId = pending.resources?.[0];
      if (!workflowId) {
        throw new Error("No workflow ID returned");
      }

      let attempts = 0;
      const maxAttempts = state.online ? 20 : 10;
      const maxDelay = state.online ? 15000 : 10000;
      let delay = 1000;

      while (attempts < maxAttempts) {
        attempts++;
        try {
          const result = await falcon.api.workflows.getEntitiesExecutionResultsV1({
            ids: [workflowId]
          });
          const res = result.resources?.[0];

          if (res?.status === "Completed" && res.output_data) {
            let text: string = "";
            let tokens: number | null = null;
            
            // Use consistent response parsing for all models
            const textKey = res.output_data ? Object.keys(res.output_data).find(key =>
              key.includes("model_output_text")
            ) : undefined;
            
            if (textKey) {
              text = res.output_data[textKey] || "";
            } else if (res.output_data.content) {
              // Fallback to content field
              text = res.output_data.content || "";
            }
            
            // Extract token information if available
            if (res.output_data.total_tokens) {
              tokens = res.output_data.total_tokens;
            }

            if (text.trim()) {
              // Cache successful response
              const response: any = {
                content: text,
                model: state.modelName
              };
              
              if (tokens) {
                response.usage = { 
                  total_tokens: tokens, 
                  prompt_tokens: 0, 
                  completion_tokens: tokens 
                };
              }
              
              responseCache.set(cacheKey, response);

              setState(prev => ({
                ...prev,
                responseText: text,
                status: "Done",
                loading: false,
                tokenCount: tokens
              }));
              return;
            }
          } else if (res?.status === "Failed") {
            const failMsg = res.message || "Unknown workflow error";
            setState(prev => ({
              ...prev,
              responseText: "",
              errorMessage: `Workflow execution failed: ${failMsg}`,
              status: "Failed",
              loading: false
            }));
            return;
          }
        } catch (error) {
          console.error(`Polling error on attempt ${attempts}:`, error);
        }
        
        delay = Math.min(delay * 1.5, maxDelay);
        await wait(delay);
      }

      setState(prev => ({
        ...prev,
        responseText: "",
        errorMessage: "Workflow execution timed out after multiple attempts",
        status: "Timeout",
        loading: false
      }));

    } catch (e) {
      console.error("Workflow error:", e);
      const errorMessage = formatErrorMessage(e);
      setState(prev => ({
        ...prev,
        responseText: "",
        errorMessage: `Error: ${errorMessage}`,
        status: "Error",
        loading: false
      }));
    }
  }, [state.query, state.modelName, state.temperature, state.online, state.providerSort, falcon]);

  const getResponseTabIndicator = useCallback(() => {
    if (!state.hasSubmittedQuery) return null;
    if (state.loading) return <SlIcon name="hourglass-split" className="ml-1 text-informational" />;
    if (state.errorMessage) return <SlIcon name="exclamation-triangle" className="ml-1 text-critical" />;
    if (state.responseText) return <SlIcon name="check-circle" className="ml-1 text-positive" />;
    return null;
  }, [state.hasSubmittedQuery, state.loading, state.errorMessage, state.responseText]);

  const handleTabChange = useCallback((e: CustomEvent) => {
    setState(prev => ({
      ...prev,
      activeTab: e.detail.name as "request" | "response"
    }));
  }, []);

  const updateState = useCallback((updates: Partial<HomeState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  // Programmatically switch tabs when activeTab state changes
  useEffect(() => {
    if (tabGroupRef.current && state.activeTab) {
      try {
        tabGroupRef.current.show(state.activeTab);
      } catch (e) {
        // Silently handle any tab switching errors
        console.debug('Tab switching error:', e);
      }
    }
  }, [state.activeTab]);

  // Build context options from falcon.data for the dropdown
  const buildContextOptions = useCallback(() => {
    if (!falcon?.data) return [];
    
    // Check both incident and detection contexts
    const entityValues = falcon.data.incident?.entity_values || falcon.data.detection?.entity_values;
    const entitiesFull = falcon.data.incident?.entities_full || falcon.data.detection?.entities_full || [];
    
    if (!entityValues) return [];

    const options: ContextOption[] = [];

    // Add domains from email addresses
    if (entityValues.email_addresses && Array.isArray(entityValues.email_addresses)) {
      const domains = new Map<string, number>();
      entityValues.email_addresses.forEach((email: string) => {
        const domain = email.split('@')[1];
        if (domain) {
          domains.set(domain, (domains.get(domain) || 0) + 1);
        }
      });

      domains.forEach((count, domain) => {
        options.push({
          value: domain,
          displayName: `${domain} (${count} email${count > 1 ? 's' : ''})`,
          type: 'domain',
          queryTemplate: `Analyze threat intelligence for domain: ${domain}`,
          entityData: { domain, count }
        });
      });
    }

    // Add files with hierarchical structure (filename + individual hashes)
    if (entitiesFull && Array.isArray(entitiesFull)) {
      entitiesFull.forEach((entity: any) => {
        if (entity && entity.FileName && (entity.MD5HashData || entity.SHA256HashData)) {
          // 1. Add filename option (parent)
          options.push({
            value: `file:${entity.FileName}`,
            displayName: entity.FileName,
            type: 'file',
            subType: 'filename',
            queryTemplate: `Analyze security characteristics of file: ${entity.FileName}`,
            entityData: { 
              filename: entity.FileName, 
              md5: entity.MD5HashData, 
              sha256: entity.SHA256HashData 
            }
          });

          // 2. Add MD5 option (child) - if exists
          if (entity.MD5HashData && typeof entity.MD5HashData === 'string') {
            options.push({
              value: `md5:${entity.MD5HashData}`,
              displayName: `MD5: ${entity.MD5HashData.substring(0, 8)}...`,
              type: 'file',
              subType: 'md5',
              parentFile: entity.FileName,
              queryTemplate: `Analyze MD5 hash for malware indicators: ${entity.MD5HashData}`,
              entityData: { 
                hash: entity.MD5HashData, 
                hashType: 'MD5', 
                filename: entity.FileName 
              }
            });
          }

          // 3. Add SHA256 option (child) - if exists
          if (entity.SHA256HashData && typeof entity.SHA256HashData === 'string') {
            options.push({
              value: `sha256:${entity.SHA256HashData}`,
              displayName: `SHA256: ${entity.SHA256HashData.substring(0, 8)}...`,
              type: 'file',
              subType: 'sha256',
              parentFile: entity.FileName,
              queryTemplate: `Analyze SHA256 hash for malware indicators: ${entity.SHA256HashData}`,
              entityData: { 
                hash: entity.SHA256HashData, 
                hashType: 'SHA256', 
                filename: entity.FileName 
              }
            });
          }
        }
      });
    }

    // Add IP addresses
    if (entityValues.ipv4s && Array.isArray(entityValues.ipv4s)) {
      entityValues.ipv4s.forEach((ip: string) => {
        options.push({
          value: ip,
          displayName: ip,
          type: 'ip',
          queryTemplate: `Analyze threat intelligence for IP address: ${ip}`,
          entityData: { ip }
        });
      });
    }

    // Add FQDNs only
    if (entityValues.host_names && Array.isArray(entityValues.host_names)) {
      const fqdns = entityValues.host_names.filter((hostname: string) => {
        if (!hostname.includes('.')) return false;
        if (hostname === '.' || hostname === 'localhost') return false;
        if (/^\d+\.\d+\.\d+\.\d+$/.test(hostname)) return false;
        const parts = hostname.split('.');
        return parts.length >= 2 && (parts[parts.length - 1]?.length ?? 0) >= 2;
      });

      fqdns.forEach((fqdn: string) => {
        options.push({
          value: fqdn,
          displayName: fqdn,
          type: 'fqdn',
          queryTemplate: `Analyze threat intelligence for hostname: ${fqdn}`,
          entityData: { hostname: fqdn }
        });
      });
    }

    return options;
  }, [falcon]);

  return (
    <div className="w-full py-2">
      <SlCard className="full-width-card">
        <SlTabGroup
          ref={tabGroupRef}
          placement="top"
          onSlTabShow={handleTabChange}
        >
          <SlTab slot="nav" panel="request" style={{fontSize: '1.1rem', fontWeight: '600'}}>
            <SlIcon name="pencil" className="mr-2" />
            Request
          </SlTab>
          <SlTab 
            slot="nav" 
            panel="response"
            disabled={!state.hasSubmittedQuery}
            className={!state.hasSubmittedQuery ? "opacity-50 cursor-not-allowed" : ""}
            style={{fontSize: '1.1rem', fontWeight: '600'}}
          >
            Response
            {getResponseTabIndicator()}
          </SlTab>
          
          <SlTabPanel name="request">
            <QueryForm
              query={state.query}
              setQuery={(query: string) => updateState({ query })}
              modelName={state.modelName}
              setModelName={(modelName: string) => updateState({ modelName })}
              temperature={state.temperature}
              setTemperature={(temperature: number) => updateState({ temperature })}
              online={state.online}
              setOnline={(online: boolean) => updateState({ online })}
              providerSort={state.providerSort}
              setProviderSort={(providerSort: string) => updateState({ providerSort })}
              loading={state.loading}
              tokenCount={state.tokenCount}
              handleSubmit={handleSubmit}
              selectedContextEntity={state.selectedContextEntity}
              setSelectedContextEntity={(selectedContextEntity: string | null) => updateState({ selectedContextEntity })}
              availableContextOptions={state.availableContextOptions.length === 0 ? buildContextOptions() : state.availableContextOptions}
              falcon={falcon}
            />
          </SlTabPanel>
          
          <SlTabPanel name="response">
            <ResponseDisplay
              loading={state.loading}
              responseText={state.responseText}
              errorMessage={state.errorMessage}
              modelName={state.modelName}
              online={state.online}
              copyIconState={state.copyIconState}
              copyButtonText={state.copyButtonText}
              copyToClipboard={copyToClipboard}
            />
          </SlTabPanel>
        </SlTabGroup>
      </SlCard>
    </div>
  );
});

Home.displayName = 'Home';

export default Home;
