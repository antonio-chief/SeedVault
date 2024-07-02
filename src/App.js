import axios from 'axios';
import React, { Component } from 'react';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
import Storage from './components/Storage';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Header from './components/Header';
import Help from './components/Help';
import FAQ from './components/FAQ';
import About from './components/About';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      activeSection: 'overview' // Initialize active section here
    };
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/seedvault/')
      .then(res => {
        const data = res.data;
        this.setState({ details: data });
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }

  render() {
    const { activeSection, details } = this.state;

    return (
      <div className="container">
        <Header />
        <div className="App-body">
          <Sidebar onMenuClick={section => this.setState({ activeSection: section })} />
          <main className="main-content">
            {activeSection === 'overview' && <Overview seeds={details} />}
            {activeSection === 'storage' && <Storage />}
            {activeSection === 'reports' && <Reports />}
            {activeSection === 'settings' && <Settings />}
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
