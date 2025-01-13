import React, { useState } from 'react';
import './personalization.css';
import defaultProfileImage from '../../assets/images/user.png';

const Personalization = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(defaultProfileImage);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitPersonalization = async () => {
    setError('');
    setSuccess('');
    try {
      const checkResponse = await fetch(`http://127.0.0.1:8001/user/check?username=${username}&password=${password}`);
      const checkData = await checkResponse.json();

      if (checkData.exists) {
        setError('Username or password already exists.');
        return;
      }

      const formData = new FormData();
      formData.append('UserName', username);
      formData.append('UserEmail', email);
      formData.append('UserPassword', password);
      if (profilePicture) {
        formData.append('ProfilePicture', profilePicture);
      }

      const response = await fetch('http://127.0.0.1:8001/user/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccess('Profile updated successfully');
      } else {
        setError('Failed to update profile');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while updating the profile.');
    }
  };

  return (
    <div className="settings-content">
      <h2>Personalization</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={(e) => { e.preventDefault(); handleSubmitPersonalization(); }}>
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
          <h3>Email</h3>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
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
        <div className="personalization-section">
          <h3>Profile Picture</h3>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
          <img src={profileImageUrl} alt="Profile" className="profile-image-preview" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Personalization;