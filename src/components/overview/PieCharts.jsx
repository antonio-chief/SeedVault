import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import './piecharts.css';
import Events from './Events';
import Graph from './Graph'

const COLORS = ['#4CAF50', '#FF5722', '#FFC107', '#03A9F4'];

const PieCharts = () => {
  const [seedsData, setSeedsData] = useState(null);
  const [storageData, setStorageData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalsResponse = await axios.get('http://127.0.0.1:8001/totals/');
        const storageResponse = await axios.get('http://127.0.0.1:8001/storagefacilities/');
        
        setSeedsData(totalsResponse.data);
        setStorageData(storageResponse.data);
      } catch (error) {
        setError('Failed to fetch data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  const seedsPieData = seedsData ? [
    { name: 'Planted', value: seedsData.planted },
    { name: 'In Inventory', value: seedsData.in_inventory }
  ] : [];

  const storagePieData = storageData ? [
    { name: 'Used', value: storageData.used },
    { name: 'Free', value: storageData.free }
  ] : [];

  const agePieData = seedsData ? [
    { name: 'Older', value: seedsData.older },
    { name: 'Newer', value: seedsData.newer }
  ] : [];

  const renderPieChart = (data, title) => (
    <div className="pie-chart-container">
      <h3>{title}</h3>
      {data.length > 0 ? (
        <PieChart width={250} height={250}>
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
          {renderPieChart(seedsPieData, 'Seeds')}
          {renderPieChart(storagePieData, 'Storage')}
          {renderPieChart(agePieData, 'Older vs Newer Seeds')}
          <Events />
          <Graph />
        </>
      )}
      
    </div>
  );
};

export default PieCharts;
