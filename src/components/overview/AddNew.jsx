import React, { useState, useEffect, useRef } from 'react';
import './addnew.css';
import AddNewDialog from './AddNewDialog';

const AddNew = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const dropdownRef = useRef(null);

  const handleAddNewClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDropdownClick = (type) => {
    setDialogType(type);
    setShowDropdown(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="add-new">
      <div className="add-new-circle" onClick={handleAddNewClick}>
        <span className="plus-sign">+</span>
        <span> <h5>Add New</h5></span>
      </div>
      
      {showDropdown && (
        <div className="add-new-dropdown" ref={dropdownRef}>
          <div onClick={() => handleDropdownClick('storageFacility')}>Storage Facility</div>
          <div onClick={() => handleDropdownClick('seed')}>Seed</div>
        </div>
      )}
      {dialogType && <AddNewDialog type={dialogType} onClose={() => setDialogType('')} />}
    </div>
  );
};

export default AddNew;
