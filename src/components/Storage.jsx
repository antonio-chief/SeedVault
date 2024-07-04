import React, { useState } from 'react';
import './storage.css';

function Storage() {

  const [activeTab, setActiveTab] = useState('overview'); // State to manage active tab
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section id="storage" className="section" >
      <h1>Storage Information</h1>

                  {/* Tabs Navigation */}
                  <div className="tab-navigation">
        <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => handleTabClick('overview')}>
          Overview
        </button>
        <button className={activeTab === '2D view' ? 'active' : ''} onClick={() => handleTabClick('2D view')}>
          2D view
        </button>
        <button className={activeTab === '3D view' ? 'active' : ''} onClick={() => handleTabClick('3D view')}>
          3D view
        </button>
        
      </div>

        {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div>
            <h2>Overview</h2>
            <div className="storage-cards">
        <div className="storage-card">
          <h2>Storage Unit 1</h2>
          <p>Temperature: 18°C</p>
          <p>Humidity: 45%</p>
          <p>Seeds Stored: 5,000</p>
        </div>
        <div className="storage-card">
          <h2>Storage Unit 2</h2>
          <p>Temperature: 20°C</p>
          <p>Humidity: 50%</p>
          <p>Seeds Stored: 3,500</p>
        </div>
        <div className="storage-card">
          <h2>Storage Unit 3</h2>
          <p>Temperature: 16°C</p>
          <p>Humidity: 40%</p>
          <p>Seeds Stored: 7,200</p>
        </div>
      </div>
          </div>
        )}

        {activeTab === '2D view' && (
          <div>
            <h2>2D view</h2>
            {/* Add content for Security */}
          </div>
        )}

        {activeTab === '3D view' && (
          <div>
            <h2>3D view</h2>
            {/* Add content for Monitoring */}
          </div>
        )}

       
      </div>


    </section>
  );
}
export default Storage;
