import React, { useState, useEffect } from 'react';
import './ManageWaste.css';

const initialWasteData = [
  { id: 1, wasteType: 'Vegetables', quantity: 50, disposalDate: '2024-10-10' },
  { id: 2, wasteType: 'Meat', quantity: 20, disposalDate: '2024-10-11' },
  { id: 3, wasteType: 'Bread', quantity: 30, disposalDate: '2024-10-12' },
  
];

const ManageWaste = () => {
  const [wasteData, setWasteData] = useState(initialWasteData);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id) => {
    const updatedData = wasteData.filter(waste => waste.id !== id);
    setWasteData(updatedData);
  };

  const filteredWaste = wasteData.filter(waste =>
    waste.wasteType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manage-waste-container">
      <h2>Manage Waste Records</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Waste Type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="waste-table">
        <thead>
          <tr>
            <th>Waste Type</th>
            <th>Quantity (kg)</th>
            <th>Disposal Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredWaste.length > 0 ? (
            filteredWaste.map(waste => (
              <tr key={waste.id}>
                <td>{waste.wasteType}</td>
                <td>{waste.quantity}</td>
                <td>{waste.disposalDate}</td>
                <td>
                  <button onClick={() => handleDelete(waste.id)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-data">No waste records found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageWaste;