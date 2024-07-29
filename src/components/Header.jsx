import React, { useState, useEffect, useRef } from 'react';
import './header.css';
import Notifications from './Notifications';

//import bell from '../assets/icons/bell.png';
import calendar from '../assets/icons/calendar.png';
import user from '../assets/icons/user.png';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        clearHighlights();
        setSearchResults([]);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const results = searchAndHighlight(searchQuery);
    if (results.length === 0) {
      setSearchResults(['No match found in this page, try in other pages or tabs']);
      alert('No match found in this page, try in other pages or tabs');
    } else {
      setSearchResults(results);
    }
  };

  const searchAndHighlight = (query) => {
    clearHighlights();
    if (!query) return [];

    const elements = document.querySelectorAll('*:not(script):not(style):not(input):not(button)');
    const results = [];

    elements.forEach((element) => {
      if (element.children.length === 0 && element.textContent.toLowerCase().includes(query.toLowerCase())) {
        results.push(element.textContent);
        highlightText(element, query);
      }
    });

    return results;
  };

  const highlightText = (element, query) => {
    const innerHTML = element.innerHTML;
    const regex = new RegExp(`(${query})`, 'gi');
    const newHTML = innerHTML.replace(regex, '<mark>$1</mark>');
    element.innerHTML = newHTML;
  };

  const clearHighlights = () => {
    const marks = document.querySelectorAll('mark');
    marks.forEach((mark) => {
      const parent = mark.parentNode;
      parent.replaceChild(document.createTextNode(mark.textContent), mark);
      parent.normalize();
    });
  };

  const handleResultClick = (result) => {
    const elements = document.querySelectorAll('*:not(script):not(style):not(input):not(button)');
    for (let element of elements) {
      if (element.textContent.includes(result)) {
        element.scrollIntoView({ behavior: 'smooth' });
        break;
      }
    }
  };

  return (
    <header className="header" ref={searchRef}>
      <div className="logo">
        <img src="logo.png" alt="Logo" />
        <span>Seed Vault</span>
      </div>
      <form className="search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for data & reports..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button type="submit">
          <i className="fas fa-search"></i> Search
        </button>
      </form>
      {searchQuery && (
        <div className="dropdown">
          {searchResults.map((result, index) => (
            <div key={index} className="dropdown-item" onClick={() => handleResultClick(result)}>
              {result}
            </div>
          ))}
        </div>
      )}
      <div className="user-profile">
        <Notifications />
        <div className="notifications">
          <i className="fas fa-bell"></i>
          <i className="fas fa-calendar"><img src={calendar} alt="calendar icon" /></i>
          <i className="fas fa-cog"></i>
        </div>
        <img src={user} alt="User" />
        <span>John Doe</span>
      </div>
    </header>
  );
}

export default Header;
