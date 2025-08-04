"""
Context analyzer for extracting OSINT-relevant entities from falcon incident data.
Focuses on publicly available threat intelligence indicators.
"""

from typing import Dict, List, Union
from dataclasses import dataclass
from constants import (
    COMPILED_PATTERNS,
    PRIVATE_IP_RANGES,
    COMPILED_MALWARE_PATTERNS,
    MAX_ENTITIES_PER_TYPE,
)


@dataclass
class OSINTEntities:
    """Structured representation of OSINT-relevant entities extracted from context."""

    # File indicators
    file_hashes: Dict[str, List[str]]  # {'md5': [...], 'sha256': [...]}
    suspicious_files: List[str]

    # Network indicators
    email_domains: List[str]
    public_ips: List[str]

    # MITRE context
    mitre_techniques: List[str]
    mitre_tactics: List[str]

    # Metadata
    incident_type: str
    entity_counts: Dict[str, int]
    confidence_score: float
    data_sources: List[str]


class ContextAnalyzer:
    """Extract and classify OSINT-relevant entities from incident context data."""

    def __init__(self):
        self.logger = None  # Will be set by main handler

    def extract_entities(
        self, context_data: Union[Dict, List], logger=None
    ) -> OSINTEntities:
        """
        Extract OSINT-relevant entities from falcon context data.

        Args:
            context_data: Raw falcon context data (can be dict or list)
            logger: Optional logger instance

        Returns:
            OSINTEntities object with extracted and classified entities
        """
        self.logger = logger

        # Handle different context data formats
        if isinstance(context_data, list) and len(context_data) > 0:
            # Handle list format (like from API response)
            incident_data = context_data[0] if context_data else {}
        else:
            # Handle direct incident object
            incident_data = context_data if isinstance(context_data, dict) else {}

        # Initialize entity containers
        entities = OSINTEntities(
            file_hashes={"md5": [], "sha256": [], "sha1": []},
            suspicious_files=[],
            email_domains=[],
            public_ips=[],
            mitre_techniques=[],
            mitre_tactics=[],
            incident_type="unknown",
            entity_counts={},
            confidence_score=0.0,
            data_sources=[],
        )

        # Extract entities from different data sections
        self._extract_file_hashes(incident_data, entities)
        self._extract_email_domains(incident_data, entities)
        self._extract_public_ips(incident_data, entities)
        self._extract_mitre_context(incident_data, entities)
        self._extract_suspicious_files(incident_data, entities)

        # Classify incident and calculate metadata
        entities.incident_type = self._classify_incident_type(entities)
        entities.entity_counts = self._calculate_entity_counts(entities)
        entities.confidence_score = self._calculate_confidence_score(entities)
        entities.data_sources = self._identify_data_sources(incident_data)

        # Log extraction results
        if self.logger:
            self._log_extraction_results(entities)

        return entities

    def _extract_file_hashes(self, data: Dict, entities: OSINTEntities) -> None:
        """Extract MD5, SHA1, and SHA256 hashes from incident data."""

        # Extract from entity_values section
        entity_values = data.get("entity_values", {})

        # MD5 hashes
        md5_hashes = entity_values.get("md5s", []) or data.get("entities", {}).get(
            "md5", []
        )
        entities.file_hashes["md5"] = self._deduplicate_and_limit(
            md5_hashes, MAX_ENTITIES_PER_TYPE
        )

        # SHA256 hashes
        sha256_hashes = entity_values.get("sha256s", []) or data.get(
            "entities", {}
        ).get("sha256", [])
        entities.file_hashes["sha256"] = self._deduplicate_and_limit(
            sha256_hashes, MAX_ENTITIES_PER_TYPE
        )

        # SHA1 hashes (less common but possible)
        sha1_hashes = entity_values.get("sha1s", []) or data.get("entities", {}).get(
            "sha1", []
        )
        entities.file_hashes["sha1"] = self._deduplicate_and_limit(
            sha1_hashes, MAX_ENTITIES_PER_TYPE
        )

        # Also check entities_full for additional hash data
        entities_full = data.get("entities_full", [])
        for entity in entities_full:
            if isinstance(entity, dict):
                # Look for hash fields in entity data
                for field_name, field_value in entity.items():
                    if "md5" in field_name.lower() and isinstance(field_value, str):
                        if self._is_valid_hash(field_value, "md5"):
                            entities.file_hashes["md5"].append(field_value)
                    elif "sha256" in field_name.lower() and isinstance(
                        field_value, str
                    ):
                        if self._is_valid_hash(field_value, "sha256"):
                            entities.file_hashes["sha256"].append(field_value)

        # Remove duplicates and limit
        for hash_type in entities.file_hashes:
            entities.file_hashes[hash_type] = self._deduplicate_and_limit(
                entities.file_hashes[hash_type], MAX_ENTITIES_PER_TYPE
            )

    def _extract_email_domains(self, data: Dict, entities: OSINTEntities) -> None:
        """Extract unique domains from email addresses, ignoring usernames."""

        email_addresses = []

        # Get emails from entity_values
        entity_values = data.get("entity_values", {})
        email_addresses.extend(entity_values.get("email_addresses", []))

        # Get emails from entities section
        entities_data = data.get("entities", {})
        email_addresses.extend(entities_data.get("email", []))

        # Extract domains from email addresses
        domains = set()
        for email in email_addresses:
            if isinstance(email, str) and "@" in email:
                try:
                    domain = email.split("@")[1].lower().strip()
                    # Validate domain format
                    if self._is_valid_domain(domain):
                        domains.add(domain)
                except (IndexError, AttributeError):
                    continue

        entities.email_domains = self._deduplicate_and_limit(
            list(domains), MAX_ENTITIES_PER_TYPE
        )

    def _extract_public_ips(self, data: Dict, entities: OSINTEntities) -> None:
        """Extract public IP addresses, filtering out private ranges."""

        ip_addresses = []

        # Get IPs from entity_values
        entity_values = data.get("entity_values", {})
        ip_addresses.extend(entity_values.get("ipv4s", []))

        # Get IPs from entities section
        entities_data = data.get("entities", {})
        ip_addresses.extend(entities_data.get("ipv4", []))

        # Filter for public IPs only
        public_ips = []
        for ip in ip_addresses:
            if isinstance(ip, str) and self._is_public_ip(ip):
                public_ips.append(ip)

        entities.public_ips = self._deduplicate_and_limit(
            public_ips, MAX_ENTITIES_PER_TYPE
        )

    def _extract_mitre_context(self, data: Dict, entities: OSINTEntities) -> None:
        """Extract MITRE ATT&CK techniques and tactics."""

        # Extract technique IDs
        technique_ids = []
        if "technique_ids" in data:
            technique_ids.extend(data["technique_ids"])
        if "technique_id" in data:
            technique_ids.append(data["technique_id"])

        # Extract tactic IDs
        tactic_ids = []
        if "tactic_ids" in data:
            tactic_ids.extend(data["tactic_ids"])
        if "tactic_id" in data:
            tactic_ids.append(data["tactic_id"])

        # Validate and clean technique IDs
        valid_techniques = []
        for tech_id in technique_ids:
            if isinstance(tech_id, str) and COMPILED_PATTERNS["mitre_technique"].match(
                tech_id
            ):
                valid_techniques.append(tech_id.upper())

        # Validate and clean tactic IDs
        valid_tactics = []
        for tactic_id in tactic_ids:
            if isinstance(tactic_id, str) and COMPILED_PATTERNS["mitre_tactic"].match(
                tactic_id
            ):
                valid_tactics.append(tactic_id.upper())

        entities.mitre_techniques = self._deduplicate_and_limit(
            valid_techniques, MAX_ENTITIES_PER_TYPE
        )
        entities.mitre_tactics = self._deduplicate_and_limit(
            valid_tactics, MAX_ENTITIES_PER_TYPE
        )

    def _extract_suspicious_files(self, data: Dict, entities: OSINTEntities) -> None:
        """Extract suspicious file names and patterns."""

        file_names = []

        # Get file names from entities
        entities_data = data.get("entities", {})
        file_names.extend(entities_data.get("file_name", []))
        file_names.extend(entities_data.get("image_file_name", []))

        # Check entities_full for additional file names
        entities_full = data.get("entities_full", [])
        for entity in entities_full:
            if isinstance(entity, dict):
                for field_name, field_value in entity.items():
                    if "filename" in field_name.lower() and isinstance(
                        field_value, str
                    ):
                        file_names.append(field_value)

        # Filter for suspicious files
        suspicious_files = []
        for filename in file_names:
            if isinstance(filename, str) and self._is_suspicious_file(filename):
                suspicious_files.append(filename)

        entities.suspicious_files = self._deduplicate_and_limit(
            suspicious_files, MAX_ENTITIES_PER_TYPE
        )

    def _is_valid_hash(self, value: str, hash_type: str) -> bool:
        """Validate if a string is a valid hash of the specified type."""
        if not isinstance(value, str):
            return False

        pattern_key = f"{hash_type}_hash"
        if pattern_key in COMPILED_PATTERNS:
            return bool(COMPILED_PATTERNS[pattern_key].fullmatch(value))
        return False

    def _is_valid_domain(self, domain: str) -> bool:
        """Validate if a string is a valid domain name."""
        if not isinstance(domain, str) or len(domain) < 3:
            return False

        return bool(COMPILED_PATTERNS["domain"].match(domain))

    def _is_public_ip(self, ip: str) -> bool:
        """Check if an IP address is public (not in private ranges)."""
        if not isinstance(ip, str):
            return False

        # Validate IP format first
        if not COMPILED_PATTERNS["ipv4"].match(ip):
            return False

        # Check against private ranges
        for private_range in PRIVATE_IP_RANGES:
            if private_range.match(ip):
                return False

        return True

    def _is_suspicious_file(self, filename: str) -> bool:
        """Check if a filename matches suspicious patterns."""
        if not isinstance(filename, str):
            return False

        # Check against known malware patterns
        for pattern in COMPILED_MALWARE_PATTERNS:
            if pattern.search(filename):
                return True

        # Check for suspicious extensions
        if COMPILED_PATTERNS["suspicious_extensions"].search(filename):
            return True

        return False

    def _classify_incident_type(self, entities: OSINTEntities) -> str:
        """Classify the incident type based on available entities."""

        # Count entity types
        has_hashes = any(len(hashes) > 0 for hashes in entities.file_hashes.values())
        has_domains = len(entities.email_domains) > 0
        has_ips = len(entities.public_ips) > 0
        has_mitre = (
            len(entities.mitre_techniques) > 0 or len(entities.mitre_tactics) > 0
        )
        has_files = len(entities.suspicious_files) > 0

        # Determine primary incident type
        entity_types = sum([has_hashes, has_domains, has_ips, has_mitre, has_files])

        if entity_types == 0:
            return "unknown"
        elif entity_types == 1:
            if has_hashes or has_files:
                return "file-based"
            elif has_domains:
                return "email-based"
            elif has_ips:
                return "network-based"
            elif has_mitre:
                return "technique-based"
        else:
            return "mixed-indicators"

        return "general-security"

    def _calculate_entity_counts(self, entities: OSINTEntities) -> Dict[str, int]:
        """Calculate entity counts for metadata."""

        return {
            "total_hashes": sum(
                len(hashes) for hashes in entities.file_hashes.values()
            ),
            "md5_hashes": len(entities.file_hashes["md5"]),
            "sha256_hashes": len(entities.file_hashes["sha256"]),
            "sha1_hashes": len(entities.file_hashes["sha1"]),
            "email_domains": len(entities.email_domains),
            "public_ips": len(entities.public_ips),
            "mitre_techniques": len(entities.mitre_techniques),
            "mitre_tactics": len(entities.mitre_tactics),
            "suspicious_files": len(entities.suspicious_files),
            "total_entities": (
                sum(len(hashes) for hashes in entities.file_hashes.values())
                + len(entities.email_domains)
                + len(entities.public_ips)
                + len(entities.mitre_techniques)
                + len(entities.mitre_tactics)
                + len(entities.suspicious_files)
            ),
        }

    def _calculate_confidence_score(self, entities: OSINTEntities) -> float:
        """Calculate confidence score based on entity quality and quantity."""

        score = 0.0

        # Hash confidence (high value indicators)
        total_hashes = sum(len(hashes) for hashes in entities.file_hashes.values())
        score += min(total_hashes * 0.3, 0.4)

        # Domain confidence (medium value indicators)
        score += min(len(entities.email_domains) * 0.2, 0.2)

        # IP confidence (high value when public)
        score += min(len(entities.public_ips) * 0.25, 0.2)

        # MITRE confidence (structured threat intelligence)
        mitre_count = len(entities.mitre_techniques) + len(entities.mitre_tactics)
        score += min(mitre_count * 0.1, 0.2)

        return min(score, 1.0)

    def _identify_data_sources(self, data: Dict) -> List[str]:
        """Identify data sources from incident metadata."""

        sources = []

        # Check source products
        if "source_products" in data:
            sources.extend(data["source_products"])

        # Check source vendors
        if "source_vendors" in data:
            sources.extend(data["source_vendors"])

        # Check data domains
        if "data_domains" in data:
            sources.extend(data["data_domains"])

        return list(set(sources))  # Remove duplicates

    def _deduplicate_and_limit(self, items: List[str], limit: int) -> List[str]:
        """Remove duplicates and limit list size."""
        if not items:
            return []

        # Remove duplicates while preserving order
        seen = set()
        unique_items = []
        for item in items:
            if isinstance(item, str) and item not in seen:
                seen.add(item)
                unique_items.append(item)

        # Apply limit
        return unique_items[:limit]

    def _log_extraction_results(self, entities: OSINTEntities) -> None:
        """Log entity extraction results for debugging."""

        if not self.logger:
            return

        self.logger.debug("Entity extraction completed:")
        self.logger.debug(f"  - Incident type: {entities.incident_type}")
        self.logger.debug(
            f"  - Total entities: {entities.entity_counts.get('total_entities', 0)}"
        )
        self.logger.debug(
            f"  - File hashes: {entities.entity_counts.get('total_hashes', 0)}"
        )
        self.logger.debug(f"  - Email domains: {len(entities.email_domains)}")
        self.logger.debug(f"  - Public IPs: {len(entities.public_ips)}")
        self.logger.debug(f"  - MITRE techniques: {len(entities.mitre_techniques)}")
        self.logger.debug(f"  - Confidence score: {entities.confidence_score:.2f}")
