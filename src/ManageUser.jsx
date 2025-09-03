import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageUser.css';

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedUser, setEditedUser] = useState({ name: '', email: '', role: 'user' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/manage'); 
        setUsers(response.data);
      } catch (err) {
        setError('Error fetching users');
        console.error('Fetch users error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  
  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/users/manage/${userId}`); 
      if (response.status === 200) {
        setUsers(users.filter((user) => user._id !== userId));
        alert('User deleted successfully');
      }
    } catch (err) {
      setError('Error deleting user');
      console.error('Delete user error:', err);
    }
  };

  
  const handleEdit = (user) => {
    setEditMode(user._id);
    setEditedUser({ ...user });
  };

  
  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/users/manage/${editedUser._id}`, editedUser); 
      if (response.status === 200) {
        setUsers(users.map((user) =>
          user._id === editedUser._id ? editedUser : user
        ));
        setEditMode(null);
        alert('User updated successfully');
      }
    } catch (err) {
      setError('Error saving user');
      console.error('Save user error:', err);
    }
  };

  
  const handleCancel = () => {
    setEditMode(null);
    setEditedUser({ name: '', email: '', role: 'user' });
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="manage-user-container">
      <h2>Manage Users</h2>
      {error && <p className="error-message">{error}</p>}
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{editMode === user._id ? (
                <input
                  type="text"
                  name="name"
                  value={editedUser.name}
                  onChange={handleChange}
                />
              ) : user.name}</td>
              <td>{editMode === user._id ? (
                <input
                  type="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleChange}
                />
              ) : user.email}</td>
              <td>{editMode === user._id ? (
                <select
                  name="role"
                  value={editedUser.role}
                  onChange={handleChange}
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="volunteer">Volunteer</option>
                </select>
              ) : user.role}</td>
              <td>
                {editMode === user._id ? (
                  <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button onClick={() => handleDelete(user._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUser;
