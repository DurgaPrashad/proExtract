// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Vulnerabilities from './pages/Vulnerabilities';
import Analytics from './pages/Analytics';
import IncidentManagement from './pages/IncidentManagement';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex-shrink-0 flex items-center">
                  <span className="text-xl font-bold">VulnTracker</span>
                </Link>
                <div className="ml-6 flex space-x-8">
                  <Link to="/vulnerabilities" className="hover:text-blue-600">Vulnerabilities</Link>
                  <Link to="/analytics" className="hover:text-blue-600">Analytics</Link>
                  <Link to="/incidents" className="hover:text-blue-600">Incidents</Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
        
        <main className="max-w-7xl mx-auto py-6 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vulnerabilities" element={<Vulnerabilities />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/incidents" element={<IncidentManagement />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
















