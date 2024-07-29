import React, { useState } from 'react';
import './profilecode.css';

const ProfileCode = () => {
  const [profilePic, setProfilePic] = useState('default-pic.jpg');
  const [bio, setBio] = useState('');
  const [links, setLinks] = useState([]);
  const [linkInput, setLinkInput] = useState('');

  const loadFile = (event) => {
    const output = URL.createObjectURL(event.target.files[0]);
    setProfilePic(output);
    URL.revokeObjectURL(output); // free memory
  };

  const addLink = () => {
    if (linkInput) {
      setLinks([...links, linkInput]);
      setLinkInput('');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <input type="file" id="profilePicInput" onChange={loadFile} />
        <img id="profilePic" src={profilePic} alt="Profile" />
      </div>
      <div className="profile-content">
        <textarea
          id="bio"
          placeholder="Write about yourself..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <div className="links">
          <input
            type="text"
            id="linkInput"
            placeholder="Enter a link and click Add"
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
          />
          <button onClick={addLink}>Add</button>
          <ul id="linkList">
            {links.map((link, index) => (
              <li key={index}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileCode;
