import React, { useState } from 'react';
import './userprofile.css'; // Add appropriate styling here
import defaultProfilePic from '../assets/icons/user.png';

const UserProfile = () => {
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [profilePic, setProfilePic] = useState(defaultProfilePic);
  const [username] = useState('John Doe');


  const handleImageChange = (event) => {
    setProfilePic(event.target.value);
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
        <div className="username">
          {username}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
