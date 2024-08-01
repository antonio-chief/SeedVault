import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './piecharts.css';
import Events from './Events';


const PieCharts = () => {
  const [totalsData, setTotalsData] = useState({});
  const [storageData, setStorageData] = useState({});

  useEffect(() => {
    const fetchTotalsData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8001/totals/'); // Adjust URL as needed
        setTotalsData(response.data);
      } catch (error) {
        console.error('Error fetching totals data:', error);
      }
    };

    const fetchStorageData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8001/storagefacilities/'); // Adjust URL as needed
        setStorageData(response.data);
      } catch (error) {
        console.error('Error fetching storage data:', error);
      }
    };

    fetchTotalsData();
    fetchStorageData();
  }, []);

  const seedsData = [
    { name: 'Planted', value: totalsData.planted || 0 },
    { name: 'In Inventory', value: totalsData.in_inventory || 0 }
  ];

  const ageData = [
    { name: 'Older Seeds', value: totalsData.older || 0 },
    { name: 'Newer Seeds', value: totalsData.newer || 0 }
  ];

  const storageDataChart = [
    { name: 'Storage Used', value: storageData.used || 0 },
    { name: 'Storage Free', value: storageData.free || 0 }
  ];

  const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE'];

  return (
    <div className="pie-charts">
      <div className="chart-container">
        <h2>Seeds Planted vs Seeds in Inventory</h2>
        {Object.keys(totalsData).length === 0 ? (
          <p>No seed data available</p>
        ) : (
          <PieChart width={250} height={250}>
            <Pie
              data={seedsData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {seedsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      </div>
      <div className="chart-container">
        <h2>Older Seeds vs Newer Seeds</h2>
        {Object.keys(totalsData).length === 0 ? (
          <p>No age data available</p>
        ) : (
          <PieChart width={250} height={250}>
            <Pie
              data={ageData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {ageData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      </div>
      <div className="chart-container">
        <h2>Storage Used vs Storage Free</h2>
        {Object.keys(storageData).length === 0 ? (
          <p>No storage data available</p>
        ) : (
          <PieChart width={250} height={250}>
            <Pie
              data={storageDataChart}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {storageDataChart.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
       
      </div>
      <Events />
    </div>
  );
};

export default PieCharts;
