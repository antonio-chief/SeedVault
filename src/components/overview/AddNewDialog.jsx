import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './addnewdialog.css';

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
    optimalTemperature: '',
    optimalLight: '',
    optimalDampness: '',
    seedID: '',
  });

  const [seedCatalog, setSeedCatalog] = useState(null);
  const [seedCatalogError, setSeedCatalogError] = useState('');

  useEffect(() => {
    const fetchSeedCatalog = async () => {
      if (seedData.name) {
        try {
          const response = await axios.get(`http://127.0.0.1:8001/admin-seed-catalog/?seed_name=${seedData.name}`);
          if (response.data.length > 0) {
            setSeedCatalog(response.data[0]);
            setSeedData((prevData) => ({
              ...prevData,
              seedID: response.data[0].SeedID,
              optimalTemperature: response.data[0].OptimalTemperature,
              optimalLight: response.data[0].OptimalLight,
              optimalDampness: response.data[0].OptimalDampness,
            }));
            setSeedCatalogError('');
          } else {
            setSeedCatalog(null);
            setSeedCatalogError('No such seed data in the catalog.');
          }
        } catch (error) {
          console.error('Error fetching seed catalog data:', error);
        }
      }
    };

    fetchSeedCatalog();
  }, [seedData.name]);

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
        await axios.post('http://127.0.0.1:8001/storagefacilities/', facilityData);
      } else if (type === 'seed') {
        await axios.post('http://127.0.0.1:8001/seeds/', seedData);
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
              Optimal Temperature:
              <input
                type="text"
                name="optimalTemperature"
                value={seedData.optimalTemperature}
                readOnly
              />
            </label>
            <label>
              Optimal Light:
              <input
                type="text"
                name="optimalLight"
                value={seedData.optimalLight}
                readOnly
              />
            </label>
            <label>
              Optimal Dampness:
              <input
                type="text"
                name="optimalDampness"
                value={seedData.optimalDampness}
                readOnly
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
            {seedCatalogError && <p>{seedCatalogError}</p>}
          </div>
        )}
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddNewDialog;
