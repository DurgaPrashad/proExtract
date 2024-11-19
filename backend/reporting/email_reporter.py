# reporting/email_reporter.py
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication

class EmailReporter:
    def __init__(self):
        self.smtp_server = config.SMTP_SERVER
        self.smtp_port = config.SMTP_PORT
        self.sender_email = config.SENDER_EMAIL
        self.sender_password = config.SENDER_PASSWORD
        
    def send_report(self, pdf_path, recipients=None):
        if recipients is None:
            recipients = config.DEFAULT_RECIPIENTS
            
        msg = MIMEMultipart()
        msg['Subject'] = 'Vulnerability Scan Report'
        msg['From'] = self.sender_email
        msg['To'] = ', '.join(recipients)
        
        with open(pdf_path, 'rb') as f:
            pdf = MIMEApplication(f.read(), _subtype='pdf')
            pdf.add_header('Content-Disposition', 'attachment', filename='vulnerability_report.pdf')
            msg.attach(pdf)
            
        with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
            server.starttls()
            server.login(self.sender_email, self.sender_password)
            server.send_message(msg)
