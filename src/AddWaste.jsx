import React, { useState } from 'react';
import './AddWaste.css';

const AddWaste = () => {
  const [wasteType, setWasteType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [disposalDate, setDisposalDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Waste Data Submitted:', { wasteType, quantity, disposalDate, notes });

    
    setWasteType('');
    setQuantity('');
    setDisposalDate('');
    setNotes('');
  };

  return (
    <div className="add-waste-container">
      <h2>Add Waste Information</h2>
      <form onSubmit={handleSubmit} className="add-waste-form">
        <div className="form-group">
          <label htmlFor="wasteType">Waste Type:</label>
          <input
            type="text"
            id="wasteType"
            value={wasteType}
            onChange={(e) => setWasteType(e.target.value)}
            placeholder="e.g., Vegetables, Meat"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity (in kg):</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g., 50"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="disposalDate">Disposal Date:</label>
          <input
            type="date"
            id="disposalDate"
            value={disposalDate}
            onChange={(e) => setDisposalDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="notes">Notes (Optional):</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Additional information about the waste"
          ></textarea>
        </div>
        <button type="submit" className="submit-btn">Submit Waste</button>
      </form>
    </div>
  );
};

export default AddWaste;