// frontend/src/components/Overview.jsx
import React, { useEffect, useState } from 'react';
import Card from './Card';
import './overview.css';

function Overview({ seeds }) {
  // No need for state and useEffect here since seeds are passed as props

  return (
    <section id="overview" className="section">
      <h1>Overview</h1>
      <div className="cards">
        {seeds.map((seed) => (
          <Card key={seed.SeedID} title={seed.SeedType} value={seed.SeedQuantity} unit="seeds" />
        ))}
      </div>
    </section>
  );
}

export default Overview;
