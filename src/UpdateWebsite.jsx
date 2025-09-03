import React, { useState } from 'react';
import './UpdateWebsite.css';

const UpdateWebsite = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(formData);
    alert('Website updated successfully!');
  };

  return (
    <div className="update-website-container">
      <h2>Update Website</h2>
      <form className="update-website-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Website Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter new title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Website Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter new description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Update Website Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>

        <button type="submit" className="submit-btn">Update Website</button>
      </form>
    </div>
  );
};

export default UpdateWebsite;