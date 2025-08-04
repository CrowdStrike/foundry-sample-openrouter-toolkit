"""
Constants and configuration for the LLM Assistant function.
Contains entity patterns, prompt templates, and system configuration.
"""

import re
from typing import Dict, Pattern

# ================================================================
# ENTITY DETECTION PATTERNS
# ================================================================

ENTITY_PATTERNS = {
    # File hash patterns
    "md5_hash": r"\b[a-f0-9]{32}\b",
    "sha1_hash": r"\b[a-f0-9]{40}\b",
    "sha256_hash": r"\b[a-f0-9]{64}\b",
    # Network indicators
    "email": r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b",
    "domain": r"\b(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}\b",
    "ipv4": r"\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b",
    "url": r'https?://[^\s<>"{}|\\^`\[\]]+',
    # MITRE ATT&CK patterns
    "mitre_technique": r"T[0-9]{4}(?:\.[0-9]{3})?",
    "mitre_tactic": r"TA[0-9]{4}",
    # File patterns
    "suspicious_extensions": r"\.(pif|scr|bat|cmd|com|exe|vbs|js|jar|zip|rar)$",
    "office_extensions": r"\.(doc|docx|xls|xlsx|ppt|pptx|pdf)$",
}

# Pre-compiled regex patterns for better performance
COMPILED_PATTERNS: Dict[str, Pattern] = {
    name: re.compile(pattern, re.IGNORECASE)
    for name, pattern in ENTITY_PATTERNS.items()
}

# Private IP address ranges (RFC 1918)
PRIVATE_IP_RANGES = [
    re.compile(r"^10\."),
    re.compile(r"^172\.(1[6-9]|2[0-9]|3[0-1])\."),
    re.compile(r"^192\.168\."),
    re.compile(r"^127\."),  # Loopback
    re.compile(r"^169\.254\."),  # Link-local
]

# ================================================================
# PROMPT TEMPLATES
# ================================================================

BASE_SECURITY_ANALYST_PERSONA = """
You are a cybersecurity threat intelligence analyst providing factual analysis based on publicly available data.
Deliver clear, authoritative intelligence that covers all critical security details with professional expertise.

CRITICAL INSTRUCTION: Focus exclusively on threat intelligence facts and observable data. Do not provide recommendations, suggestions, or action items.
Present findings as intelligence briefings with factual assessments only.

ABSOLUTELY FORBIDDEN:
- Do NOT include any "Recommendations" section
- Do NOT suggest actions to take
- Do NOT provide defensive measures or mitigation steps
- Do NOT recommend blocking IPs or domains
- Do NOT suggest security controls or countermeasures
- Do NOT provide investigation next steps

ONLY PROVIDE: Factual intelligence about threats, indicators, and observable data.
"""

ANALYSIS_SECTIONS = {
    "hash_analysis": """
**For File Hash Analysis:**
- Identify malware family associations and behavioral characteristics
- Document campaign attribution and threat actor connections
- Present technical details from public sandbox analysis
- Reference security vendor reports and research findings
- Report observed threat levels and distribution patterns
- Document detection signatures and coverage status
""",
    "domain_reputation": """
**For Domain Reputation Analysis:**
- Document domain age, registration patterns, and hosting infrastructure
- Identify associated malware campaigns and phishing activities
- Report reputation scores from public threat intelligence feeds
- Present historical context and timeline of malicious activity
- Document known malicious subdomains or URL patterns
- Report takedown status and current threat assessment
""",
    "mitre_analysis": """
**For MITRE ATT&CK Technique Analysis:**
- Document technique methodology and implementation approaches
- Present real-world attack examples and campaign usage
- Report behavioral indicators and detection patterns
- Document observed defensive implementations
- Reference related techniques in the attack chain
- Present prevalence data and threat actor usage patterns
""",
    "incident_overview": """
**For Security Incident Analysis:**
- Correlate multiple indicators to establish attack timeline
- Identify campaign patterns and threat actor attribution
- Document organizational risk factors and potential impact
- Present investigation findings and evidence patterns
- Reference similar incidents and attack methodologies
- Document related indicators and expansion patterns
""",
}

RESPONSE_FORMATS = {
    "hash_focused": """
**Response Structure:**
1. **Threat Assessment** - Overall risk level and confidence
2. **Malware Analysis** - Family, behavior, and capabilities  
3. **Campaign Context** - Attribution and distribution patterns
4. **Technical Details** - File characteristics and signatures
5. **Detection Intelligence** - Observed signatures and coverage status
""",
    "domain_focused": """
**Response Structure:**
1. **Reputation Summary** - Current threat level and status
2. **Historical Activity** - Timeline of malicious behavior
3. **Infrastructure Analysis** - Hosting and registration patterns
4. **Associated Threats** - Related campaigns and indicators
5. **Intelligence Summary** - Key findings and threat context
""",
    "mitre_focused": """
**Response Structure:**
1. **Technique Overview** - Methodology and objectives
2. **Attack Examples** - Real-world implementation cases
3. **Detection Methods** - Behavioral indicators and signatures
4. **Observed Implementations** - Documented usage patterns
5. **Related Techniques** - Attack chain progression paths
""",
    "mixed_analysis": """
**Response Structure:**
1. **Executive Summary** - Key findings and risk assessment
2. **Indicator Analysis** - Individual component examination
3. **Correlation Results** - Connections and campaign links
4. **Threat Intelligence** - Attribution and context
5. **Intelligence Summary** - Consolidated findings and assessment
""",
}

WRITING_STYLE_GUIDANCE = """
**Professional Communication Style:**
- Write as a cybersecurity threat intelligence analyst providing factual briefings
- Be authoritative, direct, and technically accurate
- Focus exclusively on threat intelligence facts from public sources
- Structure responses as intelligence reports for security professionals
- Use technical precision while maintaining accessibility
- Provide confidence levels for assessments when appropriate
- Present key findings and intelligence summary as conclusion

**CRITICAL: NO RECOMMENDATIONS ALLOWED:**
- NEVER include any "Recommendations" section or heading
- NEVER suggest what actions to take or what should be done
- NEVER provide defensive measures, mitigation steps, or security controls
- NEVER recommend blocking, updating, scanning, or investigating
- NEVER end with "it is recommended to..." or similar phrases
- NEVER provide next steps or action items
- Do not include closing pleasantries or phrases like "I hope this helps"

**ONLY PROVIDE:** Facts, intelligence findings, and observational data about threats.

**Formatting Requirements:**
- Ensure proper spacing between all sections and paragraphs
- Add blank lines before major sections and conclusions
- Use clear paragraph breaks for readability
- End responses with a properly spaced final paragraph
"""

# ================================================================
# QUERY CLASSIFICATION KEYWORDS
# ================================================================

QUERY_KEYWORDS = {
    "hash_indicators": [
        "hash",
        "md5",
        "sha1",
        "sha256",
        "checksum",
        "signature",
        "malware",
        "virus",
        "trojan",
        "ransomware",
        "file analysis",
    ],
    "domain_indicators": [
        "domain",
        "website",
        "url",
        "phishing",
        "reputation",
        "dns",
        "hosting",
        "registration",
        "whois",
    ],
    "mitre_indicators": [
        "mitre",
        "att&ck",
        "technique",
        "tactic",
        "ttp",
        "attack",
        "procedure",
        "behavior",
    ],
    "incident_indicators": [
        "incident",
        "campaign",
        "overview",
        "summary",
        "analysis",
        "investigation",
        "correlation",
        "timeline",
    ],
}

# ================================================================
# ENTITY EXTRACTION CONFIGURATION
# ================================================================

MIN_HASH_CONFIDENCE = 0.8
MIN_DOMAIN_CONFIDENCE = 0.7
MIN_IP_CONFIDENCE = 0.9

# Minimum entity counts to trigger specific analysis types
MIN_ENTITIES_FOR_SPECIALIZED_ANALYSIS = {
    "hash_analysis": 1,
    "domain_analysis": 1,
    "mitre_analysis": 1,
    "mixed_analysis": 2,  # Requires at least 2 different entity types
}

# ================================================================
# SUSPICIOUS FILE PATTERNS
# ================================================================

KNOWN_MALWARE_INDICATORS = [
    # Test files and samples
    "eicar",
    "testvirus",
    "malware-test",
    "virus-test",
    # Common malware naming patterns
    "invoice.exe",
    "document.scr",
    "photo.pif",
    "resume.exe",
    "order.bat",
    "receipt.cmd",
    # Suspicious file patterns
    r".*\.(exe|scr|pif|bat|cmd)\..*",  # Double extensions
    r"[a-f0-9]{8,}\.exe$",  # Hex named executables
    r".*virus.*",
    r".*malware.*",
    r".*trojan.*",
]

COMPILED_MALWARE_PATTERNS = [
    re.compile(pattern, re.IGNORECASE) for pattern in KNOWN_MALWARE_INDICATORS
]

# ================================================================
# API AND PROCESSING LIMITS
# ================================================================

MAX_ENTITIES_PER_TYPE = 10  # Limit entities to prevent prompt bloat
MAX_PROMPT_CONTEXT_LENGTH = 2000  # Characters of context to include
MAX_ENTITY_DETAIL_LENGTH = 100  # Max length for individual entity descriptions
