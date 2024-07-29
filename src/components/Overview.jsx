import React, { useState, useEffect } from 'react';
import Card from './Card';
import AddNew from './overview/AddNew';
import PieCharts from './overview/PieCharts';
import Database from './overview/Database';
import Monitoring from './overview/monitoring/Monitoring';
import Security from './overview/security/Security';
import Feedback from './overview/recommendations/Feedback'
import axios from 'axios';
import './overview.css';

const Overview = () => {
  const [seeds, setSeeds] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchSeedsData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8001/seeds/');//TODO: change to the port to your django port
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
            <div className="cards">
              <AddNew /> 
              {seeds.length > 0 ? (
                seeds.map((seed) => (
                  <Card key={seed.SeedID} title={seed.SeedType} value={seed.SeedQuantity} unit="seeds" />
                ))
              ) : (
                <p>No seeds data available.</p>
              )}
              
            </div>
            <PieCharts />
            <div>
              <Database />
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div>
            {/* Add content for Security */}
            <Security />
          </div>
        )}

        {activeTab === 'monitoring' && (
          <div>
            {/* Add content for Monitoring */}
            <Monitoring />
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div>
            <h2>Recommendations and Feedback</h2>
            {/* Add content for Recommendations */}
            <Feedback />
          </div>
        )}
      </div>
    </section>
  );
};

export default Overview;
