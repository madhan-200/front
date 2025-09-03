import React, { useState } from 'react';

const AddUser = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'user',
        phone: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if (!formData.name || !formData.email || !formData.phone) {
            setError('Please fill out all required fields.');
            setMessage('');
            return;
        }

        try {
            setError('');
            setMessage('Processing...');

            
            const response = await fetch('http://localhost:5000/api/users/add-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            
            if (!response.ok) {
                throw new Error('Failed to add user');
            }

            const result = await response.json();

            setMessage('User added successfully!');
            setError('');
            setFormData({ name: '', email: '', role: 'user', phone: '' });
        } catch (error) {
            setError(`Error: ${error.message}`);
            setMessage('');
        }
    };

    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem' }}>
            <h1>Add User</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="volunteer">Volunteer</option>
                    </select>
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                    />
                </div>
                <button type="submit">Add User</button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default AddUser;
