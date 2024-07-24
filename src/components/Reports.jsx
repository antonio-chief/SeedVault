import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import './reports.css';

const Reports = () => {
  const lineChartRef = useRef(null);
  const doughnutChartRef = useRef(null);
  const lineChartInstance = useRef(null);
  const doughnutChartInstance = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8001/monitoring/');//TODO: Change port according to your django default
        return response.data;
      } catch (error) {
        console.error("Error fetching monitoring data:", error);
        return [];
      }
    };

    const calculatePercentage = (current, optimal, low, high) => {
      const currentVal = parseFloat(current);
      const optimalVal = parseFloat(optimal);
      const lowVal = parseFloat(low);
      const highVal = parseFloat(high);
      if (currentVal >= lowVal && currentVal <= highVal) {
        const range = highVal - lowVal;
        const diff = Math.abs(currentVal - optimalVal);
        return ((range - diff) / range) * 100;
      }
      return 0;
    };

    fetchData().then(fetchedData => {
      const processedData = fetchedData.map(item => ({
        ...item,
        temperaturePercentage: calculatePercentage(item.CurrentTemperature, item.OptimalTemperature, item.LowTemperatureLimit, item.HighTemperatureLimit),
        dampnessPercentage: calculatePercentage(item.CurrentDampness, item.OptimalDampness, item.LowDampnessLimit, item.HighDampnessLimit),
        lightPercentage: calculatePercentage(item.CurrentLight, item.OptimalLight, item.LowLightLimit, item.HighLightLimit)
      }));

      setData(processedData);

      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
      }
      if (doughnutChartInstance.current) {
        doughnutChartInstance.current.destroy();
      }

      const lineCtx = lineChartRef.current.getContext('2d');
      lineChartInstance.current = new Chart(lineCtx, {
        type: 'line',
        data: {
          labels: processedData.map(item => item.SeedID),
          datasets: [
            {
              label: 'Temperature (%)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(75,192,192,0.4)',
              hoverBorderColor: 'rgba(75,192,192,1)',
              data: processedData.map(item => item.temperaturePercentage),
            },
            {
              label: 'Dampness (%)',
              backgroundColor: 'rgba(255,206,86,0.2)',
              borderColor: 'rgba(255,206,86,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,206,86,0.4)',
              hoverBorderColor: 'rgba(255,206,86,1)',
              data: processedData.map(item => item.dampnessPercentage),
            },
            {
              label: 'Light Exposure (%)',
              backgroundColor: 'rgba(153,102,255,0.2)',
              borderColor: 'rgba(153,102,255,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(153,102,255,0.4)',
              hoverBorderColor: 'rgba(153,102,255,1)',
              data: processedData.map(item => item.lightPercentage),
            }
          ],
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      const doughnutCtx = doughnutChartRef.current.getContext('2d');
      doughnutChartInstance.current = new Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
          labels: ['Temperature (%)', 'Dampness (%)', 'Light Exposure (%)'],
          datasets: [{
            data: [
              processedData.reduce((sum, item) => sum + item.temperaturePercentage, 0) / processedData.length || 0,
              processedData.reduce((sum, item) => sum + item.dampnessPercentage, 0) / processedData.length || 0,
              processedData.reduce((sum, item) => sum + item.lightPercentage, 0) / processedData.length || 0
            ],
            backgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)', 'rgba(153, 102, 255, 1)']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        }
      });
    });

    return () => {
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
      }
      if (doughnutChartInstance.current) {
        doughnutChartInstance.current.destroy();
      }
    };
  }, []);

  const [activeTab, setActiveTab] = useState('reports'); // State to manage active tab

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <section id="reports" className="section">
        <h1>Reports</h1>

        {/* Tabs Navigation */}
        <div className="tab-navigation">
          <button className={activeTab === 'reports' ? 'active' : ''} onClick={() => handleTabClick('reports')}>
            Reports
          </button>
          <button className={activeTab === 'temperature' ? 'active' : ''} onClick={() => handleTabClick('temperature')}>
            Temperature
          </button>
          <button className={activeTab === 'light' ? 'active' : ''} onClick={() => handleTabClick('light')}>
            Light Exposure
          </button>
          <button className={activeTab === 'moisture' ? 'active' : ''} onClick={() => handleTabClick('moisture')}>
            Moisture
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'reports' && (
            <div>
              <h2>Reports</h2>
              <div className="reports">
                <div className="recent-reports">
                  <h2>Recent Reports</h2>
                  <canvas ref={lineChartRef} id="lineChart"></canvas>
                  {data.length === 0 && <p>No monitoring data available</p>}
                </div>
                <div className="chart-by-percent">
                  <h2>Distribution by Percentage</h2>
                  <canvas ref={doughnutChartRef} id="doughnutChart"></canvas>
                  {data.length === 0 && <p>No monitoring data available</p>}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'temperature' && (
            <div>
              <h2>Temperature</h2>
              {/* Add content for Temperature tab */}
            </div>
          )}

          {activeTab === 'light' && (
            <div>
              <h2>Light Exposure</h2>
              {/* Add content for Light Exposure tab */}
            </div>
          )}

          {activeTab === 'moisture' && (
            <div>
              <h2>Moisture</h2>
              {/* Add content for Moisture tab */}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Reports;
