"""
Dynamic prompt builder for context-aware OSINT analysis.
Constructs specialized prompts based on query classification and available entities.
"""

from constants import (
    BASE_SECURITY_ANALYST_PERSONA,
    ANALYSIS_SECTIONS,
    RESPONSE_FORMATS,
    WRITING_STYLE_GUIDANCE,
)
from context_analyzer import OSINTEntities
from query_classifier import QueryClassification, QueryType, ComplexityLevel, QueryClassifier


class PromptBuilder:
    """Build context-aware prompts for OSINT security analysis."""

    def __init__(self):
        self.logger = None

    def build_prompt(
        self,
        user_query: str,
        entities: OSINTEntities,
        classification: QueryClassification,
        logger=None,
    ) -> str:
        """
        Build a context-aware prompt optimized for the specific query and entities.

        Args:
            user_query: The user's original query
            entities: Extracted OSINT entities from context
            classification: Query classification results
            logger: Optional logger instance

        Returns:
            Dynamically constructed prompt string
        """
        self.logger = logger

        # Start with base security analyst persona
        prompt_parts = [BASE_SECURITY_ANALYST_PERSONA.strip()]

        # Add context summary if entities are available
        if entities.entity_counts.get("total_entities", 0) > 0:
            context_summary = self._build_context_summary(entities)
            if context_summary:
                prompt_parts.append(f"\n=== AVAILABLE CONTEXT ===\n{context_summary}")

        # Add specialized analysis sections based on classification
        analysis_sections = self._build_analysis_sections(classification, entities)
        if analysis_sections:
            prompt_parts.append(f"\n=== ANALYSIS APPROACH ===\n{analysis_sections}")

        # Add response format guidance
        response_format = self._build_response_format(classification)
        if response_format:
            prompt_parts.append(f"\n=== RESPONSE STRUCTURE ===\n{response_format}")

        # Add writing style guidance
        prompt_parts.append(f"\n{WRITING_STYLE_GUIDANCE.strip()}")

        # Add entity-specific examples if helpful
        if classification.complexity in [ComplexityLevel.MEDIUM, ComplexityLevel.HIGH]:
            examples = self._build_examples_section(classification, entities)
            if examples:
                prompt_parts.append(f"\n=== ANALYSIS EXAMPLES ===\n{examples}")

        # Add final anti-recommendation reminder
        prompt_parts.append(
            "\n=== FINAL REMINDER ===\n"
            "Provide ONLY factual intelligence analysis. "
            "Do NOT include recommendations, suggestions, or action items."
        )

        # Add the user's actual query
        prompt_parts.append(f"\n=== USER REQUEST ===\n{user_query.strip()}")

        # Combine all parts
        final_prompt = "\n".join(prompt_parts)

        # Log prompt construction details
        if self.logger:
            self._log_prompt_construction(final_prompt, classification, entities)

        return final_prompt

    def validate_inputs(
        self, user_query: str, entities: OSINTEntities, classification: QueryClassification
    ) -> bool:
        """Validate inputs for prompt building."""
        if not user_query or not user_query.strip():
            return False
        if not isinstance(entities, OSINTEntities):
            return False
        if not isinstance(classification, QueryClassification):
            return False
        return True

    def _build_context_summary(self, entities: OSINTEntities) -> str:
        """Build a summary of available context entities."""
        summary_parts = []

        # File hash context
        total_hashes = sum(len(hashes) for hashes in entities.file_hashes.values())
        if total_hashes > 0:
            hash_details = self._build_file_hash_details(entities)
            if hash_details:
                summary_parts.append(
                    f"**File Hashes Available:** {', '.join(hash_details)}"
                )

        # Domain context
        if entities.email_domains:
            domain_count = len(entities.email_domains)
            domain_sample = entities.email_domains[0]
            summary_parts.append(
                f"**Email Domains:** {domain_count} domain{'s' if domain_count > 1 else ''} "
                f"(e.g., {domain_sample})"
            )

        # Public IP context
        if entities.public_ips:
            ip_count = len(entities.public_ips)
            ip_sample = entities.public_ips[0]
            summary_parts.append(
                f"**Public IP Addresses:** {ip_count} address{'es' if ip_count > 1 else ''} "
                f"(e.g., {ip_sample})"
            )

        # MITRE context
        mitre_items = self._build_mitre_items(entities)
        if mitre_items:
            technique_sample = entities.mitre_techniques[0] if entities.mitre_techniques else ""
            tactic_sample = entities.mitre_tactics[0] if entities.mitre_tactics else ""
            sample_text = (
                f" (e.g., {technique_sample or tactic_sample})"
                if (technique_sample or tactic_sample)
                else ""
            )
            summary_parts.append(f"**MITRE ATT&CK:** {', '.join(mitre_items)}{sample_text}")

        # Suspicious files context
        if entities.suspicious_files:
            file_count = len(entities.suspicious_files)
            file_sample = entities.suspicious_files[0]
            summary_parts.append(
                f"**Suspicious Files:** {file_count} file{'s' if file_count > 1 else ''} "
                f"(e.g., {file_sample})"
            )

        # Add incident type and confidence
        if summary_parts:
            summary_parts.append(
                f"**Incident Type:** {entities.incident_type.replace('_', ' ').title()}"
            )
            summary_parts.append(f"**Context Confidence:** {entities.confidence_score:.1%}")

        return "\n".join(summary_parts) if summary_parts else ""

    def _build_file_hash_details(self, entities: OSINTEntities) -> list:
        """Build file hash details for context summary."""
        hash_details = []
        for hash_type, hashes in entities.file_hashes.items():
            if hashes:
                count = len(hashes)
                sample = hashes[0][:16] + "..." if hashes[0] else ""
                hash_details.append(
                    f"{count} {hash_type.upper()} hash{'es' if count > 1 else ''} "
                    f"(e.g., {sample})"
                )
        return hash_details

    def _build_mitre_items(self, entities: OSINTEntities) -> list:
        """Build MITRE ATT&CK items for context summary."""
        mitre_items = []
        if entities.mitre_techniques:
            mitre_items.append(
                f"{len(entities.mitre_techniques)} "
                f"technique{'s' if len(entities.mitre_techniques) > 1 else ''}"
            )
        if entities.mitre_tactics:
            mitre_items.append(
                f"{len(entities.mitre_tactics)} "
                f"tactic{'s' if len(entities.mitre_tactics) > 1 else ''}"
            )
        return mitre_items

    def _build_analysis_sections(
        self, classification: QueryClassification, entities: OSINTEntities
    ) -> str:
        """Build analysis approach sections based on classification."""

        sections = []

        # Add primary analysis section
        primary_section = self._get_analysis_section(classification.primary_type)
        if primary_section:
            sections.append(primary_section.strip())

        # Add secondary analysis sections if present
        for secondary_type in classification.secondary_types:
            secondary_section = self._get_analysis_section(secondary_type)
            if secondary_section and secondary_section not in sections:
                sections.append(secondary_section.strip())

        # Add entity-specific guidance
        entity_guidance = self._build_entity_specific_guidance(entities, classification)
        if entity_guidance:
            sections.append(entity_guidance)

        return "\n\n".join(sections) if sections else ""

    def _get_analysis_section(self, query_type: QueryType) -> str:
        """Get the appropriate analysis section for a query type."""

        section_map = {
            QueryType.HASH_ANALYSIS: ANALYSIS_SECTIONS["hash_analysis"],
            QueryType.DOMAIN_REPUTATION: ANALYSIS_SECTIONS["domain_reputation"],
            QueryType.MITRE_TECHNIQUE: ANALYSIS_SECTIONS["mitre_analysis"],
            QueryType.INCIDENT_OVERVIEW: ANALYSIS_SECTIONS["incident_overview"],
            QueryType.MIXED_ANALYSIS: ANALYSIS_SECTIONS["incident_overview"],
        }

        return section_map.get(query_type, "")

    def _build_entity_specific_guidance(
        self, entities: OSINTEntities, classification: QueryClassification
    ) -> str:
        """Build entity-specific analysis guidance."""

        guidance_parts = []

        # Hash-specific guidance
        if classification.entity_focus.get("has_hashes"):
            hash_count = sum(len(hashes) for hashes in entities.file_hashes.values())
            if hash_count > 1:
                guidance_parts.append(
                    f"**Multiple Hash Analysis:** With {hash_count} file hashes available, "
                    "prioritize analysis by threat level and correlate findings across samples."
                )

        # Domain-specific guidance
        if classification.entity_focus.get("has_domains"):
            domain_count = len(entities.email_domains)
            if domain_count > 1:
                guidance_parts.append(
                    f"**Domain Correlation:** With {domain_count} domains identified, "
                    "analyze registration patterns, shared infrastructure, "
                    "and campaign connections."
                )

        # MITRE-specific guidance
        if classification.entity_focus.get("has_mitre"):
            technique_count = len(entities.mitre_techniques)
            if technique_count > 1:
                guidance_parts.append(
                    f"**Attack Chain Analysis:** With {technique_count} MITRE techniques present, "
                    "document the attack progression and observed defensive implementations "
                    "for each phase."
                )

        # Mixed analysis guidance
        if classification.entity_focus.get("has_multiple_types"):
            guidance_parts.append(
                "**Cross-Indicator Correlation:** Correlate findings across different "
                "indicator types to build a comprehensive threat assessment and attack timeline."
            )

        return "\n".join(guidance_parts) if guidance_parts else ""

    def _build_response_format(self, classification: QueryClassification) -> str:
        """Build response format guidance based on classification."""

        # Get base response format
        base_format = RESPONSE_FORMATS.get(classification.response_format, "")

        # Add complexity-specific guidance
        complexity_guidance = self._get_complexity_guidance(classification.complexity)

        format_parts = []
        if base_format:
            format_parts.append(base_format.strip())

        if complexity_guidance:
            format_parts.append(complexity_guidance)

        return "\n\n".join(format_parts) if format_parts else ""

    def _get_complexity_guidance(self, complexity: ComplexityLevel) -> str:
        """Get response guidance based on complexity level."""

        if complexity == ComplexityLevel.HIGH:
            return """
**High Complexity Analysis Guidelines:**
- Provide executive summary with key findings upfront
- Use clear section headers and structured formatting
- Include confidence levels for major assessments
- Prioritize findings by threat level and organizational impact
- Present comprehensive intelligence assessment with factual conclusions
"""
        if complexity == ComplexityLevel.MEDIUM:
            return """
**Medium Complexity Analysis Guidelines:**
- Structure response with clear logical flow
- Include brief summary of key findings
- Provide context for technical details
- Focus on most relevant threats and indicators
"""

        return """
**Focused Analysis Guidelines:**
- Provide direct, comprehensive analysis
- Include relevant technical details
- Focus on factual threat intelligence findings
"""

    def _build_examples_section(
        self, classification: QueryClassification, entities: OSINTEntities
    ) -> str:
        """Build examples section for complex analyses."""

        examples = []

        # Hash analysis example
        if (
            classification.primary_type == QueryType.HASH_ANALYSIS
            or QueryType.HASH_ANALYSIS in classification.secondary_types
        ):
            if entities.file_hashes.get("md5") or entities.file_hashes.get("sha256"):
                examples.append(
                    "**Hash Analysis Example:**\n"
                    '"MD5 hash abc123... is associated with the Emotet banking trojan family. '
                    "First observed in Campaign XYZ (March 2024), this sample exhibits typical "
                    'Emotet behavioral patterns including process injection and C2 communication."'
                )

        # Domain analysis example
        if (
            classification.primary_type == QueryType.DOMAIN_REPUTATION
            or QueryType.DOMAIN_REPUTATION in classification.secondary_types
        ):
            if entities.email_domains:
                examples.append(
                    "**Domain Analysis Example:**\n"
                    '"Domain example-threat.com has been active in phishing campaigns since '
                    "January 2024. The domain uses fast-flux DNS techniques and has been "
                    'associated with credential harvesting targeting financial institutions."'
                )

        # MITRE analysis example
        if (
            classification.primary_type == QueryType.MITRE_TECHNIQUE
            or QueryType.MITRE_TECHNIQUE in classification.secondary_types
        ):
            if entities.mitre_techniques:
                examples.append(
                    "**MITRE Analysis Example:**\n"
                    '"T1110 (Brute Force) attacks typically involve automated credential guessing '
                    "against authentication services. Detection focuses on failed login patterns, "
                    'account lockouts, and unusual authentication timing."'
                )

        return "\n\n".join(examples) if examples else ""

    def _log_prompt_construction(
        self, prompt: str, classification: QueryClassification, entities: OSINTEntities
    ) -> None:
        """Log prompt construction details for debugging."""

        if not self.logger:
            return

        prompt_length = len(prompt)
        self.logger.debug("Prompt construction completed:")
        self.logger.debug(f"  - Total length: {prompt_length:,} characters")
        self.logger.debug(f"  - Primary type: {classification.primary_type.value}")
        self.logger.debug(f"  - Complexity: {classification.complexity.value}")
        self.logger.debug(f"  - Response format: {classification.response_format}")
        self.logger.debug(
            f"  - Entities included: {entities.entity_counts.get('total_entities', 0)}"
        )
        self.logger.debug(
            f"  - Specialized sections: {len(classification.secondary_types) + 1}"
        )


def quick_build_prompt(user_query: str, entities: OSINTEntities) -> str:
    """
    Quick prompt building function for simple use cases.

    Args:
        user_query: User's query text
        entities: OSINT entities from context

    Returns:
        Basic context-aware prompt
    """

    # Quick classification
    classifier = QueryClassifier()
    classification = classifier.classify_query(user_query, entities)

    # Build prompt
    builder = PromptBuilder()
    return builder.build_prompt(user_query, entities, classification)
