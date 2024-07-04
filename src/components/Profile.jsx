import React, { useState } from 'react';
import './profile.css'

function Profile() {

    const [activeTab, setActiveTab] = useState('user'); // State to manage active tab
  
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };

  return (
    <section id="settings" className="section">
      <div className="settings-content">
      </div>
      <h1>Profile</h1>
      <p>Manage your profile here.</p>

            {/* Tabs Navigation */}
      <div className="tab-navigation">
        <button className={activeTab === 'user' ? 'active' : ''} onClick={() => handleTabClick('user')}>
          User
        </button>
        <button className={activeTab === 'account management' ? 'active' : ''} onClick={() => handleTabClick('account management')}>
          Account Management
        </button>
        <button className={activeTab === 'data' ? 'active' : ''} onClick={() => handleTabClick('data')}>
          All Data
        </button>
        
      </div>

        {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'user' && (
          <div>
            <h2>User</h2>
            <div className="cards">
              
            </div>
          </div>
        )}

        {activeTab === 'account management' && (
          <div>
            <h2>Account Management</h2>
            {/* Add content for Security */}
          </div>
        )}

        {activeTab === 'data' && (
          <div>
            <h2>All Data</h2>
            {/* Add content for Monitoring */}
          </div>
        )}

       
      </div>

      
    </section>
  )
}

export default Profile