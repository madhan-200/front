import React, { useState } from 'react';
import './ManageSettings.css';

const ManageSettings = () => {
  const [settings, setSettings] = useState({
    siteName: '',
    adminEmail: '',
    theme: 'light',
    notificationsEnabled: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings saved:', settings);
    
  };

  return (
    <div className="manage-settings-container">
      <h2 className="heading">Manage Website Settings</h2>
      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="siteName">Site Name:</label>
          <input
            type="text"
            id="siteName"
            name="siteName"
            value={settings.siteName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="adminEmail">Admin Email:</label>
          <input
            type="email"
            id="adminEmail"
            name="adminEmail"
            value={settings.adminEmail}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="theme">Theme:</label>
          <select
            id="theme"
            name="theme"
            value={settings.theme}
            onChange={handleChange}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="notificationsEnabled"
            name="notificationsEnabled"
            checked={settings.notificationsEnabled}
            onChange={handleChange}
          />
          <label htmlFor="notificationsEnabled">
            Enable Email Notifications
          </label>
        </div>

        <button type="submit" className="submit-btn">Save Settings</button>
      </form>
    </div>
  );
};

export default ManageSettings;