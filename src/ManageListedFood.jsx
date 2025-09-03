import React, { useState } from 'react';
import './ManageListedFood.css';

const ManageListedFood = () => {
  
  const [foods, setFoods] = useState([
    { id: 1, name: 'Apples', quantity: '20 kg', expiryDate: '2024-10-20' },
    { id: 2, name: 'Bread', quantity: '15 loaves', expiryDate: '2024-10-15' },
    { id: 3, name: 'Rice', quantity: '50 kg', expiryDate: '2024-12-01' },
  ]);

  const handleDelete = (id) => {
    const updatedFoods = foods.filter(food => food.id !== id);
    setFoods(updatedFoods);
  };

  const handleEdit = (id) => {
    alert(`Edit functionality for food item with ID ${id} coming soon!`);
  };

  return (
    <div className="manage-listed-food-container">
      <h2>Manage Listed Foods</h2>
      <table className="food-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Expiry Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foods.length > 0 ? (
            foods.map(food => (
              <tr key={food.id}>
                <td>{food.name}</td>
                <td>{food.quantity}</td>
                <td>{food.expiryDate}</td>
                <td>
                  <button onClick={() => handleEdit(food.id)} className="edit-button">Edit</button>
                  <button onClick={() => handleDelete(food.id)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-data">No listed foods available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageListedFood;