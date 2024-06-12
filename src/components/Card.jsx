import React from 'react';
import './card.css';

function Card({ title, value, unit }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-content">
        <h3>{value}</h3>
        {unit && <p>{unit}</p>}
      </div>
    </div>
  );
}

export default Card;
