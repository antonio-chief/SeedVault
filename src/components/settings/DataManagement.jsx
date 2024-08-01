import React, { useState } from 'react';
import './datamanagement.css';

const DataManagement = () => {
  const [data, setData] = useState(null);

  const handleDataImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setData(reader.result);
      reader.readAsText(file);
    }
  };

  const handleDataExport = () => {
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported-data.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDataBackup = () => {
    console.log('Backup Data:', data);
  };

  return (
    <div className="settings-content">
      <h2>Data Management</h2>
      <div className="data-management-section">
        <h3>Data Export</h3>
        <button onClick={handleDataExport}>Export Data</button>
      </div>
      <div className="data-management-section">
        <h3>Data Import</h3>
        <input type="file" onChange={handleDataImport} />
      </div>
      <div className="data-management-section">
        <h3>Data Backup</h3>
        <button onClick={handleDataBackup}>Backup Data</button>
      </div>
    </div>
  );
};

export default DataManagement;