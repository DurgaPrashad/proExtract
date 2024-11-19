# scraping/scraper.py
import requests
from bs4 import BeautifulSoup
from .utils import normalize_url
from .parser import VulnerabilityParser

class VulnerabilityScanner:
    def __init__(self):
        self.parser = VulnerabilityParser()
        
    def scan_all_sources(self):
        results = []
        for source in config.SOURCES:
            try:
                vulnerabilities = self.scan_source(source)
                results.extend(vulnerabilities)
            except Exception as e:
                print(f"Error scanning {source}: {str(e)}")
        return results
    
    def scan_source(self, url):
        response = requests.get(normalize_url(url))
        soup = BeautifulSoup(response.text, 'html.parser')
        return self.parser.parse(soup)