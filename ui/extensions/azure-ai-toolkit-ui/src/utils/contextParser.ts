// src/utils/contextParser.ts

/**
 * Interface for parsed entity values
 */
interface EntityValue {
  label: string;
  value: string;
}

/**
 * Interface for context options
 */
export interface ContextOption {
  label: string;
  value: string;
}

/**
 * Parse entity values from falcon context data
 * @param entities - Raw entity data from falcon context
 * @returns Array of parsed entity values
 */
const parseEntityValues = (entities: any): EntityValue[] => {
  if (!entities || typeof entities !== 'object') {
    return [];
  }

  const values: EntityValue[] = [];
  
  // Handle different entity structures
  if (Array.isArray(entities)) {
    entities.forEach(entity => {
      if (entity && typeof entity === 'object') {
        // Try common ID fields
        const id = entity.id || entity.entity_id || entity.detection_id || entity.host_id;
        const name = entity.name || entity.hostname || entity.title || id;
        
        if (id) {
          values.push({
            label: name ? `${name} (${id})` : id,
            value: id
          });
        }
      }
    });
  } else {
    // Handle object structure
    Object.entries(entities).forEach(([key, value]) => {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        const entity = value as any;
        // Only treat as entity if it has actual ID fields, not just any key
        const id = entity.id || entity.entity_id || entity.detection_id || entity.host_id;
        const name = entity.name || entity.hostname || entity.title;
        
        if (id) {
          values.push({
            label: name ? `${name} (${id})` : id,
            value: id
          });
        }
      } else if (typeof value === 'string') {
        values.push({
          label: `${key}: ${value}`,
          value: value
        });
      }
    });
  }

  return values;
};

/**
 * Format context data for display
 * @param contextData - Raw context data
 * @param contextType - Type of context (incident, detection, etc.)
 * @returns Formatted context string
 */
const formatContextData = (contextData: any, contextType: string): string => {
  if (!contextData) return '';

  try {
    const formatted = JSON.stringify(contextData, null, 2);
    return `${contextType.toUpperCase()} Context:\n${formatted}`;
  } catch {
    return `${contextType.toUpperCase()} Context: [Unable to format context data]`;
  }
};

/**
 * Extract incident context information
 * @param incident - Incident data from falcon context
 * @returns Array of context options for incident
 */
const extractIncidentContext = (incident: any): ContextOption[] => {
  if (!incident) return [];

  const options: ContextOption[] = [];

  // Basic incident info
  if (incident.id) {
    options.push({
      label: `Incident ID: ${incident.id}`,
      value: `incident_id:${incident.id}`
    });
  }

  if (incident.name || incident.title) {
    const title = incident.name || incident.title;
    options.push({
      label: `Incident: ${title}`,
      value: `incident_title:${title}`
    });
  }

  // Status and severity
  if (incident.status) {
    options.push({
      label: `Status: ${incident.status}`,
      value: `incident_status:${incident.status}`
    });
  }

  if (incident.severity || incident.priority) {
    const severity = incident.severity || incident.priority;
    options.push({
      label: `Severity: ${severity}`,
      value: `incident_severity:${severity}`
    });
  }

  // Description
  if (incident.description) {
    options.push({
      label: 'Incident Description',
      value: `incident_description:${incident.description}`
    });
  }

  // Full incident context
  options.push({
    label: 'Full Incident Context',
    value: formatContextData(incident, 'incident')
  });

  return options;
};

/**
 * Extract detection context information
 * @param detection - Detection data from falcon context
 * @returns Array of context options for detection
 */
const extractDetectionContext = (detection: any): ContextOption[] => {
  if (!detection) return [];

  const options: ContextOption[] = [];

  // Basic detection info
  if (detection.id || detection.detection_id) {
    const id = detection.id || detection.detection_id;
    options.push({
      label: `Detection ID: ${id}`,
      value: `detection_id:${id}`
    });
  }

  if (detection.name || detection.title) {
    const title = detection.name || detection.title;
    options.push({
      label: `Detection: ${title}`,
      value: `detection_title:${title}`
    });
  }

  // Severity and confidence
  if (detection.severity) {
    options.push({
      label: `Severity: ${detection.severity}`,
      value: `detection_severity:${detection.severity}`
    });
  }

  if (detection.confidence) {
    options.push({
      label: `Confidence: ${detection.confidence}`,
      value: `detection_confidence:${detection.confidence}`
    });
  }

  // Tactics and techniques
  if (detection.tactic) {
    options.push({
      label: `Tactic: ${detection.tactic}`,
      value: `detection_tactic:${detection.tactic}`
    });
  }

  if (detection.technique) {
    options.push({
      label: `Technique: ${detection.technique}`,
      value: `detection_technique:${detection.technique}`
    });
  }

  // Full detection context
  options.push({
    label: 'Full Detection Context',
    value: formatContextData(detection, 'detection')
  });

  return options;
};

/**
 * Extract host context information
 * @param host - Host data from falcon context
 * @returns Array of context options for host
 */
const extractHostContext = (host: any): ContextOption[] => {
  if (!host) return [];

  const options: ContextOption[] = [];

  // Basic host info
  if (host.id || host.host_id) {
    const id = host.id || host.host_id;
    options.push({
      label: `Host ID: ${id}`,
      value: `host_id:${id}`
    });
  }

  if (host.hostname) {
    options.push({
      label: `Hostname: ${host.hostname}`,
      value: `hostname:${host.hostname}`
    });
  }

  // System info
  if (host.os_version) {
    options.push({
      label: `OS Version: ${host.os_version}`,
      value: `os_version:${host.os_version}`
    });
  }

  if (host.platform) {
    options.push({
      label: `Platform: ${host.platform}`,
      value: `platform:${host.platform}`
    });
  }

  // Network info
  if (host.local_ip) {
    options.push({
      label: `Local IP: ${host.local_ip}`,
      value: `local_ip:${host.local_ip}`
    });
  }

  if (host.external_ip) {
    options.push({
      label: `External IP: ${host.external_ip}`,
      value: `external_ip:${host.external_ip}`
    });
  }

  // Full host context
  options.push({
    label: 'Full Host Context',
    value: formatContextData(host, 'host')
  });

  return options;
};

/**
 * Build context options from falcon data
 * Main function to extract and format context options for the UI
 * @param falconData - Falcon context data
 * @returns Array of context options for selection
 */
export const buildContextOptions = (falconData: any): ContextOption[] => {
  if (!falconData || typeof falconData !== 'object') {
    return [{ label: 'No context available', value: '' }];
  }

  const options: ContextOption[] = [];

  // Add default "no context" option
  options.push({ label: 'No additional context', value: '' });

  try {
    // Extract incident context
    if (falconData.incident) {
      const incidentOptions = extractIncidentContext(falconData.incident);
      options.push(...incidentOptions);
    }

    // Extract detection context
    if (falconData.detection) {
      const detectionOptions = extractDetectionContext(falconData.detection);
      options.push(...detectionOptions);
    }

    // Extract host context
    if (falconData.host) {
      const hostOptions = extractHostContext(falconData.host);
      options.push(...hostOptions);
    }

    // Handle generic entities
    Object.entries(falconData).forEach(([key, value]) => {
      if (!['incident', 'detection', 'host'].includes(key) && value) {
        // Try to parse as entities
        const entityValues = parseEntityValues(value);
        if (entityValues.length > 0) {
          entityValues.forEach(entity => {
            options.push({
              label: `${key}: ${entity.label}`,
              value: entity.value
            });
          });
        } else if (typeof value === 'string' || typeof value === 'number') {
          options.push({
            label: `${key}: ${value}`,
            value: String(value)
          });
        } else {
          // Full context for complex objects
          options.push({
            label: `Full ${key} Context`,
            value: formatContextData(value, key)
          });
        }
      }
    });

    // Add full context option if we have any data
    if (Object.keys(falconData).length > 0) {
      options.push({
        label: 'Full Available Context',
        value: formatContextData(falconData, 'full')
      });
    }

  } catch (error) {
    console.error('Error building context options:', error);
    options.push({ 
      label: 'Error parsing context', 
      value: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` 
    });
  }

  return options;
};

/**
 * Validate context option selection
 * @param selectedValue - Selected context value
 * @returns Validation result
 */
export const validateContextSelection = (selectedValue: string): { isValid: boolean; error?: string } => {
  // Empty selection is valid (no context)
  if (!selectedValue || selectedValue.trim() === '') {
    return { isValid: true };
  }

  // Check for reasonable length limits
  if (selectedValue.length > 50000) {
    return { 
      isValid: false, 
      error: 'Selected context is too large (max 50,000 characters)' 
    };
  }

  return { isValid: true };
};

/**
 * Extract context type from selected value
 * @param selectedValue - Selected context value
 * @returns Context type or null if not determinable
 */
export const getContextType = (selectedValue: string): string | null => {
  if (!selectedValue) return null;

  if (selectedValue.includes('incident_')) return 'incident';
  if (selectedValue.includes('detection_')) return 'detection';
  if (selectedValue.includes('host_') || selectedValue.includes('hostname:')) return 'host';
  if (selectedValue.includes('INCIDENT Context:')) return 'incident';
  if (selectedValue.includes('DETECTION Context:')) return 'detection';
  if (selectedValue.includes('HOST Context:')) return 'host';
  if (selectedValue.includes('FULL Context:')) return 'full';

  return 'generic';
};
