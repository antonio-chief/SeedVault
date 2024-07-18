import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import './piecharts.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieCharts = () => {
  const [seedsData, setSeedsData] = useState(null);
  const [storageData, setStorageData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch totals data
        const totalsResponse = await axios.get('http://127.0.0.1:8002/totals/');
        // Fetch storage facilities data
        const storageResponse = await axios.get('http://127.0.0.1:8002/storagefacilities/');
        
        setSeedsData(totalsResponse.data);
        setStorageData(storageResponse.data);
      } catch (error) {
        setError('Failed to fetch data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  // Prepare data for pie charts
  const seedsPieData = seedsData ? [
    { name: 'Planted', value: seedsData.planted },
    { name: 'In Inventory', value: seedsData.in_inventory }
  ] : [];

  const storagePieData = storageData ? [
    { name: 'Used', value: storageData.used },
    { name: 'Free', value: storageData.free }
  ] : [];

  const agePieData = seedsData ? [
    { name: 'Older Seeds', value: seedsData.older },
    { name: 'Newer Seeds', value: seedsData.newer }
  ] : [];

  // Function to render Pie Chart
  const renderPieChart = (data, title) => (
    <div className="pie-chart-container">
      <h3>{title}</h3>
      {data.length > 0 ? (
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );

  return (
    <div className="pie-charts">
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          {renderPieChart(seedsPieData, 'Seeds Planted vs Inventory')}
          {renderPieChart(storagePieData, 'Storage Used vs Free')}
          {renderPieChart(agePieData, 'Older Seeds vs Newer Seeds')}
        </>
      )}
    </div>
  );
};

export default PieCharts;
