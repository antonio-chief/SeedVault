import React from 'react';
import './settings.css';

function Settings() {
  return (
    <section id="settings" className="section" style={{ display: 'none' }}>
      <h1>Settings</h1>
      <div className="settings-content">
        <p>Manage your application settings here.</p>
        <ul>
          <li>Profile Settings</li>
          <li>Account Settings</li>
          <li>Notification Settings</li>
        </ul>
      </div>
    </section>
  );
}

export default Settings;
