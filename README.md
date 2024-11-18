# ProExtract - Web Scraping and Vulnerability Scanning Tool

ProExtract is a comprehensive web scraping and vulnerability scanning tool designed to help users extract data from websites and identify security vulnerabilities. It offers a full-stack solution with both backend and frontend components, allowing users to input website URLs, view detailed reports, and analyze potential security risks.

## Project Structure

### Backend

The backend contains all the server-side code, including the application logic, routes, database models, and utilities.

- **backend/**
  - **`__init__.py`**: Initialize the Flask app and set up the application context.
  - **`app.py`**: Main application file that contains routes for login, dashboard, and vulnerability scanning.
  - **`models.py`**: Contains database models for User, Store, and Vulnerability.
  - **`views.py`**: Handles the route logic for rendering views like login, dashboard, etc.
  - **`utils.py`**: Helper functions for web scraping, vulnerability scanning, and other utilities.
  - **`forms.py`**: Form definitions for user authentication, store submission, and data inputs.
  - **`config.py`**: Configuration settings for the app, including database setup, secret keys, and other environment configurations.
  - **`scrape/`**: Contains the logic for web scraping and vulnerability scanning.
    - **`scraper.py`**: Main script for web scraping and detecting vulnerabilities.
    - **`utils.py`**: Helper functions for sending HTTP requests, parsing HTML, and handling vulnerability detection.
  - **`requirements.txt`**: Lists Python dependencies (Flask, SQLAlchemy, etc.).

### Frontend

The frontend folder contains the HTML, CSS, and JavaScript files that handle the user interface.

- **frontend/**
  - **`index.html`**: The homepage that includes user login and registration forms.
  - **`dashboard.html`**: The user dashboard for entering a website URL and viewing vulnerability reports.
  - **`results.html`**: Displays detailed vulnerability results for each scanned website.
  - **`style.css`**: Styles for the frontend pages.
  - **`script.js`**: JavaScript to manage form submissions, AJAX requests, and dynamic page updates.
  - **`assets/`**: Static files like images, fonts, and logos.
    - **`logo.png`**: Optional project logo for branding.

### Migrations

This folder contains database migration files if you are using **Flask-Migrate** for schema changes.

- **migrations/**
  - **`versions/`**: Stores version-controlled database migration files.

### Tests

The tests folder contains unit tests to ensure the correctness of the application.

- **tests/**
  - **`test_app.py`**: Tests for routes, views, and general functionality.
  - **`test_scraper.py`**: Tests for the web scraping and vulnerability scanning functionality.
  - **`test_models.py`**: Tests for the database models, ensuring correct data storage and retrieval.

### Other Files

- **`.gitignore`**: Specifies which files and directories should be ignored by Git (e.g., environment files, virtual environment).
- **`Dockerfile`**: Docker configuration file to containerize the application.
- **`.env`**: Environment variables for the app (e.g., database credentials, API keys).
- **`main.py`**: The main entry point for the application, typically for launching the app.
- **`requirements.txt`**: Python package dependencies required for running the project.

## Installation

Follow the steps below to set up and run ProExtract on your local machine.

### Prerequisites

Ensure you have the following installed:

- Python 3.8+ 
- Pip (Python package manager)
- Docker (for containerization)

### Clone the Repository

Clone the project repository:

```bash
git clone https://github.com/yourusername/proextract.git

## Structure 
proextract/
│  
├── backend/                   # Backend-related code  
│ ├── __init__.py               # Initialize Flask app  
│ ├── app.py                    # Main application file with routes (Login, Dashboard)  
│ ├── models.py                 # Database models (User, Store, Vulnerability)  
│ ├── views.py                  # Route handling for views (login, dashboard, etc.)  
│ ├── utils.py                  # Helper functions for scanning, scraping, etc.  
│ ├── forms.py                  # Form definitions for login, store submission, etc.  
│ ├── config.py                 # Configuration settings (database, secret keys)  
│ ├── scrape/                   # Web scraping and vulnerability scanning logic  
│ │ ├── scraper.py              # Web scraping and vulnerability detection script  
│ │ └── utils.py                # Helper functions for scraping (requesting pages, parsing data)  
│ └── requirements.txt          # Python dependencies (Flask, SQLAlchemy, etc.)  
│  
├── frontend/                   # Frontend-related files  
│ ├── index.html                # Homepage (login, register page)  
│ ├── dashboard.html            # User dashboard (enter store URL, view reports)  
│ ├── results.html              # Vulnerability results page (for each store)  
│ ├── style.css                 # CSS for frontend pages  
│ ├── script.js                 # JavaScript to handle form submissions, AJAX calls  
│ └── assets/                   # Static assets (images, fonts, etc.)  
│ └── logo.png                  # Optional: Project logo for branding  
│  
├── migrations/                 # Database migrations (if using Flask-Migrate)  
│ └── versions/                 # Version-controlled migrations  
│  
├── tests/                      # Unit tests and test cases  
│ ├── test_app.py               # Tests for routes and views  
│ ├── test_scraper.py           # Tests for scraping functionality  
│ └── test_models.py            # Tests for database models  
│  
└── .gitignore                  # Git ignore file for unnecessary files/folders  
├── Dockerfile                  # Docker configuration  
├── .env                        # Environment variables (to be kept secure)  
├── .gitignore                  # Git ignore file  
└── main.py                     # Main entry point for the application  


 Install Dependencies
Navigate to the project directory and install the required Python dependencies:

cd proextract
pip install -r requirements.txt
Set Up the Database
Run the following commands to initialize the database:

python backend/manage.py db init
python backend/manage.py db migrate
python backend/manage.py db upgrade
Run the Application
To start the Flask app, run the following command:


python backend/app.py
Alternatively, if using Docker, build and run the application in a container:


docker build -t proextract .
docker run -p 5000:5000 proextract
Visit http://localhost:5000 to access the application.

Usage
Login and Dashboard
Open the homepage (index.html) and log in or register a new account.
After logging in, you will be redirected to the dashboard where you can input a website URL to scan for vulnerabilities.
Enter a URL and click the Scan button. The tool will scrape the site, detect vulnerabilities, and display the results on the results page.
Viewing Results
Once the scan is complete, you'll be shown a detailed report with the identified vulnerabilities, categorized by severity.

Exporting Data
After scanning, you can export the results in various formats such as JSON, CSV, or PDF by clicking the export button on the results page.
