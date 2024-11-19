# app.py
from flask import Flask, jsonify, request
from scraping.scraper import VulnerabilityScanner
from data_processing.processor import DataProcessor
from reporting.email_reporter import EmailReporter
from reporting.pdf_reporter import PDFReporter
from reporting.pubsub_notifier import PubSubNotifier
import config

app = Flask(__name__)

@app.route('/api/scan', methods=['POST'])
def start_scan():
    scanner = VulnerabilityScanner()
    results = scanner.scan_all_sources()
    processor = DataProcessor()
    processed_data = processor.process_vulnerabilities(results)
    return jsonify(processed_data)

@app.route('/api/report', methods=['POST'])
def generate_report():
    data = request.get_json()
    pdf_reporter = PDFReporter()
    email_reporter = EmailReporter()
    
    pdf_path = pdf_reporter.generate(data)
    email_reporter.send_report(pdf_path)
    return jsonify({"status": "Report sent successfully"})

if __name__ == '__main__':
    app.run(debug=config.DEBUG)















