import React, { useState } from 'react';
import './userprofile.css'; // Add appropriate styling here
import defaultProfilePic from '../assets/icons/user.png';

const UserProfile = () => {
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [profilePic, setProfilePic] = useState(defaultProfilePic);
  const [username, setUsername] = useState('CurrentUsername');
  const [isEditingUsername, setIsEditingUsername] = useState(false);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePic(e.target.result);
        setIsEditingImage(false);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div className="user-profile">
      <div className="profile-pic-container">
        <img
          src={profilePic}
          alt="Profile"
          onClick={() => setIsEditingImage(true)}
          className="profile-pic"
        />
        {isEditingImage && (
          <div className="image-upload">
            <input type="file" onChange={handleImageChange} />
            <button onClick={() => setIsEditingImage(false)}>Cancel</button>
          </div>
        )}
      </div>
      <div className="username-container">
        <span className="username">
          {username}
        </span>
        <button onClick={() => setIsEditingUsername(!isEditingUsername)}>Edit</button>
        {isEditingUsername && (
          <div className="username-edit">
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Change username"
            />
            <input
              type="password"
              placeholder="Change password"
            />
            <button onClick={() => setIsEditingUsername(false)}>Save</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
