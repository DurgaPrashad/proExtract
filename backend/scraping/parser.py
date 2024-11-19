# scraping/parser.py
class VulnerabilityParser:
    def parse(self, soup):
        vulnerabilities = []
        for vuln in soup.find_all(class_='vulnerability-entry'):
            if self.is_critical_or_high(vuln):
                vulnerabilities.append({
                    'title': vuln.find(class_='title').text.strip(),
                    'severity': vuln.find(class_='severity').text.strip(),
                    'description': vuln.find(class_='description').text.strip(),
                    'affected_versions': vuln.find(class_='versions').text.strip(),
                    'published_date': vuln.find(class_='date').text.strip()
                })
        return vulnerabilities
    
    def is_critical_or_high(self, vuln):
        severity = vuln.find(class_='severity').text.strip().lower()
        return 'critical' in severity or 'high' in severity
