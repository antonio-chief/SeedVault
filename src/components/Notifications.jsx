import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchNotifications();

    // Simulate receiving new notifications
    const interval = setInterval(() => {
      fetchNotifications();
    }, 10000); // Fetch every 10 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8001/notifications/');
      setNotifications(response.data);
      if (response.data.length > 0) {
        setHasNewNotification(true);
        // Play sound for new notification
        // new Audio('/path/to/notification/sound.mp3').play(); TODO: ADD SOUND
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleResolve = async (id) => {
    try {
      await axios.post(`http://127.0.0.1:8001/notifications/${id}/resolve/`);
      fetchNotifications();
    } catch (error) {
      console.error('Error resolving notification:', error);
    }
  };

  const toggleDropdown = () => {
    console.log('Toggling dropdown');
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="notifications-dropdown" ref={dropdownRef}>
      <div className="notification-icon" onClick={toggleDropdown}>
        <span style={{ fontSize: '2em' }}>🔔</span>
        {hasNewNotification && <span className="red-dot active"></span>}
      </div>
      {isDropdownVisible && (
        <div className={`notifications-dropdown-content ${isDropdownVisible ? 'show' : ''}`}>
          {notifications.map((notification) => (
            <div key={notification.id} className="notification-item">
              <p>{notification.message}</p>
              <p><strong>Storage Facility:</strong> {notification.StorageFacility}</p>
              {notification.sensor_data && (
                <div>
                  <strong>Sensor Data:</strong>
                  <pre>{JSON.stringify(notification.sensor_data, null, 2)}</pre>
                </div>
              )}
              {notification.message.toLowerCase().includes('sensor') && (
                <button className="notification-resolve" onClick={() => handleResolve(notification.id)}>
                  Resolve
                </button>
              )}
            </div>
          ))}
          {notifications.length === 0 && <p>No notifications</p>}
        </div>
      )}
    </div>
  );
};

export default Notifications;
