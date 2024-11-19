// src/components/ReportForm.jsx
import React from 'react';

export default function ReportForm() {
  const [formData, setFormData] = React.useState({
    startDate: '',
    endDate: '',
    includeCharts: true,
    recipients: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        alert('Report generated and sent successfully!');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
      <div>
        <label className="block text-sm font-medium">Start Date</label>
        <input
          type="date"
          value={formData.startDate}
          onChange={e => setFormData({...formData, startDate: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">End Date</label>
        <input
          type="date"
          value={formData.endDate}
          onChange={e => setFormData({...formData, endDate: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Recipients (comma-separated)</label>
        <input
          type="text"
          value={formData.recipients}
          onChange={e => setFormData({...formData, recipients: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.includeCharts}
            onChange={e => setFormData({...formData, includeCharts: e.target.checked})}
            className="rounded border-gray-300 text-blue-600"
          />
          <span className="ml-2">Include Charts</span>
        </label>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Generate Report
      </button>
    </form>
  );
}