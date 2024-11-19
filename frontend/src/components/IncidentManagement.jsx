// src/components/IncidentManagement.jsx
import React from 'react';

export default function IncidentManagement() {
  const [incidents, setIncidents] = React.useState([]);
  const [newIncident, setNewIncident] = React.useState({
    title: '',
    description: '',
    severity: 'High',
    status: 'Open'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/incidents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newIncident)
    })
      .then(res => res.json())
      .then(data => {
        setIncidents([...incidents, data]);
        setNewIncident({
          title: '',
          description: '',
          severity: 'High',
          status: 'Open'
        });
      });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              value={newIncident.title}
              onChange={e => setNewIncident({...newIncident, title: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={newIncident.description}
              onChange={e => setNewIncident({...newIncident, description: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Create Incident
          </button>
        </div>
      </form>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Active Incidents</h3>
        {incidents.map(incident => (
          <div key={incident.id} className="border-b py-4">
            <h4 className="font-medium">{incident.title}</h4>
            <p className="text-gray-600">{incident.description}</p>
            <div className="mt-2 flex space-x-2">
              <span className="text-sm text-gray-500">Status: {incident.status}</span>
              <span className="text-sm text-gray-500">Severity: {incident.severity}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}