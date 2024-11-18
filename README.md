# ProExtract - Web Scraper for OEM Vulnerability Reporting

A robust web scraping and vulnerability reporting tool designed to identify critical and high-severity vulnerabilities in OEM (Original Equipment Manufacturer) equipment across IT and OT systems.

## Features

- 🔍 Automated vulnerability scanning for OEM equipment
- 🏷️ Smart categorization of vulnerabilities by severity
- 📊 Detailed reporting with export capabilities
- 🔐 Secure user authentication
- 🏭 Support for both IT and OT systems

## Project Structure

```bash
proextract/
├── backend/
│   ├── __init__.py
│   ├── app.py
│   ├── models.py
│   ├── views.py
│   ├── utils.py
│   ├── forms.py
│   ├── config.py
│   ├── scrape/
│   │   ├── scraper.py
│   │   └── utils.py
│   └── requirements.txt
├── frontend/
│   ├── templates/
│   │   ├── index.html
│   │   ├── dashboard.html
│   │   └── results.html
│   ├── static/
│   │   ├── css/
│   │   └── js/
├── migrations/
├── tests/
└── docker/
```

## Installation

### Prerequisites

```bash
# Install Python 3.8+
python --version  # Should be 3.8 or higher

# Install pip dependencies
pip install -r requirements.txt
```

### Core Dependencies

```python
# requirements.txt
Flask==2.0.1
SQLAlchemy==1.4.23
BeautifulSoup4==4.9.3
requests==2.26.0
pandas==1.3.3
PyJWT==2.1.0
python-dotenv==0.19.0
```

### Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/proextract.git
cd proextract
```

2. Set up your environment:
```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # Unix
.\venv\Scripts\activate   # Windows

# Install dependencies
pip install -r requirements.txt
```

3. Configure your environment variables:
```bash
# .env
DATABASE_URL=postgresql://user:password@localhost:5432/proextract
SECRET_KEY=your-secret-key
API_KEY=your-api-key
```

## Core Implementation

### Database Models

```python
# backend/models.py
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password_hash = Column(String(128), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class Vulnerability(Base):
    __tablename__ = 'vulnerabilities'
    
    id = Column(Integer, primary_key=True)
    oem_id = Column(Integer, ForeignKey('oem_equipment.id'))
    severity = Column(String(20), nullable=False)
    description = Column(String(500), nullable=False)
    cve_id = Column(String(20))
    discovered_at = Column(DateTime, default=datetime.utcnow)
```

### Scraping Implementation

```python
# backend/scrape/scraper.py
import requests
from bs4 import BeautifulSoup
from typing import List, Dict

class OEMVulnerabilityScanner:
    def __init__(self, base_url: str, api_key: str = None):
        self.base_url = base_url
        self.api_key = api_key
        self.session = requests.Session()
        
    def scan_vulnerabilities(self) -> List[Dict]:
        """Scans OEM equipment for vulnerabilities."""
        try:
            response = self.session.get(
                self.base_url,
                headers={'Authorization': f'Bearer {self.api_key}'}
            )
            soup = BeautifulSoup(response.text, 'html.parser')
            
            vulnerabilities = []
            for vuln in soup.find_all('div', class_='vulnerability-item'):
                vulnerability = {
                    'severity': vuln.get('data-severity', 'Unknown'),
                    'description': vuln.find('p', class_='description').text.strip(),
                    'cve_id': vuln.get('data-cve-id'),
                    'affected_systems': vuln.get('data-affected-systems', '').split(',')
                }
                if vulnerability['severity'].upper() in ['CRITICAL', 'HIGH']:
                    vulnerabilities.append(vulnerability)
                    
            return vulnerabilities
            
        except requests.RequestException as e:
            raise Exception(f"Failed to scan vulnerabilities: {str(e)}")
```

### API Implementation

```python
# backend/app.py
from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required
from .scrape.scraper import OEMVulnerabilityScanner

app = Flask(__name__)
jwt = JWTManager(app)

@app.route('/api/scan', methods=['POST'])
@jwt_required()
def scan_equipment():
    """Endpoint to scan OEM equipment for vulnerabilities."""
    data = request.get_json()
    
    if not data or 'url' not in data:
        return jsonify({'error': 'Missing URL parameter'}), 400
        
    try:
        scanner = OEMVulnerabilityScanner(
            base_url=data['url'],
            api_key=app.config['API_KEY']
        )
        vulnerabilities = scanner.scan_vulnerabilities()
        
        return jsonify({
            'status': 'success',
            'vulnerabilities': vulnerabilities
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
```

## Usage

### Basic Scanner Usage

```python
# Example usage of the vulnerability scanner
from backend.scrape.scraper import OEMVulnerabilityScanner

# Initialize scanner
scanner = OEMVulnerabilityScanner(
    base_url="https://oem-equipment-url.com",
    api_key="your-api-key"
)

# Scan for vulnerabilities
vulnerabilities = scanner.scan_vulnerabilities()

# Process results
for vuln in vulnerabilities:
    print(f"Severity: {vuln['severity']}")
    print(f"Description: {vuln['description']}")
    print(f"CVE ID: {vuln['cve_id']}")
    print("Affected Systems:", ", ".join(vuln['affected_systems']))
    print("-" * 50)
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM python:3.8-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV FLASK_APP=backend/app.py
ENV FLASK_ENV=production

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0"]
```

Build and run the Docker container:
```bash
docker build -t proextract .
docker run -p 5000:5000 -e DATABASE_URL=postgresql://user:pass@host:5432/db proextract
```

## Testing

```python
# tests/test_scanner.py
import unittest
from backend.scrape.scraper import OEMVulnerabilityScanner

class TestOEMVulnerabilityScanner(unittest.TestCase):
    def setUp(self):
        self.scanner = OEMVulnerabilityScanner(
            base_url="https://test-oem-url.com",
            api_key="test-api-key"
        )

    def test_vulnerability_scanning(self):
        vulnerabilities = self.scanner.scan_vulnerabilities()
        self.assertIsInstance(vulnerabilities, list)
        
        if vulnerabilities:
            vuln = vulnerabilities[0]
            self.assertIn('severity', vuln)
            self.assertIn('description', vuln)
            self.assertIn('cve_id', vuln)
```

Run tests:
```bash
python -m unittest discover tests
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## License



---

## Security Notes

- Always validate input URLs before scanning
- Use rate limiting for API endpoints
- Keep API keys and credentials secure
- Regular security updates for dependencies
- Monitor for false positives in vulnerability detection

For questions or support, please open an issue or contact the maintainers.
