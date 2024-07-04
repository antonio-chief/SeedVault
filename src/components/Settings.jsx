import React, { useState } from 'react';
import './settings.css';

function Settings() {

    const [activeTab, setActiveTab] = useState('preferences'); // State to manage active tab
  
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };

  return (
    <section id="settings" className="section">
      <div className="settings-content">
      </div>
      <h1>Settings</h1>
      <p>Manage your application settings here.</p>

            {/* Tabs Navigation */}
      <div className="tab-navigation">
        <button className={activeTab === 'preferences' ? 'active' : ''} onClick={() => handleTabClick('preferences')}>
          Preferences
        </button>
        <button className={activeTab === 'personalization' ? 'active' : ''} onClick={() => handleTabClick('personalization')}>
          Personalization
        </button>
        <button className={activeTab === 'privacy' ? 'active' : ''} onClick={() => handleTabClick('privacy')}>
          Privacy
        </button>
        <button className={activeTab === 'Help and support' ? 'active' : ''} onClick={() => handleTabClick('Help and Support')}>
          Help and Support
        </button>
      </div>

        {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'preferences' && (
          <div>
            <h2>Preferences</h2>
          
          </div>
        )}

        {activeTab === 'personalization' && (
          <div>
            <h2>Personalization</h2>
            {/* Add content for Security */}
          </div>
        )}

        {activeTab === 'privacy' && (
          <div>
            <h2>Privacy</h2>
            {/* Add content for Monitoring */}
          </div>
        )}

        {activeTab === 'Help and Support' && (
          <div>
            <h2>Help and Support</h2>
            {/* Add content for Recommendations */}
          </div>
        )}
      </div>

      
    </section>
  );
}
export default Settings;
