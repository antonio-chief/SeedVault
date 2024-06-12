// frontend/src/App.js
/*import React, { useEffect, useState } from 'react';
import { getYourModelData } from './services/api';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getYourModelData();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Data from Django API</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
*/
// App.js
import React from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Storage from './components/Storage';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="App-body">
        <Sidebar />
        <main className="App-content">
          <Overview />
          <Reports />
          <Settings />
          <Storage />
        </main>
      </div>
    </div>
  );
}

export default App;
