import React, { useState } from 'react';
import './preferences.css';

const Preferences = ({ toggleDarkMode }) => {
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('UTC');
  const [currency, setCurrency] = useState('USD');
  const [notifications, setNotifications] = useState(false);
  const [alarm, setAlarm] = useState(false);

  const handleLanguageChange = (event) => setLanguage(event.target.value);
  const handleTimezoneChange = (event) => setTimezone(event.target.value);
  const handleCurrencyChange = (event) => setCurrency(event.target.value);
  const handleNotificationsChange = () => setNotifications(!notifications);
  const handleAlarmChange = () => setAlarm(!alarm);

  return (
    <div className="settings-content">
      <h2>Preferences</h2>
      <div className="preference-section">
        <h3>Theme</h3>
        <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
      </div>
      <div className="preference-section">
        <h3>Language</h3>
        <select value={language} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>
      <div className="preference-section">
        <h3>Time Zone</h3>
        <select value={timezone} onChange={handleTimezoneChange}>
          <option value="UTC">UTC</option>
          <option value="America/New_York">America/New York</option>
          <option value="Europe/London">Europe/London</option>
          <option value="Asia/Tokyo">Asia/Tokyo</option>
        </select>
      </div>
      <div className="preference-section">
        <h3>Currency</h3>
        <select value={currency} onChange={handleCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
        </select>
      </div>
      <div className="preference-section">
        <h3>Notifications</h3>
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={handleNotificationsChange}
          />
          Enable Notifications
        </label>
      </div>
      <div className="preference-section">
        <h3>Alarm</h3>
        <label>
          <input
            type="checkbox"
            checked={alarm}
            onChange={handleAlarmChange}
          />
          Enable Alarm
        </label>
      </div>
    </div>
  );
};

export default Preferences;