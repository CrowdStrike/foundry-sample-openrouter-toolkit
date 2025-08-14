"""
Query classifier for determining analysis approach based on query content and context entities.
Supports intelligent classification for context-aware prompt generation.
"""

from typing import Dict, List, Optional
from dataclasses import dataclass
from enum import Enum

from constants import (
    COMPILED_PATTERNS,
    MIN_ENTITIES_FOR_SPECIALIZED_ANALYSIS,
)
from context_analyzer import OSINTEntities


class QueryType(Enum):
    """Enumeration of supported query analysis types."""

    HASH_ANALYSIS = "hash_analysis"
    DOMAIN_REPUTATION = "domain_reputation"
    MITRE_TECHNIQUE = "mitre_technique"
    INCIDENT_OVERVIEW = "incident_overview"
    MIXED_ANALYSIS = "mixed_analysis"
    GENERAL_SECURITY = "general_security"


class ComplexityLevel(Enum):
    """Query complexity levels for response formatting."""

    LOW = "low"  # Single entity, straightforward analysis
    MEDIUM = "medium"  # Multiple entities of same type
    HIGH = "high"  # Mixed entity types, complex correlation


@dataclass
class EntityAnalysis:
    """Entity analysis results."""
    focus: Dict[str, bool]
    available: Dict[str, int]


@dataclass
class ResponseGuidance:
    """Response formatting guidance."""
    complexity: ComplexityLevel
    format: str
    confidence: float


@dataclass
class AnalysisMetadata:
    """Analysis metadata and indicators."""
    query_indicators: Dict[str, bool]
    context_indicators: Dict[str, bool]
    specialized_analysis: bool


@dataclass
class QueryClassification:
    """Result of query analysis with classification details."""

    # Primary classification
    primary_type: QueryType
    secondary_types: List[QueryType]

    # Consolidated analysis data
    entity_analysis: EntityAnalysis
    response_guidance: ResponseGuidance
    metadata: AnalysisMetadata

    # Legacy properties for backward compatibility
    @property
    def entity_focus(self) -> Dict[str, bool]:
        """Return entity focus dictionary for backward compatibility."""
        return self.entity_analysis.focus

    @property
    def available_entities(self) -> Dict[str, int]:
        """Return available entities dictionary for backward compatibility."""
        return self.entity_analysis.available

    @property
    def complexity(self) -> ComplexityLevel:
        """Return complexity level for backward compatibility."""
        return self.response_guidance.complexity

    @property
    def response_format(self) -> str:
        """Return response format for backward compatibility."""
        return self.response_guidance.format

    @property
    def confidence(self) -> float:
        """Return confidence score for backward compatibility."""
        return self.response_guidance.confidence

    @property
    def query_indicators(self) -> Dict[str, bool]:
        """Return query indicators for backward compatibility."""
        return self.metadata.query_indicators

    @property
    def context_indicators(self) -> Dict[str, bool]:
        """Return context indicators for backward compatibility."""
        return self.metadata.context_indicators

    @property
    def specialized_analysis(self) -> bool:
        """Return specialized analysis flag for backward compatibility."""
        return self.metadata.specialized_analysis


class QueryClassifier:
    """Analyze queries and context to determine optimal analysis approach."""

    def __init__(self):
        self.logger = None

    def classify_query(
        self, user_query: str, entities: OSINTEntities, logger=None
    ) -> QueryClassification:
        """
        Classify a user query based on content and available context entities.

        Args:
            user_query: The user's query text
            entities: Extracted OSINT entities from context
            logger: Optional logger instance

        Returns:
            QueryClassification with analysis approach details
        """
        self.logger = logger

        # Analyze query text for indicators
        query_indicators = self._analyze_query_text(user_query)

        # Analyze available context entities
        context_indicators = self._analyze_context_entities(entities)

        # Determine primary analysis type
        primary_type = self._determine_primary_type(
            query_indicators, context_indicators, entities
        )

        # Identify secondary analysis types
        secondary_types = self._identify_secondary_types(
            primary_type, context_indicators
        )

        # Assess complexity
        complexity = self._assess_complexity(entities, primary_type, secondary_types)

        # Determine response format
        response_format = self._determine_response_format(primary_type, complexity)

        # Calculate confidence score
        confidence = self._calculate_confidence(
            query_indicators, context_indicators, entities
        )

        # Create classification result
        classification = QueryClassification(
            primary_type=primary_type,
            secondary_types=secondary_types,
            entity_analysis=EntityAnalysis(
                focus=context_indicators,
                available=self._count_available_entities(entities)
            ),
            response_guidance=ResponseGuidance(
                complexity=complexity,
                format=response_format,
                confidence=confidence
            ),
            metadata=AnalysisMetadata(
                query_indicators=query_indicators,
                context_indicators=context_indicators,
                specialized_analysis=self._requires_specialized_analysis(primary_type, entities)
            )
        )
        # Log classification results
        if self.logger:
            self._log_classification_results(classification, user_query)

        return classification

    def get_supported_query_types(self) -> List[str]:
        """Return list of supported query types."""
        return [query_type.value for query_type in QueryType]

    def _analyze_query_text(self, query: str) -> Dict[str, bool]:
        """Analyze query text for analysis type indicators."""
        query_lower = query.lower()
        indicators = self._initialize_indicators()

        # Check various types of indicators
        self._check_hash_indicators(query, query_lower, indicators)
        self._check_domain_indicators(query, query_lower, indicators)
        self._check_ip_indicators(query, query_lower, indicators)
        self._check_mitre_indicators(query, query_lower, indicators)
        self._check_request_indicators(query_lower, indicators)
        self._check_malware_indicators(query_lower, indicators)

        return indicators

    def _initialize_indicators(self) -> Dict[str, bool]:
        """Initialize the indicators dictionary."""
        return {
            "mentions_hash": False,
            "mentions_domain": False,
            "mentions_mitre": False,
            "mentions_ip": False,
            "requests_overview": False,
            "requests_analysis": False,
            "mentions_malware": False,
            "mentions_campaign": False,
            "requests_reputation": False,
            "requests_correlation": False,
        }

    def _check_hash_indicators(
        self, query: str, query_lower: str, indicators: Dict[str, bool]
    ) -> None:
        """Check for hash-related indicators in the query."""
        hash_patterns = [
            COMPILED_PATTERNS["md5_hash"],
            COMPILED_PATTERNS["sha256_hash"],
            COMPILED_PATTERNS["sha1_hash"],
        ]

        for pattern in hash_patterns:
            if pattern.search(query):
                indicators["mentions_hash"] = True
                break

        # Check for hash-related keywords
        if not indicators["mentions_hash"]:
            hash_keywords = ["hash", "md5", "sha256", "sha1", "checksum", "signature"]
            indicators["mentions_hash"] = any(
                keyword in query_lower for keyword in hash_keywords
            )

    def _check_domain_indicators(
        self, query: str, query_lower: str, indicators: Dict[str, bool]
    ) -> None:
        """Check for domain-related indicators in the query."""
        if COMPILED_PATTERNS["domain"].search(query) or "@" in query:
            indicators["mentions_domain"] = True
        else:
            domain_keywords = ["domain", "website", "url", "dns", "phishing"]
            indicators["mentions_domain"] = any(
                keyword in query_lower for keyword in domain_keywords
            )

    def _check_ip_indicators(
        self, query: str, query_lower: str, indicators: Dict[str, bool]
    ) -> None:
        """Check for IP address indicators in the query."""
        if COMPILED_PATTERNS["ipv4"].search(query):
            indicators["mentions_ip"] = True
        else:
            ip_keywords = ["ip", "address", "network"]
            indicators["mentions_ip"] = any(
                keyword in query_lower for keyword in ip_keywords
            )

    def _check_mitre_indicators(
        self, query: str, query_lower: str, indicators: Dict[str, bool]
    ) -> None:
        """Check for MITRE ATT&CK indicators in the query."""
        if COMPILED_PATTERNS["mitre_technique"].search(query):
            indicators["mentions_mitre"] = True
        else:
            mitre_keywords = ["mitre", "att&ck", "technique", "tactic", "ttp"]
            indicators["mentions_mitre"] = any(
                keyword in query_lower for keyword in mitre_keywords
            )

    def _check_request_indicators(
        self, query_lower: str, indicators: Dict[str, bool]
    ) -> None:
        """Check for request type indicators in the query."""
        # Check for overview/summary requests
        overview_keywords = ["overview", "summary", "incident", "what happened", "explain"]
        indicators["requests_overview"] = any(
            keyword in query_lower for keyword in overview_keywords
        )

        # Check for analysis requests
        analysis_keywords = ["analyze", "analysis", "investigate", "examine", "assess"]
        indicators["requests_analysis"] = any(
            keyword in query_lower for keyword in analysis_keywords
        )

        # Check for reputation requests
        reputation_keywords = ["reputation", "safe", "malicious", "blacklist", "whitelist"]
        indicators["requests_reputation"] = any(
            keyword in query_lower for keyword in reputation_keywords
        )

        # Check for correlation requests
        correlation_keywords = ["correlate", "relate", "connect", "link", "associated"]
        indicators["requests_correlation"] = any(
            keyword in query_lower for keyword in correlation_keywords
        )

    def _check_malware_indicators(
        self, query_lower: str, indicators: Dict[str, bool]
    ) -> None:
        """Check for malware and campaign indicators in the query."""
        # Check for malware mentions
        malware_keywords = ["malware", "virus", "trojan", "ransomware", "backdoor"]
        indicators["mentions_malware"] = any(
            keyword in query_lower for keyword in malware_keywords
        )

        # Check for campaign mentions
        campaign_keywords = ["campaign", "attribution", "threat actor", "apt"]
        indicators["mentions_campaign"] = any(
            keyword in query_lower for keyword in campaign_keywords
        )

    def _analyze_context_entities(self, entities: OSINTEntities) -> Dict[str, bool]:
        """Analyze available context entities to determine focus areas."""

        return {
            "has_hashes": any(
                len(hashes) > 0 for hashes in entities.file_hashes.values()
            ),
            "has_domains": len(entities.email_domains) > 0,
            "has_public_ips": len(entities.public_ips) > 0,
            "has_mitre": len(entities.mitre_techniques) > 0
            or len(entities.mitre_tactics) > 0,
            "has_suspicious_files": len(entities.suspicious_files) > 0,
            "has_multiple_types": self._count_entity_types(entities) > 1,
            "has_high_confidence": entities.confidence_score > 0.7,
            "has_rich_context": entities.entity_counts.get("total_entities", 0) > 3,
        }

    def _check_direct_entity_mentions(
        self, query_indicators: Dict[str, bool], context_indicators: Dict[str, bool]
    ) -> Optional[QueryType]:
        """Check for direct entity mentions in query."""
        if query_indicators["mentions_hash"] and context_indicators["has_hashes"]:
            return QueryType.HASH_ANALYSIS
        if query_indicators["mentions_domain"] and context_indicators["has_domains"]:
            return QueryType.DOMAIN_REPUTATION
        if query_indicators["mentions_mitre"] and context_indicators["has_mitre"]:
            return QueryType.MITRE_TECHNIQUE
        return None

    def _check_overview_requests(
        self, query_indicators: Dict[str, bool], context_indicators: Dict[str, bool]
    ) -> Optional[QueryType]:
        """Check for overview/correlation requests with rich context."""
        if (
            query_indicators["requests_overview"]
            or query_indicators["requests_correlation"]
        ) and context_indicators["has_rich_context"]:
            return QueryType.INCIDENT_OVERVIEW
        return None

    def _determine_by_context_strength(
        self, context_indicators: Dict[str, bool], entities: OSINTEntities
    ) -> Optional[QueryType]:
        """Determine analysis type based on context strength."""
        if (
            context_indicators["has_multiple_types"]
            and context_indicators["has_rich_context"]
        ):
            return QueryType.MIXED_ANALYSIS

        # Single entity type analysis
        if (
            context_indicators["has_hashes"]
            and entities.entity_counts.get("total_hashes", 0)
            >= MIN_ENTITIES_FOR_SPECIALIZED_ANALYSIS["hash_analysis"]
        ):
            return QueryType.HASH_ANALYSIS

        if (
            context_indicators["has_domains"]
            and len(entities.email_domains)
            >= MIN_ENTITIES_FOR_SPECIALIZED_ANALYSIS["domain_analysis"]
        ):
            return QueryType.DOMAIN_REPUTATION

        if (
            context_indicators["has_mitre"]
            and (len(entities.mitre_techniques) + len(entities.mitre_tactics))
            >= MIN_ENTITIES_FOR_SPECIALIZED_ANALYSIS["mitre_analysis"]
        ):
            return QueryType.MITRE_TECHNIQUE

        return None

    def _determine_primary_type(
        self,
        query_indicators: Dict[str, bool],
        context_indicators: Dict[str, bool],
        entities: OSINTEntities,
    ) -> QueryType:
        """Determine the primary analysis type based on query and context."""
        # Priority order: Direct mentions > Context availability > General analysis

        # 1. Check for direct entity mentions in query
        result = self._check_direct_entity_mentions(query_indicators, context_indicators)
        if result:
            return result

        # 2. Check for overview/correlation requests with rich context
        result = self._check_overview_requests(query_indicators, context_indicators)
        if result:
            return result

        # 3. Determine based on context strength
        result = self._determine_by_context_strength(context_indicators, entities)
        if result:
            return result

        # 4. Default to general security analysis
        return QueryType.GENERAL_SECURITY

    def _identify_secondary_types(
        self, primary_type: QueryType, context_indicators: Dict[str, bool]
    ) -> List[QueryType]:
        """Identify secondary analysis types that should be included."""

        secondary_types = []

        # Don't add secondary types for general security queries
        if primary_type == QueryType.GENERAL_SECURITY:
            return secondary_types

        # Add complementary analysis types based on available context
        if primary_type != QueryType.HASH_ANALYSIS and context_indicators["has_hashes"]:
            secondary_types.append(QueryType.HASH_ANALYSIS)

        if (
            primary_type != QueryType.DOMAIN_REPUTATION
            and context_indicators["has_domains"]
        ):
            secondary_types.append(QueryType.DOMAIN_REPUTATION)

        if (
            primary_type != QueryType.MITRE_TECHNIQUE
            and context_indicators["has_mitre"]
        ):
            secondary_types.append(QueryType.MITRE_TECHNIQUE)

        # Limit to most relevant secondary types
        return secondary_types[:2]

    def _assess_complexity(
        self,
        entities: OSINTEntities,
        _primary_type: QueryType,
        secondary_types: List[QueryType],
    ) -> ComplexityLevel:
        """Assess the complexity level of the analysis required."""

        total_entities = entities.entity_counts.get("total_entities", 0)
        entity_types = self._count_entity_types(entities)

        # High complexity: Multiple entity types or many entities
        if entity_types >= 3 or total_entities >= 8 or len(secondary_types) >= 2:
            return ComplexityLevel.HIGH

        # Medium complexity: Multiple entities of same type or some variety
        if entity_types == 2 or total_entities >= 4 or len(secondary_types) == 1:
            return ComplexityLevel.MEDIUM

        # Low complexity: Single entity type with few entities
        return ComplexityLevel.LOW

    def _determine_response_format(
        self, primary_type: QueryType, _complexity: ComplexityLevel
    ) -> str:
        """Determine the appropriate response format based on analysis type and complexity."""

        if primary_type == QueryType.HASH_ANALYSIS:
            return "hash_focused"
        if primary_type == QueryType.DOMAIN_REPUTATION:
            return "domain_focused"
        if primary_type == QueryType.MITRE_TECHNIQUE:
            return "mitre_focused"
        if primary_type in [QueryType.INCIDENT_OVERVIEW, QueryType.MIXED_ANALYSIS]:
            return "mixed_analysis"
        return "general_analysis"

    def _calculate_confidence(
        self,
        query_indicators: Dict[str, bool],
        context_indicators: Dict[str, bool],
        entities: OSINTEntities,
    ) -> float:
        """Calculate confidence score for the classification."""

        confidence = 0.0

        # Query-context alignment (40%)
        alignment_score = 0.0
        alignment_checks = 0

        if query_indicators["mentions_hash"]:
            alignment_checks += 1
            if context_indicators["has_hashes"]:
                alignment_score += 1

        if query_indicators["mentions_domain"]:
            alignment_checks += 1
            if context_indicators["has_domains"]:
                alignment_score += 1

        if query_indicators["mentions_mitre"]:
            alignment_checks += 1
            if context_indicators["has_mitre"]:
                alignment_score += 1

        if alignment_checks > 0:
            confidence += (alignment_score / alignment_checks) * 0.4
        else:
            confidence += 0.2  # Base confidence when no specific mentions

        # Context richness (30%)
        context_score = min(entities.entity_counts.get("total_entities", 0) / 10.0, 1.0)
        confidence += context_score * 0.3

        # Entity confidence from analyzer (30%)
        confidence += entities.confidence_score * 0.3

        return min(confidence, 1.0)

    def _count_entity_types(self, entities: OSINTEntities) -> int:
        """Count the number of different entity types available."""

        types = 0

        if any(len(hashes) > 0 for hashes in entities.file_hashes.values()):
            types += 1
        if len(entities.email_domains) > 0:
            types += 1
        if len(entities.public_ips) > 0:
            types += 1
        if len(entities.mitre_techniques) > 0 or len(entities.mitre_tactics) > 0:
            types += 1
        if len(entities.suspicious_files) > 0:
            types += 1

        return types

    def _count_available_entities(self, entities: OSINTEntities) -> Dict[str, int]:
        """Count available entities by type for classification metadata."""

        return {
            "hashes": sum(len(hashes) for hashes in entities.file_hashes.values()),
            "domains": len(entities.email_domains),
            "ips": len(entities.public_ips),
            "mitre_techniques": len(entities.mitre_techniques),
            "mitre_tactics": len(entities.mitre_tactics),
            "suspicious_files": len(entities.suspicious_files),
        }

    def _requires_specialized_analysis(
        self, primary_type: QueryType, entities: OSINTEntities
    ) -> bool:
        """Determine if specialized analysis prompting is required."""

        if primary_type == QueryType.GENERAL_SECURITY:
            return False

        # Check if we have enough entities for specialized analysis
        if primary_type == QueryType.HASH_ANALYSIS:
            return (
                sum(len(hashes) for hashes in entities.file_hashes.values())
                >= MIN_ENTITIES_FOR_SPECIALIZED_ANALYSIS["hash_analysis"]
            )

        if primary_type == QueryType.DOMAIN_REPUTATION:
            return (
                len(entities.email_domains)
                >= MIN_ENTITIES_FOR_SPECIALIZED_ANALYSIS["domain_analysis"]
            )

        if primary_type == QueryType.MITRE_TECHNIQUE:
            return (
                len(entities.mitre_techniques) + len(entities.mitre_tactics)
            ) >= MIN_ENTITIES_FOR_SPECIALIZED_ANALYSIS["mitre_analysis"]

        if primary_type in [QueryType.MIXED_ANALYSIS, QueryType.INCIDENT_OVERVIEW]:
            return (
                entities.entity_counts.get("total_entities", 0)
                >= MIN_ENTITIES_FOR_SPECIALIZED_ANALYSIS["mixed_analysis"]
            )

        return True

    def _log_classification_results(
        self, classification: QueryClassification, query: str
    ) -> None:
        """Log classification results for debugging."""

        if not self.logger:
            return

        self.logger.debug("Query classification completed:")
        self.logger.debug(
            f"  - Query: {query[:100]}{'...' if len(query) > 100 else ''}"
        )
        self.logger.debug(f"  - Primary type: {classification.primary_type.value}")
        self.logger.debug(
            f"  - Secondary types: {[t.value for t in classification.secondary_types]}"
        )
        self.logger.debug(f"  - Complexity: {classification.complexity.value}")
        self.logger.debug(f"  - Response format: {classification.response_format}")
        self.logger.debug(f"  - Confidence: {classification.confidence:.2f}")
        self.logger.debug(
            f"  - Available entities: {classification.available_entities}"
        )
        self.logger.debug(
            f"  - Specialized analysis: {classification.specialized_analysis}"
        )


def quick_classify_query(query: str, entities: OSINTEntities) -> str:
    """
    Quick classification function for simple use cases.

    Args:
        query: User query text
        entities: OSINT entities from context

    Returns:
        String representation of primary query type
    """
    classifier = QueryClassifier()
    classification = classifier.classify_query(query, entities)
    return classification.primary_type.value
