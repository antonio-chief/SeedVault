import React, { useState } from 'react';
import './personalization.css';

const Personalization = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmitPersonalization = () => {
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="settings-content">
      <h2>Personalization</h2>
      <div className="personalization-section">
        <h3>Username</h3>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div className="personalization-section">
        <h3>Password</h3>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button onClick={handleSubmitPersonalization}>Submit</button>
    </div>
  );
};

export default Personalization;