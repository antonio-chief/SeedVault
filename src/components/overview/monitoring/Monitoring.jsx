import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './monitoring.css';

const Monitoring = () => {
  const [seedsData, setSeedsData] = useState([]);
  const [monitoringData, setMonitoringData] = useState([]);
  const [storageData, setStorageData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSeedsData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8001/seeds/');
        setSeedsData(response.data);
      } catch (error) {
        setError('Failed to fetch seeds data. Please try again later.');
      }
    };

    const fetchMonitoringData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8001/monitoring/');
        setMonitoringData(response.data);
      } catch (error) {
        setError('Failed to fetch monitoring data. Please try again later.');
      }
    };

    const fetchStorageData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8001/storage/');
        setStorageData(response.data);
      } catch (error) {
        setError('Failed to fetch storage data. Please try again later.');
      }
    };

    fetchSeedsData();
    fetchMonitoringData();
    fetchStorageData();
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

  const handleImageUpload = (event, seedID) => {
    const file = event.target.files[0];
    const updatedSeedsData = seedsData.map(seed => 
      seed.SeedID === seedID ? { ...seed, image: URL.createObjectURL(file) } : seed
    );
    setSeedsData(updatedSeedsData);
  };

  return (
    <div className="monitoring-container">
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      {seedsData.length === 0 && monitoringData.length === 0 && storageData.length === 0 && (
        <div className="no-data">
          <p>No seed data added or available.</p>
        </div>
      )}
      {seedsData.slice().reverse().map(seed => {
        const monitoring = monitoringData.find(m => m.SeedID === seed.SeedID) || {};
        const storage = storageData.find(s => s.SeedID === seed.SeedID) || {};

        if (!monitoring.CurrentTemperature && !monitoring.CurrentDampness && !monitoring.CurrentLight) {
          return null;
        }

        const temperatureStatus = getStatus(
          parseFloat(monitoring.CurrentTemperature),
          parseFloat(monitoring.OptimalTemperature),
          parseFloat(monitoring.LowTemperatureLimit),
          parseFloat(monitoring.HighTemperatureLimit)
        );
        const humidityStatus = getStatus(
          monitoring.CurrentDampness,
          monitoring.OptimalDampness,
          monitoring.LowDampnessLimit,
          monitoring.HighDampnessLimit
        );
        const lightIntensityStatus = getStatus(
          monitoring.CurrentLight,
          monitoring.OptimalLight,
          monitoring.LowLightLimit,
          monitoring.HighLightLimit
        );

        return (
          <div className="monitoring-card" key={seed.SeedID}>
            <div className="image-section">
              {seed.image ? <img src={seed.image} alt="Seed" /> : <span>No Image</span>}
              <input type="file" accept="image/*" onChange={(event) => handleImageUpload(event, seed.SeedID)} />
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
              <p>Planting Date: {seed.PlantingDate || '-'}</p>
              <p>Buying Date: {seed.DateBought || '-'}</p>
              <p>Expiry Date: {seed.ExpiryDate || '-'}</p>
              <p>Storage Facility: {storage.WarehouseName || storage.VaultName || storage.SeedBankName || '-'}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Monitoring;
