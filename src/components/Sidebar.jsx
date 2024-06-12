import React from 'react';
import './sidebar.css';

function Sidebar({ onMenuClick }) {
  return (
    <aside className="sidebar">
      <nav className="menu">
        <ul>
          <li onClick={() => onMenuClick('overview')} className="active" id="dashboardBtn">Dashboard</li>
          <li onClick={() => onMenuClick('storage')} id="storageBtn">Storage</li>
          <li onClick={() => onMenuClick('reports')} id="reportsBtn">Reports</li>
          <li onClick={() => onMenuClick('settings')} id="settingsBtn">Settings</li>
        </ul>
      </nav>
      <nav className="footer-menu">
        <ul>
          <li onClick={() => onMenuClick('help')} id="helpBtn">Help</li>
          <li onClick={() => onMenuClick('faq')} id="faqBtn">FAQ</li>
          <li onClick={() => onMenuClick('about')} id="aboutBtn">About Us</li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
