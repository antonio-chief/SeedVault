import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [hasNewNotification, setHasNewNotification] = useState(false);

  useEffect(() => {
    fetchNotifications();

    // Simulate receiving new notifications
    const interval = setInterval(() => {
      fetchNotifications();
    }, 10000); // Fetch every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8001/notifications/');
      setNotifications(response.data);
      if (response.data.length > 0) {
        setHasNewNotification(true);
        // Play sound for new notification
        new Audio('/path/to/notification/sound.mp3').play();
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

  return (
    <div className="notifications-dropdown">
      <div className="notification-icon">
        <span>🔔</span>
        {hasNewNotification && <span className="red-dot active"></span>}
      </div>
      <div className="notifications-dropdown-content">
        {notifications.map((notification) => (
          <div key={notification.id} className="notification-item">
            <p>{notification.message}</p>
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
    </div>
  );
};

export default Notifications;
