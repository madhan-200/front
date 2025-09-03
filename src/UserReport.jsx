import React, { useState, useEffect } from 'react';
import './UserReport.css';

const UserReport = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/reports?search=${search}`); 
        if (!response.ok) {
          throw new Error('Failed to fetch user reports');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUsers();
  }, [search]); 

  return (
    <div className="user-report-container">
      <h2>User Reports</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search by name, email, or role" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
      </div>

      <table className="user-report-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserReport;
