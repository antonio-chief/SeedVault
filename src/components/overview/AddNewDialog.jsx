import React, { useState } from 'react';
import './addnewdialog.css';
import axios from 'axios';

const AddNewDialog = ({ type, onClose }) => {
  const [facilityData, setFacilityData] = useState({
    type: '',
    name: '',
    units: 0,
  });

  const [seedData, setSeedData] = useState({
    category: '',
    type: '',
    name: '',
    manufactureDate: '',
    buyingDate: '',
    expiryDate: '',
    additionalInfo: '',
  });

  const handleInputChange = (e, setData) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (type === 'storageFacility') {
        await axios.post('/api/storagefacilities/', facilityData);
      } else if (type === 'seed') {
        await axios.post('/api/seeds/', seedData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className="add-new-dialog">
      <div className="dialog-content">
        <h2>Add New {type === 'storageFacility' ? 'Storage Facility' : 'Seed'}</h2>
        {type === 'storageFacility' && (
          <div>
            <label>
              Facility Type:
              <select
                name="type"
                value={facilityData.type}
                onChange={(e) => handleInputChange(e, setFacilityData)}
              >
                <option value="warehouse">Warehouse</option>
                <option value="vault">Vault</option>
                <option value="bank">Bank</option>
                <option value="case">Case</option>
                <option value="album">Album</option>
                <option value="box">Box</option>
              </select>
            </label>
            <label>
              Facility Name:
              <input
                type="text"
                name="name"
                value={facilityData.name}
                onChange={(e) => handleInputChange(e, setFacilityData)}
              />
            </label>
            <label>
              Units:
              <input
                type="number"
                name="units"
                value={facilityData.units}
                onChange={(e) => handleInputChange(e, setFacilityData)}
              />
            </label>
          </div>
        )}
        {type === 'seed' && (
          <div>
            <label>
              Category:
              <select
                name="category"
                value={seedData.category}
                onChange={(e) => handleInputChange(e, setSeedData)}
              >
                <option value="seed">Seed</option>
                <option value="germplasm">Germplasm</option>
              </select>
            </label>
            <label>
              Type:
              <select
                name="type"
                value={seedData.type}
                onChange={(e) => handleInputChange(e, setSeedData)}
              >
                <option value="herb">Herb</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={seedData.name}
                onChange={(e) => handleInputChange(e, setSeedData)}
              />
            </label>
            <label>
              Manufacture Date:
              <input
                type="date"
                name="manufactureDate"
                value={seedData.manufactureDate}
                onChange={(e) => handleInputChange(e, setSeedData)}
              />
            </label>
            <label>
              Buying Date:
              <input
                type="date"
                name="buyingDate"
                value={seedData.buyingDate}
                onChange={(e) => handleInputChange(e, setSeedData)}
              />
            </label>
            <label>
              Expiry Date:
              <input
                type="date"
                name="expiryDate"
                value={seedData.expiryDate}
                onChange={(e) => handleInputChange(e, setSeedData)}
              />
            </label>
            <label>
              Additional Information:
              <textarea
                name="additionalInfo"
                value={seedData.additionalInfo}
                onChange={(e) => handleInputChange(e, setSeedData)}
              />
            </label>
          </div>
        )}
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddNewDialog;
