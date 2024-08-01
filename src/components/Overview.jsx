import React, { useState } from 'react';
import AddNew from './overview/AddNew';
import PieCharts from './overview/PieCharts';
import Database from './overview/Database';
import Monitoring from './overview/monitoring/Monitoring';
import Security from './overview/security/Security';
import Feedback from './overview/recommendations/Feedback'
import './overview.css';

import GraphComponent from './overview/GraphComponent';
import CardsComponent from './CardsComponent';


const Overview = () => {
  const [activeTab, setActiveTab] = useState('overview');

 //'http://127.0.0.1:8001/seeds/'     TODO: change to the port to your django port

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
              <CardsComponent/>
            </div>
            <PieCharts />
            <GraphComponent />
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
