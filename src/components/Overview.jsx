import React, { useEffect, useState } from 'react';
import { fetchSeeds } from '../services/api';
import Card from './Card';
import './overview.css';

function Overview() {
  const [seeds, setSeeds] = useState([]);

  useEffect(() => {
    const getSeeds = async () => {
      try {
        const data = await fetchSeeds();
        setSeeds(data);
      } catch (error) {
        console.error("Error fetching seeds data:", error);
      }
    };

    getSeeds();
  }, []);

  return (
    <section id="overview" className="section">
      <h1>Overview</h1>
      <div className="cards">
        {seeds.map((seed) => (
          <Card key={seed.id} title={seed.name} value={seed.quantity} unit="seeds" />
        ))}
      </div>
    </section>
  );
}

export default Overview;
