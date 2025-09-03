import React, { useState } from 'react';
import './AddVolunteer.css'; 
const AddVolunteer = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    pronouns: '',
    gender: '',
    mailingAddress: '',
    postalCode: '',
    city: '',
    state: '',
    email: '',
    mobilePhone: '',
  });

  const [error, setError] = useState(null); 
  const [isSubmitting, setIsSubmitting] = useState(false); 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);  

    try {
      const response = await fetch('http://localhost:5000/api/Volunteer/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Volunteer registered successfully!');
        setFormData({
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          pronouns: '',
          gender: '',
          mailingAddress: '',
          postalCode: '',
          city: '',
          state: '',
          email: '',
          mobilePhone: '',
        }); 
      } else {
        setError(result.message || 'Error registering volunteer');
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
      setError('Error submitting form');
    } finally {
      setIsSubmitting(false);  
    }
  };

  return (
    <div className="add-volunteer-form">
      <h2>Volunteer Registration Form</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Pronouns</label>
          <select
            name="pronouns"
            value={formData.pronouns}
            onChange={handleChange}
            required
          >
            <option value="">- Select -</option>
            <option value="he/him">He/Him</option>
            <option value="she/her">She/Her</option>
            <option value="they/them">They/Them</option>
          </select>
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">- Select -</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-Binary</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Mailing Address</label>
          <input
            type="text"
            name="mailingAddress"
            value={formData.mailingAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>District/Province</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Mobile Phone</label>
          <input
            type="tel"
            name="mobilePhone"
            value={formData.mobilePhone}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default AddVolunteer;
