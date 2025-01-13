import React, { useEffect, useState } from 'react';
import './userprofile.css'; // Add appropriate styling here
import axios from 'axios';
import defaultProfileImage from '../assets/images/user.png'; // Import the default profile image

const UserProfile = () => {
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState(defaultProfileImage); // Set default profile image
  const [isLoggedIn, setIsLoggedIn] = useState(false);

//TODO: solve login username error in fetching user data

  useEffect(() => {
    const fetchUserData = async () => {
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};
      if (loggedInUser) {
        try {
          const response = await axios.get(`http://127.0.0.1:8001/user/${loggedInUser.UserID}`);
          if (response.status === 200) {
            const user = response.data;
            if (user && user.UserID === loggedInUser.UserID) {
              setUsername(user.UserName);
              setIsLoggedIn(true);
              // If user has a profile image, set it
              if (user.ProfileImage) {
                setProfileImage(user.ProfileImage);
              }
            } else {
              alert('User data not found');
            }
          } else {
            alert('Error fetching user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          alert('An error occurred while fetching user data');
        }
      } else {
        window.location.href = 'login.html'; // Redirect to login page if not logged in
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html'; // Redirect to login page
  };

  return (
    <div className="user-profile">
      <div className="username-container">
        <img src={profileImage} alt="Profile" className="profile-image" /> {/* Add profile image */}
        <div className="username">
          {username}
        </div>
      </div>
      <button id="logoutButton" onClick={handleLogout}>
        {isLoggedIn ? 'Logout' : 'Sign In'}
      </button>
    </div>
  );
};

export default UserProfile;
