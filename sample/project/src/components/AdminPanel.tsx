import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Campaigns from './Campaigns';
import Donors from './Donors';
import Analytics from './Analytics';
import Settings from './Settings';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'campaigns':
        return <Campaigns />;
      case 'donors':
        return <Donors />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 lg:ml-64">
        <div className="min-h-screen">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;