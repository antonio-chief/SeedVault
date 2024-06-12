import React from 'react';
import './header.css';

function Header() {
  return (
    <header className="header">
       <div className="logo">
        <img src="logo.png" alt="Logo" />
        <span>Smart Storage</span>
      </div>
      <div className="search">
        <input type="text" placeholder="Search for data & reports..." />
        <button><i className="fas fa-search"></i>Search</button>
      </div>
      <div className="user-profile">
        <div className="notifications">
          <i className="fas fa-bell"></i>
          <i className="fas fa-envelope"></i>
          <i className="fas fa-cog"></i>
        </div>
        <img src="/user.jpg" alt="User" />
        <span>John Doe</span>
      </div>
    </header>
  );
}

export default Header;

