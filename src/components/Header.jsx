import React from 'react';
import './header.css';

import bell from '../assets/icons/bell.png';
import calendar from '../assets/icons/calendar.png';
import user from '../assets/icons/user.png'

function Header() {
  return (
    <header className="header">
       <div className="logo">
        <img src="logo.png" alt="Logo" />
        <span>Seed Vault</span>
      </div>
      <div className="search">
        <input type="text" placeholder="Search for data & reports..." />
        <button><i className="fas fa-search"></i>Search</button>
      </div>
      <div className="user-profile">
        <div className="notifications">
          <i className="fas fa-bell"><img src={bell} alt='bell icon' /></i>
          <i className="fas fa-calendar"><img src={calendar} alt='bell icon' /></i>
          <i className="fas fa-cog"></i>
        </div>
        <img src={user} alt="User" />
        <span>John Doe</span>
      </div>
    </header>
  );
}

export default Header;

