import React, { useState, useEffect } from 'react';
import './ManageDonors.css';

const ManageDonors = () => {
  const [donors, setDonors] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ donorName: '', foodType: '', quantity: '', expiryDate: '' });

  
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

 
  useEffect(() => {
    fetch('http://localhost:5000/api/donors') 
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        
        const formattedDonors = data.map((donor) => ({
          ...donor,
          expiryDate: formatDate(donor.expiryDate),
        }));
        setDonors(formattedDonors);
      })
      .catch((error) => {
        console.error('Error fetching donors:', error);
        alert('Failed to fetch donors');
      });
  }, []); 

  
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  
  const handleEditClick = (donor) => {
    setEditingId(donor._id); 
    setEditFormData({
      donorName: donor.donorName,
      foodType: donor.foodType,
      quantity: donor.quantity,
      expiryDate: donor.expiryDate, 
    });
  };

  
  const handleSaveClick = () => {
    fetch(`http://localhost:5000/api/donors/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editFormData),
    })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((updatedDonor) => {
        setDonors((prevDonors) => prevDonors.map((donor) => (donor._id === editingId ? updatedDonor : donor)));
        setEditingId(null);
      })
      .catch((error) => console.error('Error updating donor:', error));
  };

  
  const handleDeleteClick = (id) => {
    fetch(`http://localhost:5000/api/donors/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setDonors((prevDonors) => prevDonors.filter((donor) => donor._id !== id));
      })
      .catch((error) => console.error('Error deleting donor:', error));
  };

  return (
    <div className="manage-donors-container">
      <h2>Manage Donors</h2>
      <table className="donors-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Food Type</th>
            <th>Quantity</th>
            <th>Expiry Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((donor) => (
            <tr key={donor._id}>
              {editingId === donor._id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="donorName"
                      value={editFormData.donorName}
                      onChange={handleEditInputChange}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="foodType"
                      value={editFormData.foodType}
                      onChange={handleEditInputChange}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="quantity"
                      value={editFormData.quantity}
                      onChange={handleEditInputChange}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      name="expiryDate"
                      value={editFormData.expiryDate}
                      onChange={handleEditInputChange}
                      required
                    />
                  </td>
                  <td>
                    <button onClick={handleSaveClick} className="save-btn">Save</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{donor.donorName}</td>
                  <td>{donor.foodType}</td>
                  <td>{donor.quantity}</td>
                  <td>{donor.expiryDate}</td>
                  <td>
                    <button onClick={() => handleEditClick(donor)} className="edit-btn">Edit</button>
                    <button onClick={() => handleDeleteClick(donor._id)} className="delete-btn">Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageDonors;
