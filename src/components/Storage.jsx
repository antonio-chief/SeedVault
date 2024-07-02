import React from 'react';
import './storage.css';

function Storage() {
  return (
    <section id="storage" className="section" >
      <h1>Storage Information</h1>
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
    </section>
  );
}

export default Storage;
