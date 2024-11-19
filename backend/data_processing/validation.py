# data_processing/validation.py
def validate_vulnerability(vuln):
    required_fields = ['title', 'severity', 'description']
    
    for field in required_fields:
        if field not in vuln or not vuln[field]:
            return False
            
    if not is_valid_severity(vuln['severity']):
        return False
        
    return True

def is_valid_severity(severity):
    valid_severities = ['critical', 'high']
    return severity.lower() in valid_severities