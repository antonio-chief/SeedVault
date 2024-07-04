//App.js
import React, { Component } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
import Storage from './components/Storage';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Profile from './components/Profile';
import Header from './components/Header';
import Help from './components/Help';
import FAQ from './components/FAQ';
import About from './components/About';
import { fetchSeeds, fetchMonitoring } from './services/api'; // Import your new API functions
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      seeds: [], // Initialize seeds in the state
      activeSection: 'overview', // Initialize active section here
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    try {
      // Fetch data from APIs
      const seedsData = await fetchSeeds();
      const monitoringData = await fetchMonitoring();

      // Update state with fetched data
      this.setState({
        seeds: seedsData,
        monitoring: monitoringData,
      });

      // Fetch initial details data
      const res = await axios.get('http://127.0.0.1:8000/seeds/');
      const data = res.data;
      this.setState({ details: data });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  render() {
    const { activeSection, details, seeds } = this.state; // Extract seeds from state

    return (
      <div className="container">
        <Header />
        <div className="App-body">
          <Sidebar
            activeSection={activeSection}
            onMenuClick={(section) => this.setState({ activeSection: section })}
          />
          <main className="main-content">
            {/* Render Overview component with seeds data */}
            {activeSection === 'overview' && <Overview seeds={seeds} />}

            {/* Render other components based on active section */}
            {activeSection === 'storage' && <Storage />}
            {activeSection === 'reports' && <Reports />}
            {activeSection === 'settings' && <Settings />}
            {activeSection === 'profile' && <Profile />}
            {activeSection === 'help' && <Help />}
            {activeSection === 'faq' && <FAQ />}
            {activeSection === 'about' && <About />}

            {/* Render details data */}
            {details.map((output, id) => (
              <div key={id}>{output}</div>
            ))}
          </main>
        </div>
      </div>
    );
  }
}

export default App;
