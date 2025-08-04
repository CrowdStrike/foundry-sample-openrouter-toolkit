# OpenRouter Toolkit

A CrowdStrike Foundry extension that provides seamless integration with OpenRouter's API, enabling access to multiple Large Language Model providers through a unified interface within the CrowdStrike security platform.

## Overview

The OpenRouter Toolkit brings the power of various AI models directly into your CrowdStrike workflow, allowing security professionals to leverage advanced language models for threat analysis, indicator investigation, and general security research without leaving the platform.

**Key Benefits:**
- **Multi-Model Access**: Choose from OpenAI, Anthropic, Meta, Google, and other leading AI providers
- **Foundry Integration**: Embedded directly in the CrowdStrike NGSIEM workbench
- **Context Awareness**: Automatically incorporates incident data for enhanced analysis
- **Flexible Configuration**: Customizable model selection, temperature, and provider preferences

## Features

### 🎯 **Intelligent Model Selection**
- **OpenAI Models**: GPT-4, GPT-3.5 Turbo, and variants for robust analysis
- **Anthropic Claude**: Advanced reasoning capabilities for complex scenarios  
- **Open Source Options**: Llama, Mistral, and other community models
- **Provider Optimization**: Choose based on speed, cost, or latency priorities

### 🔍 **Advanced Query Capabilities**
- **Context-Aware Analysis**: Automatically incorporates CrowdStrike incident data
- **Online Search Integration**: Web-enabled research for current threat intelligence
- **Flexible Temperature Control**: Adjust response creativity from focused (0.1) to creative (1.0)
- **Smart Caching**: Reduces API calls and improves response times

### 🛡️ **Security-Focused Design**
- **Incident Integration**: Seamless access to CrowdStrike incident context
- **Entity Extraction**: Automatic detection of IPs, domains, hashes, and other indicators
- **Secure Processing**: Enterprise-grade security with proper access controls
- **Audit Trail**: Complete request tracking and logging

### ⚡ **User Experience**
- **Intuitive Interface**: Clean, responsive design optimized for security workflows
- **Real-Time Feedback**: Progress indicators and detailed execution metrics
- **Error Handling**: Robust error management with clear user messaging
- **Responsive Design**: Works seamlessly across different screen sizes

## Getting Started

### Prerequisites
- CrowdStrike Falcon platform access
- NGSIEM workbench permissions
- OpenRouter Toolkit installed by platform administrator

### Basic Usage

1. **Access the Toolkit**: Navigate to an incident in the NGSIEM workbench and locate the OpenRouter Toolkit in the details panel

2. **Select Context** (Optional): Choose from automatically detected incident entities like domains, IPs, or file hashes for context-aware analysis

3. **Enter Your Query**: Type your question or analysis request in the query field

4. **Configure Settings**:
   - **Model**: Select your preferred AI model based on task requirements
   - **Temperature**: Adjust response creativity (0.1 for focused, 0.7+ for creative)
   - **Online Search**: Enable web search for current threat intelligence
   - **Provider Priority**: Optimize for throughput, price, or latency

5. **Submit and Review**: Click Submit and review the AI-generated analysis

### Example Workflows

#### **Indicator Analysis**
```
Context: IP address 192.168.1.100 from incident
Query: "Analyze this IP address for potential threats"
Result: Context-aware analysis incorporating incident details
```

#### **Threat Research**
```
Query: "Explain the MITRE ATT&CK technique T1055 (Process Injection)"
Online Search: Enabled
Result: Current threat intelligence and detection methods
```

#### **Custom Analysis**
```
Query: "Compare these two malware families and their TTPs"
Temperature: 0.7 (for comprehensive comparison)
Result: Detailed comparative analysis
```

## Configuration Options

### **Model Selection**
- **OpenAI GPT-4**: Best for complex reasoning and comprehensive analysis
- **OpenAI GPT-3.5**: Balanced performance for most use cases
- **Anthropic Claude**: Strong analytical capabilities and nuanced responses
- **Open Source Models**: Cost-effective options for basic queries

### **Advanced Settings**
- **Temperature Control**: Fine-tune response creativity and focus
- **Provider Sorting**: Optimize API calls based on your priorities
- **Online Search**: Enable real-time web research capabilities
- **Context Integration**: Leverage CrowdStrike incident data automatically

### **User Preferences**
Users can configure default settings including preferred models, temperature ranges, and analysis approaches to streamline their workflow.

## Integration Details

### **CrowdStrike Platform Integration**
- **NGSIEM Workbench**: Embedded in incident details panel
- **Context Access**: Automatic extraction of incident entities and metadata
- **Workflow Compatible**: Integrates with CrowdStrike Fusion SOAR workflows
- **Role-Based Access**: Respects existing CrowdStrike permission structures

### **OpenRouter API Integration**
- **Multi-Provider Access**: Single API for multiple AI model providers
- **Optimized Routing**: Automatic provider selection based on preferences
- **Rate Limiting**: Intelligent request management and retry logic
- **Cost Management**: Transparent usage tracking and optimization

## Security & Privacy

### **Data Handling**
- **No Persistent Storage**: Analysis requests are not retained long-term
- **Secure Transmission**: All data encrypted in transit to OpenRouter
- **Access Controls**: Integrated with CrowdStrike role-based permissions
- **Audit Logging**: Complete request and response tracking

### **Privacy Considerations**
- **Context Isolation**: Each analysis session is isolated and secure
- **Configurable Sharing**: Control what incident data is included in analysis
- **Compliance Ready**: Designed for enterprise security requirements

## Troubleshooting

### **Common Issues**

#### **No Response from Model**
- **Check Model Availability**: Try selecting a different model
- **Verify Connectivity**: Ensure OpenRouter API access is available
- **Review Query Length**: Very long queries may timeout

#### **Context Not Available**
- **Incident Data**: Ensure you're working within an active incident
- **Entity Detection**: Verify incident contains recognizable indicators
- **Permissions**: Confirm access to incident details

#### **Performance Issues**
- **Model Selection**: Larger models may have longer response times
- **Online Search**: Web-enabled queries take additional time
- **Provider Load**: Try different provider priority settings

### **Getting Help**
- **Debug Information**: Use the Advanced Options panel to access detailed request/response data
- **Request Tracking**: Each request includes a unique ID for troubleshooting
- **Platform Support**: Contact your CrowdStrike administrator for installation or configuration issues

## Technical Architecture

### **Components**
- **Frontend Extension**: React-based UI with TypeScript
- **Backend Function**: Python-based API integration service
- **Workflow Integration**: YAML-based workflow definitions
- **API Gateway**: Secure connection to OpenRouter services

### **Data Flow**
1. **User Input**: Query and configuration entered through UI
2. **Context Enrichment**: Automatic incorporation of incident data (if available)
3. **API Processing**: Secure transmission to OpenRouter with selected model
4. **Response Handling**: Processing and display of AI-generated content
5. **Audit Logging**: Complete request/response tracking for security

## API Reference

### **Function Endpoint**
- **Path**: `/openrouter-toolkit-chat-completion`
- **Method**: `POST`
- **Authentication**: CrowdStrike platform authentication

### **Key Parameters**
- `user_prompt_input`: The query or question to analyze
- `model_name_input`: Selected AI model identifier
- `temperature_input`: Response creativity control (0.0-1.0)
- `online_input`: Enable web search capabilities
- `provider_sort_input`: Provider optimization preference
- `context_data_input`: Incident context data (auto-populated)

## Support

This extension is developed and maintained by CrowdStrike for use within the Foundry platform. For technical support:

- **Installation Issues**: Contact your CrowdStrike platform administrator
- **Usage Questions**: Refer to this documentation or your internal security team
- **Feature Requests**: Submit through your organization's CrowdStrike support channels

---

**OpenRouter Toolkit v1.0** - Bringing the power of multiple AI providers to CrowdStrike security workflows.
