import React, { useState } from 'react';
import Overview from './components/Overview';
import Storage from './components/Storage';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Header from './components/Header';
import './sidebar1.css'; // Import the combined CSS file

function Sidebar() {
  const [activeSection, setActiveSection] = useState('overview');

  const handleMenuClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
          <span>SeedVault</span>
        </div>
        <nav className="menu">
          <ul>
            <li 
              onClick={() => handleMenuClick('overview')} 
              className={activeSection === 'overview' ? 'active' : ''}
            >
              Dashboard
            </li>
            <li 
              onClick={() => handleMenuClick('storage')} 
              className={activeSection === 'storage' ? 'active' : ''}
            >
              Storage
            </li>
            <li 
              onClick={() => handleMenuClick('reports')} 
              className={activeSection === 'reports' ? 'active' : ''}
            >
              Reports
            </li>
            <li 
              onClick={() => handleMenuClick('settings')} 
              className={activeSection === 'settings' ? 'active' : ''}
            >
              Settings
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <Header />
        {activeSection === 'overview' && <Overview />}
        {activeSection === 'storage' && <Storage />}
        {activeSection === 'reports' && <Reports />}
        {activeSection === 'settings' && <Settings />}
      </main>
    </div>
  );
}

export default Sidebar;
