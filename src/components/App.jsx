import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Overview from './components/Overview';
import Storage from './components/Storage';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Header from './components/Header';
import Help from './components/Help';
import FAQ from './components/FAQ';
import About from './components/About';
import './app.css';

function App() {
  const [activeSection, setActiveSection] = useState('overview');

  const handleMenuClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="container">
      <Sidebar onMenuClick={handleMenuClick} />
      <main className="main-content">
        <Header />
        {activeSection === 'overview' && <Overview />}
        {activeSection === 'storage' && <Storage />}
        {activeSection === 'reports' && <Reports />}
        {activeSection === 'settings' && <Settings />}
        {activeSection === 'help' && <Help />}
        {activeSection === 'faq' && <FAQ />}
        {activeSection === 'about' && <About />}
      </main>
    </div>
  );
}

export default App;
