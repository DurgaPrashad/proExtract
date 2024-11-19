// src/components/Dashboard.jsx
import React from 'react';
import VulnerabilityTable from './VulnerabilityTable';
import Charts from './Charts';

export default function Dashboard() {
  const [summary, setSummary] = React.useState({
    critical: 0,
    high: 0,
    totalVulnerabilities: 0,
    recentIncidents: []
  });

  React.useEffect(() => {
    fetch('/api/dashboard/summary')
      .then(res => res.json())
      .then(data => setSummary(data));
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-red-100 p-6 rounded-lg">
          <h3 className="text-lg font-medium">Critical Vulnerabilities</h3>
          <p className="text-2xl font-bold">{summary.critical}</p>
        </div>
        <div className="bg-orange-100 p-6 rounded-lg">
          <h3 className="text-lg font-medium">High Vulnerabilities</h3>
          <p className="text-2xl font-bold">{summary.high}</p>
        </div>
        <div className="bg-blue-100 p-6 rounded-lg">
          <h3 className="text-lg font-medium">Total Tracked</h3>
          <p className="text-2xl font-bold">{summary.totalVulnerabilities}</p>
        </div>
      </div>
      <Charts />
      <VulnerabilityTable limit={5} />
    </div>
  );
}