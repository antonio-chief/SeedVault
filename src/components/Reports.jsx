import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import './reports.css';

const Reports = () => {
  const lineChartRef = useRef(null);
  const doughnutChartRef = useRef(null);
  const lineChartInstance = useRef(null);
  const doughnutChartInstance = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Mocking a fetch function from the database
    const fetchData = async () => {
      // Replace with your actual database fetching logic
      
        // Your actual database fetching logic goes here
        // Example using fetch API:
        // const response = await fetch('your-api-endpoint');
        // const data = await response.json();
        // return data;
      
        // Mocked data for demonstration
      return [];
    };

    fetchData().then(fetchedData => {
      setData(fetchedData);

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
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'My First dataset',
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(75,192,192,0.4)',
              hoverBorderColor: 'rgba(75,192,192,1)',
              data: data.length ? data : [null, null, null, null, null, null, null],
            },
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
          labels: ['Efficient', 'Inefficient'],
          datasets: [{
            data: data.length ? [70, 30] : [0, 0],
            backgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)']
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
  }, [data]);

  return (
    <div>
      <section id="reports" className="section">
        <h1>Reports</h1>
        <div className="reports">
          <div className="recent-reports">
            <h2>Recent Reports</h2>
            <canvas ref={lineChartRef} id="lineChart"></canvas>
            {data.length === 0 && <p>No seeds added</p>}
          </div>
          <div className="chart-by-percent">
            <h2>Distribution by Percentage</h2>
            <canvas ref={doughnutChartRef} id="doughnutChart"></canvas>
            {data.length === 0 && <p>No seeds added</p>}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reports;
