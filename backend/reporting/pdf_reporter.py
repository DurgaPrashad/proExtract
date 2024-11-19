# reporting/pdf_reporter.py
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle

class PDFReporter:
    def generate(self, data):
        doc = SimpleDocTemplate(
            "vulnerability_report.pdf",
            pagesize=letter
        )
        
        elements = []
        table_data = self.prepare_table_data(data)
        table = Table(table_data)
        table.setStyle(self.get_table_style())
        elements.append(table)
        
        doc.build(elements)
        return "vulnerability_report.pdf"
    
    def prepare_table_data(self, data):
        headers = ['Title', 'Severity', 'Description', 'Affected Versions']
        table_data = [headers]
        
        for vuln in data:
            row = [
                vuln['title'],
                vuln['severity'],
                vuln['description'],
                vuln['affected_versions']
            ]
            table_data.append(row)
        
        return table_data
    
    def get_table_style(self):
        return TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 14),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('TEXTCOLOR', (0, 1), (-1, -1), colors.black),
            ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 1), (-1, -1), 12),
            ('GRID', (0, 0), (-1, -1), 1, colors.black)
        ])