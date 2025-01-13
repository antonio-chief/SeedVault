import React from 'react';
import './sidebar.css';

function Sidebar({ onMenuClick, activeSection }) {
  return (
    <aside className="sidebar">
      <nav className="menu">
        <ul>
          <li
            onClick={() => onMenuClick('overview')}
            className={activeSection === 'overview' ? 'active' : ''}
            id="dashboardBtn"
          >
            Dashboard
          </li>
          <li
            onClick={() => onMenuClick('settings')}
            className={activeSection === 'settings' ? 'active' : ''}
            id="settingsBtn"
          >
            Settings
          </li>
        </ul>
      </nav>
      <nav className="footer-menu">
        <ul>
          <li
            onClick={() => onMenuClick('help')}
            className={activeSection === 'help' ? 'active' : ''}
            id="helpBtn"
          >
            Help
          </li>
          <li
            onClick={() => onMenuClick('faq')}
            className={activeSection === 'faq' ? 'active' : ''}
            id="faqBtn"
          >
            FAQ
          </li>
          <li
            onClick={() => onMenuClick('about')}
            className={activeSection === 'about' ? 'active' : ''}
            id="aboutBtn"
          >
            About Us
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
