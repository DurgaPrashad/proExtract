// src/pages/Analytics.jsx
import React from 'react';
import Charts from '../components/Charts';
import ReportForm from '../components/ReportForm';

export default function Analytics() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>
      <div className="space-y-6">
        <Charts />
        <div>
          <h2 className="text-xl font-bold mb-4">Generate Report</h2>
          <ReportForm />
        </div>
      </div>
    </div>
  );
}