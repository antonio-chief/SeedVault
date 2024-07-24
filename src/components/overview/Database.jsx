import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './database.css';

const Database = () => {
  const [seeds, setSeedsData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8001/seeds/');
        setSeedsData(response.data);
      } catch (error) {
        setError('Failed to fetch data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="database-container">
      <h2>My Data</h2>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Category</th>
                <th>Type</th>
                <th>Name</th>
                <th>Planting Date</th>
                <th>Buying Date</th>
                <th>Expiry Date</th>
                <th>Additional Info</th>
              </tr>
            </thead>
            <tbody>
              {seeds.map((seed) => (
                <tr key={seed.SeedID}>
                  <td>{seed.SeedID}</td>
                  <td>{seed.SeedCategory}</td>
                  <td>{seed.SeedType}</td>
                  <td>{seed.SeedName}</td>
                  <td>{seed.PlantingDate}</td>
                  <td>{seed.DateBought}</td>
                  <td>{seed.ExpiryDate}</td>
                  <td>{seed.SeedQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Database;
