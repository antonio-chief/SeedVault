import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './monitoring.css';

const Monitoring = () => {
  const [combinedData, setCombinedData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const seedsResponse = await axios.get('http://127.0.0.1:8002/seeds');
        const monitoringResponse = await axios.get('http://127.0.0.1:8002/monitoring');
        const storageResponse = await axios.get('http://127.0.0.1:8002/storage');

        const seedsData = seedsResponse.data;
        const monitoringData = monitoringResponse.data;
        const storageData = storageResponse.data;

        const combined = seedsData.map(seed => {
          const monitoring = monitoringData.find(m => m.SeedID === seed.SeedID);
          const storage = storageData.find(s => s.SeedID === seed.SeedID);
          return {
            ...seed,
            monitoring: monitoring || {},
            storage: storage || {},
          };
        });

        setCombinedData(combined);
      } catch (error) {
        setError('Failed to fetch data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  const getStatus = (value, optimal, lowLimit, highLimit) => {
    if (value === undefined || optimal === undefined || lowLimit === undefined || highLimit === undefined) {
      return { status: 'unknown', icon: '', color: 'gray' };
    }
    if (value === optimal) {
      return { status: 'optimal', icon: '✔️', color: 'green' };
    } else if (value < lowLimit) {
      return { status: 'low', icon: '🔻', color: 'red' };
    } else if (value > highLimit) {
      return { status: 'high', icon: '🔺', color: 'red' };
    } else {
      return { status: 'normal', icon: '', color: 'black' };
    }
  };

  const handleImageUpload = (event, seedId) => {
    const file = event.target.files[0];
    const updatedCombinedData = combinedData.map(seed => 
      seed.SeedID === seedId ? { ...seed, image: URL.createObjectURL(file) } : seed
    );
    setCombinedData(updatedCombinedData);
  };

  return (
    <div className="monitoring-container">
      {combinedData.length === 0 && (
        <div className="no-data">
          <p>No seed data added or available.</p>
        </div>
      )}
      {combinedData.slice().reverse().map(seedData => {
        const { monitoring, storage } = seedData;
        if (!monitoring.CurrentTemperature && !monitoring.CurrentDampness && !monitoring.CurrentLight) {
          return null;
        }

        const temperatureStatus = getStatus(monitoring.CurrentTemperature, monitoring.OptimalTemperature, monitoring.LowTemperatureLimit, monitoring.HighTemperatureLimit);
        const humidityStatus = getStatus(monitoring.CurrentDampness, monitoring.OptimalDampness, monitoring.LowDampnessLimit, monitoring.HighDampnessLimit);
        const lightIntensityStatus = getStatus(monitoring.CurrentLight, monitoring.OptimalLight, monitoring.LowLightLimit, monitoring.HighLightLimit);

        return (
          <div className="monitoring-card" key={seedData.SeedID}>
            <div className="image-section">
              {seedData.image ? <img src={seedData.image} alt="Seed" /> : <span>No Image</span>}
              <input type="file" accept="image/*" onChange={(event) => handleImageUpload(event, seedData.SeedID)} />
            </div>
            <div className="analytics-section">
              <div className="analytics-item">
                <span>Temperature: {temperatureStatus.status}</span>
                <span style={{ color: temperatureStatus.color }}>{temperatureStatus.icon}</span>
              </div>
              <div className="analytics-item">
                <span>Humidity: {humidityStatus.status}</span>
                <span style={{ color: humidityStatus.color }}>{humidityStatus.icon}</span>
              </div>
              <div className="analytics-item">
                <span>Light Intensity: {lightIntensityStatus.status}</span>
                <span style={{ color: lightIntensityStatus.color }}>{lightIntensityStatus.icon}</span>
              </div>
            </div>
            <div className="details-section">
              <p>Planting Date: {seedData.PlantingDate || '-'}</p>
              <p>Buying Date: {seedData.DateBought || '-'}</p>
              <p>Expiry Date: {seedData.ExpiryDate || '-'}</p>
              <p>Storage Facility: {storage.WarehouseName || storage.VaultName || storage.SeedBankName || '-'}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Monitoring;
