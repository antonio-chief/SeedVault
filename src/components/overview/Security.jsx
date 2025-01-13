import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './security.css';

const Security = () => {
  const [workers, setWorkers] = useState([]);
  const [restrictedAreas, setRestrictedAreas] = useState([]);
  const [securityBreaches, setSecurityBreaches] = useState([]);
  const [equipmentStatus, setEquipmentStatus] = useState([]);
  const [newWorker, setNewWorker] = useState({ WorkerID: '', Name: '', AssignedPlace: '', Image: null });
  const [newRestrictedArea, setNewRestrictedArea] = useState({ AreaName: '', Reason: '' });
  const [showAddWorker, setShowAddWorker] = useState(false);
  const [showAddRestrictedArea, setShowAddRestrictedArea] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workersResponse = await axios.get('http://127.0.0.1:8001/worker/');
        const restrictedAreasResponse = await axios.get('http://127.0.0.1:8001/restricted-area/');
        const securityBreachesResponse = await axios.get('http://127.0.0.1:8001/security-breach/');
        const equipmentStatusResponse = await axios.get('http://127.0.0.1:8001/equipment-status/');

        setWorkers(workersResponse.data);
        setRestrictedAreas(restrictedAreasResponse.data);
        setSecurityBreaches(securityBreachesResponse.data);
        setEquipmentStatus(equipmentStatusResponse.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const handleWorkerInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorker({ ...newWorker, [name]: value });
  };

  const handleWorkerImageChange = (e) => {
    setNewWorker({ ...newWorker, Image: e.target.files[0] });
  };

  const handleRestrictedAreaInputChange = (e) => {
    const { name, value } = e.target;
    setNewRestrictedArea({ ...newRestrictedArea, [name]: value });
  };

  const handleAddWorker = async () => {
    const formData = new FormData();
    formData.append('WorkerID', newWorker.WorkerID);
    formData.append('Name', newWorker.Name);
    formData.append('AssignedPlace', newWorker.AssignedPlace);
    formData.append('Image', newWorker.Image);

    try {
      const response = await axios.post('http://127.0.0.1:8001/worker/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setWorkers([response.data, ...workers]);
      setNewWorker({ WorkerID: '', Name: '', AssignedPlace: '', Image: null });
      setShowAddWorker(false);
    } catch (error) {
      console.error('Failed to add worker:', error);
    }
  };

  const handleAddRestrictedArea = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8001/restricted-area/', newRestrictedArea);
      setRestrictedAreas([response.data, ...restrictedAreas]);
      setNewRestrictedArea({ AreaName: '', Reason: '' });
      setShowAddRestrictedArea(false);
    } catch (error) {
      console.error('Failed to add restricted area:', error);
    }
  };

  return (
    <div className="security-container">
      <h2>Security</h2>

      <div className="card workers-section">
        <h3>Workers</h3>
        <button onClick={() => setShowAddWorker(!showAddWorker)}>
          {showAddWorker ? 'Cancel' : 'Add Worker'}
        </button>
        {showAddWorker && (
          <div className="add-worker">
            <input
              type="text"
              name="WorkerID"
              value={newWorker.WorkerID}
              onChange={handleWorkerInputChange}
              placeholder="Worker ID"
            />
            <input
              type="text"
              name="Name"
              value={newWorker.Name}
              onChange={handleWorkerInputChange}
              placeholder="Worker Name"
            />
            <input
              type="text"
              name="AssignedPlace"
              value={newWorker.AssignedPlace}
              onChange={handleWorkerInputChange}
              placeholder="Assigned Place"
            />
            <input type="file" onChange={handleWorkerImageChange} />
            <button onClick={handleAddWorker}>Add Worker</button>
          </div>
        )}
        <div className="workers-list">
          {workers.map((worker) => (
            <div className="worker-card" key={worker.WorkerID}>
              {worker.Image && <img src={`http://127.0.0.1:8001${worker.Image}`} alt="Worker" />}
              <p>ID: {worker.WorkerID}</p>
              <p>Name: {worker.Name}</p>
              <p>Assigned Place: {worker.AssignedPlace}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card restricted-areas-section">
        <h3>Restricted Areas</h3>
        <button onClick={() => setShowAddRestrictedArea(!showAddRestrictedArea)}>
          {showAddRestrictedArea ? 'Cancel' : 'Add Restricted Area'}
        </button>
        {showAddRestrictedArea && (
          <div className="add-restricted-area">
            <input
              type="text"
              name="AreaName"
              value={newRestrictedArea.AreaName}
              onChange={handleRestrictedAreaInputChange}
              placeholder="Area Name"
            />
            <input
              type="text"
              name="Reason"
              value={newRestrictedArea.Reason}
              onChange={handleRestrictedAreaInputChange}
              placeholder="Reason"
            />
            <button onClick={handleAddRestrictedArea}>Add Restricted Area</button>
          </div>
        )}
        <ul>
          {restrictedAreas.map((area) => (
            <li key={area.AreaName}>
              <strong>{area.AreaName}:</strong> {area.Reason}
            </li>
          ))}
        </ul>
      </div>

      <div className="card security-breaches-section">
        <h3>Security Breaches</h3>
        <ul>
          {securityBreaches.map((breach) => (
            <li key={breach.BreachID}>
              <strong>{breach.BreachID}:</strong> {breach.Date} {breach.Time} - {breach.Description}
            </li>
          ))}
        </ul>
      </div>

      <div className="card equipment-status-section">
        <h3>Equipment Status</h3>
        <ul>
          {equipmentStatus.map((equipment) => (
            <li key={equipment.EquipmentID}>
              <strong>{equipment.EquipmentID}:</strong> {equipment.Status} (Last Updated: {equipment.LastUpdated})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Security;
