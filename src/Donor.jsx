import React, { useState, useRef } from 'react';
import './Donor.css';

const Donor = () => {
  const [donorName, setDonorName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [foodType, setFoodType] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [expiryDate, setExpiryDate] = useState('');
  
  const formRef = useRef(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const donorData = {
      donorName,
      email,
      phone,
      address,
      foodType,
      quantity,
      expiryDate,
    };

    try {
      const response = await fetch('http://localhost:5000/api/donors', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donorData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Donor Registered:', result);
        alert('Donor Registered Successfully');
        formRef.current.reset();
      } else {
        console.error('Error:', result.errors || result.message);
        alert('Error registering donor');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error registering donor');
    }
  };

  return (
    <div className="donor-container">
      <h2>Donor Registration Form</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="donorName">Donor Name:</label>
          <input
            type="text"
            id="donorName"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="foodType">Food Type:</label>
          <input
            type="text"
            id="foodType"
            value={foodType}
            onChange={(e) => setFoodType(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="expiryDate">Expiry Date:</label>
          <input
            type="date"
            id="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Register Donor</button>
      </form>
    </div>
  );
};

export default Donor;
