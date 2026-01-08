import {
  buildContextOptions,
  validateContextSelection,
  getContextType
} from '../contextParser';

describe('contextParser', () => {
  describe('buildContextOptions', () => {
    it('should return default option for null data', () => {
      const result = buildContextOptions(null);
      
      expect(result).toEqual([
        { label: 'No context available', value: '' }
      ]);
    });

    it('should return default option for undefined data', () => {
      const result = buildContextOptions(undefined);
      
      expect(result).toEqual([
        { label: 'No context available', value: '' }
      ]);
    });

    it('should return default option for non-object data', () => {
      const result = buildContextOptions('invalid');
      
      expect(result).toEqual([
        { label: 'No context available', value: '' }
      ]);
    });

    it('should handle empty object', () => {
      const result = buildContextOptions({});
      
      expect(result).toEqual([
        { label: 'No additional context', value: '' }
      ]);
    });

    it('should extract incident context correctly', () => {
      const falconData = {
        incident: {
          id: 'inc-123',
          name: 'Security Incident',
          status: 'Open',
          severity: 'High',
          description: 'Suspicious activity detected'
        }
      };

      const result = buildContextOptions(falconData);

      expect(result).toContainEqual({ label: 'No additional context', value: '' });
      expect(result).toContainEqual({ label: 'Incident ID: inc-123', value: 'incident_id:inc-123' });
      expect(result).toContainEqual({ label: 'Incident: Security Incident', value: 'incident_title:Security Incident' });
      expect(result).toContainEqual({ label: 'Status: Open', value: 'incident_status:Open' });
      expect(result).toContainEqual({ label: 'Severity: High', value: 'incident_severity:High' });
      expect(result).toContainEqual({ label: 'Incident Description', value: 'incident_description:Suspicious activity detected' });
      expect(result).toContainEqual({ label: 'Full Incident Context', value: expect.stringContaining('INCIDENT Context:') });
      expect(result).toContainEqual({ label: 'Full Available Context', value: expect.stringContaining('FULL Context:') });
    });

    it('should extract detection context correctly', () => {
      const falconData = {
        detection: {
          id: 'det-456',
          name: 'Malware Detection',
          severity: 'Critical',
          confidence: 'High',
          tactic: 'Initial Access',
          technique: 'Spearphishing'
        }
      };

      const result = buildContextOptions(falconData);

      expect(result).toContainEqual({ label: 'Detection ID: det-456', value: 'detection_id:det-456' });
      expect(result).toContainEqual({ label: 'Detection: Malware Detection', value: 'detection_title:Malware Detection' });
      expect(result).toContainEqual({ label: 'Severity: Critical', value: 'detection_severity:Critical' });
      expect(result).toContainEqual({ label: 'Confidence: High', value: 'detection_confidence:High' });
      expect(result).toContainEqual({ label: 'Tactic: Initial Access', value: 'detection_tactic:Initial Access' });
      expect(result).toContainEqual({ label: 'Technique: Spearphishing', value: 'detection_technique:Spearphishing' });
    });

    it('should extract host context correctly', () => {
      const falconData = {
        host: {
          id: 'host-789',
          hostname: 'workstation-01',
          os_version: 'Windows 10',
          platform: 'Windows',
          local_ip: '192.168.1.100',
          external_ip: '203.0.113.1'
        }
      };

      const result = buildContextOptions(falconData);

      expect(result).toContainEqual({ label: 'Host ID: host-789', value: 'host_id:host-789' });
      expect(result).toContainEqual({ label: 'Hostname: workstation-01', value: 'hostname:workstation-01' });
      expect(result).toContainEqual({ label: 'OS Version: Windows 10', value: 'os_version:Windows 10' });
      expect(result).toContainEqual({ label: 'Platform: Windows', value: 'platform:Windows' });
      expect(result).toContainEqual({ label: 'Local IP: 192.168.1.100', value: 'local_ip:192.168.1.100' });
      expect(result).toContainEqual({ label: 'External IP: 203.0.113.1', value: 'external_ip:203.0.113.1' });
    });

    it('should handle combined context data', () => {
      const falconData = {
        incident: {
          id: 'inc-123',
          name: 'Security Incident'
        },
        detection: {
          id: 'det-456',
          name: 'Malware Detection'
        },
        host: {
          id: 'host-789',
          hostname: 'workstation-01'
        }
      };

      const result = buildContextOptions(falconData);

      expect(result).toContainEqual({ label: 'Incident ID: inc-123', value: 'incident_id:inc-123' });
      expect(result).toContainEqual({ label: 'Detection ID: det-456', value: 'detection_id:det-456' });
      expect(result).toContainEqual({ label: 'Host ID: host-789', value: 'host_id:host-789' });
      expect(result).toContainEqual({ label: 'Full Available Context', value: expect.stringContaining('FULL Context:') });
    });

    it('should handle incident with title field instead of name', () => {
      const falconData = {
        incident: {
          id: 'inc-123',
          title: 'Security Alert',
          priority: 'Medium'
        }
      };

      const result = buildContextOptions(falconData);

      expect(result).toContainEqual({ label: 'Incident: Security Alert', value: 'incident_title:Security Alert' });
      expect(result).toContainEqual({ label: 'Severity: Medium', value: 'incident_severity:Medium' });
    });

    it('should handle detection with detection_id field', () => {
      const falconData = {
        detection: {
          detection_id: 'det-789',
          title: 'Suspicious Process'
        }
      };

      const result = buildContextOptions(falconData);

      expect(result).toContainEqual({ label: 'Detection ID: det-789', value: 'detection_id:det-789' });
      expect(result).toContainEqual({ label: 'Detection: Suspicious Process', value: 'detection_title:Suspicious Process' });
    });

    it('should handle host with host_id field', () => {
      const falconData = {
        host: {
          host_id: 'host-abc',
          hostname: 'server-01'
        }
      };

      const result = buildContextOptions(falconData);

      expect(result).toContainEqual({ label: 'Host ID: host-abc', value: 'host_id:host-abc' });
    });

    it('should handle generic entities with arrays', () => {
      const falconData = {
        users: [
          { id: 'user-1', name: 'John Doe' },
          { id: 'user-2', name: 'Jane Smith' }
        ]
      };

      const result = buildContextOptions(falconData);

      expect(result).toContainEqual({ label: 'users: John Doe (user-1)', value: 'user-1' });
      expect(result).toContainEqual({ label: 'users: Jane Smith (user-2)', value: 'user-2' });
    });

    it('should handle generic entities with objects', () => {
      const falconData = {
        processes: {
          proc1: { id: 'proc-123', name: 'notepad.exe' },
          proc2: { id: 'proc-456', name: 'cmd.exe' }
        }
      };

      const result = buildContextOptions(falconData);

      expect(result).toContainEqual({ label: 'processes: notepad.exe (proc-123)', value: 'proc-123' });
      expect(result).toContainEqual({ label: 'processes: cmd.exe (proc-456)', value: 'proc-456' });
    });

    it('should handle simple string values', () => {
      const falconData = {
        username: 'john.doe',
        domain: 'example.com'
      };

      const result = buildContextOptions(falconData);

      expect(result).toContainEqual({ label: 'username: john.doe', value: 'john.doe' });
      expect(result).toContainEqual({ label: 'domain: example.com', value: 'example.com' });
    });

    it('should handle number values', () => {
      const falconData = {
        port: 8080,
        count: 42
      };

      const result = buildContextOptions(falconData);

      expect(result).toContainEqual({ label: 'port: 8080', value: '8080' });
      expect(result).toContainEqual({ label: 'count: 42', value: '42' });
    });

    it('should handle complex nested objects', () => {
      const falconData = {
        network: {
          connections: [
            { src_ip: '192.168.1.1', dst_ip: '203.0.113.1' }
          ]
        }
      };

      const result = buildContextOptions(falconData);

      expect(result.some(option => 
        option.label === 'Full network Context' && 
        option.value.includes('NETWORK Context:')
      )).toBe(true);
    });

    it('should handle entities without id fields gracefully', () => {
      const falconData = {
        items: [
          { name: 'Item 1' },
          { title: 'Item 2' }
        ]
      };

      const result = buildContextOptions(falconData);

      expect(result.some(option => 
        option.label === 'Full items Context' && 
        option.value.includes('ITEMS Context:')
      )).toBe(true);
    });

    it('should handle error in JSON.stringify gracefully', () => {
      const circularObj: any = {};
      circularObj.self = circularObj;

      const falconData = {
        circular: circularObj
      };

      const result = buildContextOptions(falconData);

      // Should still return options without crashing
      expect(result).toContainEqual({ label: 'No additional context', value: '' });
    });

    it('should handle error in context building', () => {
      const falconData = {
        incident: null
      };

      // Mock console.error to suppress error output during test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = buildContextOptions(falconData);

      // Should return at least the default option
      expect(result).toContainEqual({ label: 'No additional context', value: '' });

      consoleSpy.mockRestore();
    });

    it('should handle missing fields gracefully', () => {
      const falconData = {
        incident: {},
        detection: {},
        host: {}
      };

      const result = buildContextOptions(falconData);

      // Should contain default option and full context options
      expect(result).toContainEqual({ label: 'No additional context', value: '' });
      expect(result).toContainEqual({ label: 'Full Incident Context', value: expect.stringContaining('INCIDENT Context:') });
      expect(result).toContainEqual({ label: 'Full Detection Context', value: expect.stringContaining('DETECTION Context:') });
      expect(result).toContainEqual({ label: 'Full Host Context', value: expect.stringContaining('HOST Context:') });
    });
  });

  describe('validateContextSelection', () => {
    it('should validate empty selection as valid', () => {
      const result = validateContextSelection('');
      
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should validate whitespace-only selection as valid', () => {
      const result = validateContextSelection('   \n\t   ');
      
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should validate null selection as valid', () => {
      const result = validateContextSelection(null as any);
      
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should validate undefined selection as valid', () => {
      const result = validateContextSelection(undefined as any);
      
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should validate normal selection as valid', () => {
      const result = validateContextSelection('incident_id:inc-123');
      
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should validate long but acceptable selection', () => {
      const longSelection = 'a'.repeat(10000);
      const result = validateContextSelection(longSelection);
      
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should reject selection that is too long', () => {
      const tooLongSelection = 'a'.repeat(50001);
      const result = validateContextSelection(tooLongSelection);
      
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Selected context is too large (max 50,000 characters)');
    });

    it('should validate selection at exactly the limit', () => {
      const maxSelection = 'a'.repeat(50000);
      const result = validateContextSelection(maxSelection);
      
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should handle complex JSON string selection', () => {
      const jsonSelection = JSON.stringify({
        incident: { id: 'inc-123', name: 'Test' },
        detection: { id: 'det-456', severity: 'High' }
      });
      
      const result = validateContextSelection(jsonSelection);
      
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });

  describe('getContextType', () => {
    it('should return null for empty string', () => {
      const result = getContextType('');
      
      expect(result).toBeNull();
    });

    it('should return null for null input', () => {
      const result = getContextType(null as any);
      
      expect(result).toBeNull();
    });

    it('should return null for undefined input', () => {
      const result = getContextType(undefined as any);
      
      expect(result).toBeNull();
    });

    it('should detect incident type from incident_ prefix', () => {
      const result = getContextType('incident_id:inc-123');
      
      expect(result).toBe('incident');
    });

    it('should detect detection type from detection_ prefix', () => {
      const result = getContextType('detection_severity:High');
      
      expect(result).toBe('detection');
    });

    it('should detect host type from host_ prefix', () => {
      const result = getContextType('host_id:host-123');
      
      expect(result).toBe('host');
    });

    it('should detect host type from hostname:', () => {
      const result = getContextType('hostname:workstation-01');
      
      expect(result).toBe('host');
    });

    it('should detect incident type from INCIDENT Context:', () => {
      const result = getContextType('INCIDENT Context:\n{"id": "inc-123"}');
      
      expect(result).toBe('incident');
    });

    it('should detect detection type from DETECTION Context:', () => {
      const result = getContextType('DETECTION Context:\n{"id": "det-456"}');
      
      expect(result).toBe('detection');
    });

    it('should detect host type from HOST Context:', () => {
      const result = getContextType('HOST Context:\n{"hostname": "server-01"}');
      
      expect(result).toBe('host');
    });

    it('should detect full type from FULL Context:', () => {
      const result = getContextType('FULL Context:\n{"incident": {}, "host": {}}');
      
      expect(result).toBe('full');
    });

    it('should return generic for unknown patterns', () => {
      const result = getContextType('some random value');
      
      expect(result).toBe('generic');
    });

    it('should return generic for non-matching prefixes', () => {
      const result = getContextType('user_id:user-123');
      
      expect(result).toBe('generic');
    });

    it('should handle mixed case in context headers', () => {
      const result = getContextType('Incident Context:\n{"id": "inc-123"}');
      
      expect(result).toBe('generic'); // Should be case sensitive for headers
    });

    it('should prioritize prefix detection over context headers', () => {
      const result = getContextType('incident_id:inc-123\nDETECTION Context:\n{}');
      
      expect(result).toBe('incident'); // Should match incident_ first
    });

    it('should handle whitespace around values', () => {
      const result = getContextType('  detection_tactic:Initial Access  ');
      
      expect(result).toBe('detection');
    });

    it('should handle complex formatted context', () => {
      const complexContext = `
        INCIDENT Context:
        {
          "id": "inc-123",
          "name": "Security Incident",
          "status": "Open"
        }
      `;
      
      const result = getContextType(complexContext);
      
      expect(result).toBe('incident');
    });
  });

  describe('Edge cases and error handling', () => {
    it('should handle malformed JSON in context data', () => {
      const falconData = {
        malformed: '{"incomplete": json'
      };

      const result = buildContextOptions(falconData);

      expect(result).toContainEqual({ label: 'No additional context', value: '' });
      expect(result).toContainEqual({ label: 'malformed: {"incomplete": json', value: '{"incomplete": json' });
    });

    it('should handle extremely nested objects', () => {
      const deepObj = { level1: { level2: { level3: { level4: { value: 'deep' } } } } };
      const falconData = {
        deep: deepObj
      };

      const result = buildContextOptions(falconData);

      expect(result.some(option => 
        option.label === 'Full deep Context' && 
        option.value.includes('DEEP Context:')
      )).toBe(true);
    });

    it('should handle boolean values in falcon data', () => {
      const falconData = {
        isActive: true,
        isDeleted: false
      };

      const result = buildContextOptions(falconData);

      expect(result.some(option => 
        option.label === 'Full isActive Context' && 
        option.value.includes('ISACTIVE Context:')
      )).toBe(true);
    });

    it('should handle array of strings as entities', () => {
      const falconData = {
        ips: ['192.168.1.1', '192.168.1.2', '192.168.1.3']
      };

      const result = buildContextOptions(falconData);

      expect(result.some(option => 
        option.label === 'Full ips Context' && 
        option.value.includes('IPS Context:')
      )).toBe(true);
    });

    it('should handle mixed array with objects and primitives', () => {
      const falconData = {
        mixed: [
          { id: 'obj-1', name: 'Object 1' },
          'string-value',
          123,
          { entity_id: 'obj-2', title: 'Object 2' }
        ]
      };

      const result = buildContextOptions(falconData);

      expect(result).toContainEqual({ label: 'mixed: Object 1 (obj-1)', value: 'obj-1' });
      expect(result).toContainEqual({ label: 'mixed: Object 2 (obj-2)', value: 'obj-2' });
    });
  });
});
