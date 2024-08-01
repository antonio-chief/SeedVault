import React, { useState } from 'react';
import './settings.css';
import Personalization from './settings/Personalization';
import Preferences from './settings/Preferences';
import Privacy from './settings/Privacy';

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
        
      </div>

        {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'preferences' && (
          <div>
            
            <Preferences />
          </div>
        )}

        {activeTab === 'personalization' && (
          <div>
            
            {/* Add content for Security */}
            <Personalization />
          </div>
        )}

        {activeTab === 'privacy' && (
          <div>
            
            {/* Add content for Monitoring */}
            <Privacy />
          </div>
        )}
      </div>

      
    </section>
  );
}
export default Settings;
