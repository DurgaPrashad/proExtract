# scraping/utils.py
from urllib.parse import urlparse, urljoin

def normalize_url(url):
    parsed = urlparse(url)
    return parsed.geturl()

def extract_domain(url):
    parsed = urlparse(url)
    return parsed.netloc