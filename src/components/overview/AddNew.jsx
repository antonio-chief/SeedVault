import React, { useState } from 'react';
import './addnew.css';
import AddNewDialog from './AddNewDialog';

const AddNew = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dialogType, setDialogType] = useState('');

  const handleAddNewClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDropdownClick = (type) => {
    setDialogType(type);
    setShowDropdown(false);
  };

  return (
    <div className="add-new">
      <div className="add-new-circle" onClick={handleAddNewClick}>
        <span className="plus-sign">+</span>
        <span className="add-new-text">new</span>
      </div>
      {showDropdown && (
        <div className="add-new-dropdown">
          <div onClick={() => handleDropdownClick('storageFacility')}>Storage Facility</div>
          <div onClick={() => handleDropdownClick('seed')}>Seed</div>
        </div>
      )}
      {dialogType && <AddNewDialog type={dialogType} onClose={() => setDialogType('')} />}
        <h5>Add New</h5>
    </div>
  );
};

export default AddNew;
