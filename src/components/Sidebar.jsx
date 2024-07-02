// frontend/src/components/Sidebar.jsx
import React from 'react';

function Sidebar({ onMenuClick }) {
  return (
    <nav className="sidebar">
      <ul>
        <li onClick={() => onMenuClick('overview')}>Overview</li>
        <li onClick={() => onMenuClick('storage')}>Storage</li>
        <li onClick={() => onMenuClick('reports')}>Reports</li>
        <li onClick={() => onMenuClick('settings')}>Settings</li>
        <li onClick={() => onMenuClick('help')}>Help</li>
        <li onClick={() => onMenuClick('faq')}>FAQ</li>
        <li onClick={() => onMenuClick('about')}>About</li>
      </ul>
    </nav>
  );
}

export default Sidebar;
