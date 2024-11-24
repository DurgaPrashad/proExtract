# PROEXTRACT VulnTracker - OEM Security Vulnerability Monitoring System
![image](https://github.com/user-attachments/assets/78039474-4754-4803-b281-79f2b2718086)



> **Note: This project is currently under development and features are being actively implemented.**

## Overview
A specialized web scraping tool designed to automatically search and report Critical and High Severity Vulnerabilities of OEM equipment (IT and OT). The tool continuously monitors official OEM websites and relevant security platforms to identify and alert on significant vulnerabilities that could affect your OEM infrastructure.

## Key Functions
- Automated scanning of OEM manufacturer websites for security advisories
- Focused detection of Critical and High Severity vulnerabilities
- Support for both IT and OT equipment vulnerabilities
- Structured reporting of discovered vulnerabilities
- Alert system for immediate notification of critical findings

## Supported Data Sources
- Official OEM vendor security pages
- Security advisory platforms
- CVE databases
- Security bulletins
- Vendor-specific notification systems

## Project Structure
```
vulnerability_scanner/
│
├── src/
│   ├── __init__.py
│   ├── scraper/
│   │   ├── __init__.py
│   │   ├── base_scraper.py
│   │   ├── html_scraper.py
│   │   └── api_scraper.py
│   ├── parser/
│   │   ├── __init__.py
│   │   ├── vulnerability_parser.py
│   │   └── nlp_parser.py
│   ├── database/
│   │   ├── __init__.py
│   │   ├── models.py
│   │   └── database.py
│   ├── reporter/
│   │   ├── __init__.py
│   │   ├── report_generator.py
│   │   └── dashboard.py
│   ├── alerting/
│   │   ├── __init__.py
│   │   ├── email_alerter.py
│   │   ├── slack_alerter.py
│   │   └── sms_alerter.py
│   ├── ml/
│   │   ├── __init__.py
│   │   └── severity_predictor.py
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── retry.py
│   │   └── health_check.py
│   └── logger.py
│
├── config/
│   └── config.yaml
│
├── data/
│   ├── vulnerabilities.db
│   └── severity_model.pkl
│
├── logs/
│   └── vulnerability_scanner.log
│
├── reports/
│   └── .gitkeep
│
├── tests/
│   ├── __init__.py
│   ├── test_scraper.py
│   ├── test_parser.py
│   ├── test_database.py
│   └── test_reporter.py
│
├── ui/
│   ├── pages/
│   │   ├── _app.tsx
│   │   ├── index.tsx
│   │   └── dashboard.tsx
│   ├── components/
│   │   ├── Layout.tsx
│   │   ├── VulnerabilityTable.tsx
│   │   └── AlertConfig.tsx
│   └── styles/
│       └── globals.css
│
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
│
├── requirements.txt
├── main.py
└── README.md
```

## Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/oem-vulnerability-scanner.git
cd oem-vulnerability-scanner
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure OEM sources:
Edit `config/config.yaml` to specify:
```yaml
oem_sources:
  - name: "Vendor1"
    url: "https://vendor1.com/security-advisories"
    type: "html"
    severity_threshold: "HIGH"
  - name: "Vendor2"
    url: "https://vendor2.com/api/vulnerabilities"
    type: "api"
    api_key: "your_api_key"
```

## Usage
1. Start the scanner:
```bash
python main.py
```

2. The tool will:
   - Scan configured OEM websites
   - Extract vulnerability information
   - Filter for Critical and High severity issues
   - Generate reports
   - Send alerts for significant findings

## Report Format
Vulnerability reports include:
- Vulnerability ID
- Affected OEM Equipment
- Severity Level
- Description
- Impact
- Recommended Actions
- Source URL
- Discovery Date

## Adding New OEM Sources
1. Add source details to `config/config.yaml`
2. If needed, create a custom scraper in `src/scraper/` for specific OEM formats
3. Test the new source using:
```bash
python -m tests.test_scraper --source new_oem_name
```

## Configuration
Key settings in `config.yaml`:
```yaml
scanning:
  interval: 3600          # Scan frequency in seconds
  retry_attempts: 3       # Number of retry attempts
  
severity_filters:
  - CRITICAL
  - HIGH

alerts:
  enabled: true
  methods:
    - email
    - slack
    - sms
```

## Development
- Follow PEP 8 style guidelines
- Add tests for new scrapers
- Document new OEM source formats
- Update severity classification rules as needed

## UI Access
The dashboard is available at `http://localhost:3000` after starting the application, providing:
- Vulnerability monitoring interface
- Alert configuration
- Report generation
- Scanning status overview

## Security Notes
- Respect OEM website terms of service
- Maintain appropriate scanning intervals
- Handle vulnerability data securely
- Follow responsible disclosure practices

## License
MIT License - See LICENSE file

## Support
For issues and feature requests:
1. Check existing issues
2. Open a new issue with:
   - OEM source details
   - Expected behavior
   - Current behavior
   - Steps to reproduce
