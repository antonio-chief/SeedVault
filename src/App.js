// frontend/src/App.js
import React, { Component } from 'react';
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
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seeds: [], // Initialize seeds in the state
      activeSection: 'overview', // Initialize active section here
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000')
      this.setState({ seeds: response.data });
    } catch (error) {
      console.error('Error fetching seed data:', error);
    }
  };

  render() {
    const { activeSection, seeds } = this.state; // Extract seeds from state

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
          </main>
        </div>
      </div>
    );
  }
}

export default App;
