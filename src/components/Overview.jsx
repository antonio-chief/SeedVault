import React, { useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';
import './overview.css';

const Overview = () => {
  const [seeds, setSeeds] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchSeedsData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8002/seeds/');//TODO: change to the port to your django port
        setSeeds(response.data);
      } catch (error) {
        console.error('Error fetching seeds data:', error);
        setSeeds([]);
      }
    };

    fetchSeedsData();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section id="overview" className="section">
      <h1>Dashboard</h1>

      {/* Tabs Navigation */}
      <div className="tab-navigation">
        <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => handleTabClick('overview')}>
          Overview
        </button>
        <button className={activeTab === 'security' ? 'active' : ''} onClick={() => handleTabClick('security')}>
          Security
        </button>
        <button className={activeTab === 'monitoring' ? 'active' : ''} onClick={() => handleTabClick('monitoring')}>
          Monitoring
        </button>
        <button className={activeTab === 'recommendations' ? 'active' : ''} onClick={() => handleTabClick('recommendations')}>
          Recommendations
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div>
            <h2>Overview</h2>
            <div className="cards">
              {seeds.length > 0 ? (
                seeds.map((seed) => (
                  <Card key={seed.SeedID} title={seed.SeedType} value={seed.SeedQuantity} unit="seeds" />
                ))
              ) : (
                <p>No seeds data available.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div>
            <h2>Security Content</h2>
            {/* Add content for Security */}
          </div>
        )}

        {activeTab === 'monitoring' && (
          <div>
            <h2>Monitoring Content</h2>
            {/* Add content for Monitoring */}
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div>
            <h2>Recommendations Content</h2>
            {/* Add content for Recommendations */}
          </div>
        )}
      </div>
    </section>
  );
};

export default Overview;
