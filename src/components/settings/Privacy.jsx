import React, { useState } from 'react';
import './privacy.css';

const Privacy = () => {
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [dataVisibility, setDataVisibility] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const toggleProfileVisibility = () => setProfileVisibility(!profileVisibility);
  const toggleDataVisibility = () => setDataVisibility(!dataVisibility);
  const handlePaymentMethodChange = (event) => setPaymentMethod(event.target.value);

  return (
    <div className="settings-content">
      <h2>Privacy</h2>
      <div className="privacy-section">
        <h3>Profile Visibility</h3>
        <button onClick={toggleProfileVisibility}>
          {profileVisibility ? 'On' : 'Off'}
        </button>
      </div>
      <div className="privacy-section">
        <h3>Data Visibility</h3>
        <button onClick={toggleDataVisibility}>
          {dataVisibility ? 'On' : 'Off'}
        </button>
      </div>
      <div className="privacy-section">
        <h3>Subscription Options</h3>
        <button>Manage Subscription</button>
        <h4>Payment Method</h4>
        <select value={paymentMethod} onChange={handlePaymentMethodChange}>
          <option value="Credit Card">Credit Card</option>
          <option value="PayPal">PayPal</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>
      </div>
      <div className="privacy-section">
        <h3>Billing History</h3>
        <button>View Billing History</button>
      </div>
    </div>
  );
};

export default Privacy;