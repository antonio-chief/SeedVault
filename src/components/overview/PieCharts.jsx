import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './piecharts.css';

const PieCharts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8001/seeds/'); // Adjust URL as needed
        setData(response.data);
      } catch (error) {
        console.error('Error fetching seeds data:', error);
      }
    };

    fetchData();
  }, []);

  const seedsData = data.map(item => ({
    name: item.seedType,
    value: item.quantity,
  }));

  const storageData = data.map(item => ({
    name: item.storageType,
    value: item.storageQuantity,
  }));

  const ageData = data.map(item => ({
    name: item.ageGroup,
    value: item.ageQuantity,
  }));

  const COLORS = ['#00C49F', '#FFBB28', '#FF8042']; // Adjust colors as needed

  return (
    <div className="pie-charts">
      <div className="chart-container">
        <h2>Seed Distribution</h2>
        {data.length === 0 ? (
          <p>No seed data available</p>
        ) : (
          <PieChart width={250} height={250}>
            <Pie
              data={seedsData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
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
        <h2>Storage Distribution</h2>
        {data.length === 0 ? (
          <p>No storage data available</p>
        ) : (
          <PieChart width={250} height={250}>
            <Pie
              data={storageData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {storageData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      </div>
      <div className="chart-container">
        <h2>Age Distribution</h2>
        {data.length === 0 ? (
          <p>No age data available</p>
        ) : (
          <PieChart width={250} height={250}>
            <Pie
              data={ageData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
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
    </div>
  );
};

export default PieCharts;
