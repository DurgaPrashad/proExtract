# PROEXTRACT VulnTracker - OEM Security Vulnerability Monitoring System

## Overview
proextract is a comprehensive system for monitoring, tracking, and managing security vulnerabilities from OEM equipment manufacturers. It automatically scrapes vulnerability data from vendor websites, processes the information, and provides a user-friendly interface for security teams to manage and respond to security incidents.

## Features
- 🔍 Automated vulnerability scanning from multiple OEM sources
- 🚨 Focus on Critical and High severity vulnerabilities
- 📊 Real-time dashboard with vulnerability metrics
- 📈 Trend analysis and reporting
- 🎯 Incident management system
- 📧 Automated email notifications
- 📱 Responsive web interface

## Technology Stack
- Backend: Python, Flask
- Frontend: React, Tailwind CSS
- Database: MongoDB
- Infrastructure: Docker, Google Cloud Platform

## Prerequisites
- Docker and Docker Compose
- Node.js 16+ (for local development)
- Python 3.9+ (for local development)
- MongoDB 5.0+ (for local development)

## Installation

### Using Docker (Recommended)
1. Clone the repository:
```bash
git clone https://github.com/your-org/vulntracker.git
cd vulntracker
```

2. Create a .env file in the root directory:
```bash
MONGODB_URI=mongodb://mongodb:27017/vulntracker
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SENDER_EMAIL=your-email@example.com
SENDER_PASSWORD=your-password
GCP_PROJECT_ID=your-project-id
PUBSUB_TOPIC_NAME=vulnerabilities
```

3. Build and run using Docker Compose:
```bash
docker-compose up --build
```

### Local Development Setup
1. Set up the backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
python app.py
```

2. Set up the frontend:
```bash
cd frontend
npm install
npm start
```

3. Set up MongoDB:
Install MongoDB and ensure it's running on port 27017.

## Usage

### Accessing the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: mongodb://localhost:27017

### User Roles
- Admin: Full system access
- Analyst: Can manage vulnerabilities and incidents
- Viewer: Read-only access to dashboards and reports

### Key Features
1. Dashboard
   - Overview of critical and high vulnerabilities
   - Recent incidents
   - Trend analysis

2. Vulnerability Management
   - List of all vulnerabilities
   - Filtering and sorting capabilities
   - Detailed vulnerability information

3. Incident Management
   - Create and track security incidents
   - Link vulnerabilities to incidents
   - Document resolution steps

4. Reporting
   - Generate PDF reports
   - Email distribution
   - Custom date ranges

## API Documentation
The backend API provides the following endpoints:

- GET /api/vulnerabilities - List all vulnerabilities
- POST /api/scan - Trigger vulnerability scan
- GET /api/analytics/trend - Get vulnerability trends
- POST /api/incidents - Create new incident
- GET /api/dashboard/summary - Get dashboard metrics

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Security
- All passwords are hashed using bcrypt
- API endpoints are protected with authentication
- Regular security updates for dependencies
- Input validation and sanitization

## License
This project is licensed under the MIT License - se

## Support
For support, please contact the security team or create an issue in the repository.

## Acknowledgments
- Thanks to all OEM partners for providing security advisory feeds
- Built with open-source software
