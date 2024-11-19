# config.py
import os
from dotenv import load_dotenv

load_dotenv()

DEBUG = os.getenv('DEBUG', 'False') == 'True'

# Scraping configuration
SOURCES = [
    'https://security.vendor1.com/advisories',
    'https://vendor2.com/security-bulletins',
    # Add more sources as needed
]

# Email configuration
SMTP_SERVER = os.getenv('SMTP_SERVER')
SMTP_PORT = int(os.getenv('SMTP_PORT', '587'))
SENDER_EMAIL = os.getenv('SENDER_EMAIL')
SENDER_PASSWORD = os.getenv('SENDER_PASSWORD')
DEFAULT_RECIPIENTS = os.getenv('DEFAULT_RECIPIENTS', '').split(',')

# Google Cloud configuration
PROJECT_ID = os.getenv('GCP_PROJECT_ID')
TOPIC_NAME = os.getenv('PUBSUB_TOPIC_NAME')