import React, { useState } from 'react';
import './ListedFoodReport.css';

const ListedFoodReport = () => {
  
  const [foodReport, setFoodReport] = useState([
    { id: 1, name: 'Apples', quantity: '20 kg', expiryDate: '2024-10-20', donor: 'John Doe', status: 'Available' },
    { id: 2, name: 'Bread', quantity: '15 loaves', expiryDate: '2024-10-15', donor: 'Jane Smith', status: 'Reserved' },
    { id: 3, name: 'Rice', quantity: '50 kg', expiryDate: '2024-12-01', donor: 'FoodBank Org', status: 'Delivered' },
  ]);

  return (
    <div className="listed-food-report-container">
      <h2>Listed Food Report</h2>
      <table className="food-report-table">
        <thead>
          <tr>
            <th>Food Name</th>
            <th>Quantity</th>
            <th>Expiry Date</th>
            <th>Donor</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {foodReport.length > 0 ? (
            foodReport.map((food) => (
              <tr key={food.id}>
                <td>{food.name}</td>
                <td>{food.quantity}</td>
                <td>{food.expiryDate}</td>
                <td>{food.donor}</td>
                <td>
                  <span className={`status ${food.status.toLowerCase()}`}>{food.status}</span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-data">No listed food items available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListedFoodReport;