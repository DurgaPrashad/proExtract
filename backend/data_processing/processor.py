# data_processing/processor.py
from .validation import validate_vulnerability
from datetime import datetime

class DataProcessor:
    def process_vulnerabilities(self, vulnerabilities):
        processed = []
        for vuln in vulnerabilities:
            if validate_vulnerability(vuln):
                processed_vuln = self.enrich_vulnerability(vuln)
                processed.append(processed_vuln)
        return processed
    
    def enrich_vulnerability(self, vuln):
        vuln['processed_date'] = datetime.now().isoformat()
        vuln['risk_score'] = self.calculate_risk_score(vuln)
        return vuln
    
    def calculate_risk_score(self, vuln):
        base_score = 10 if vuln['severity'].lower() == 'critical' else 8
        # Add additional risk factors here
        return base_score