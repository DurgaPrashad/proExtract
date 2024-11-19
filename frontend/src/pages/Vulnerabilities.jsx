
// src/pages/Vulnerabilities.jsx
import React from 'react';
import VulnerabilityTable from '../components/VulnerabilityTable';

export default function Vulnerabilities() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Vulnerabilities</h1>
      <VulnerabilityTable />
    </div>
  );
}