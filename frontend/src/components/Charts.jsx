
// src/components/Charts.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function Charts() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/analytics/trend')
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Vulnerability Trends</h3>
      <LineChart width={800} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="critical" stroke="#EF4444" />
        <Line type="monotone" dataKey="high" stroke="#F97316" />
      </LineChart>
    </div>
  );
}