import React, { useEffect, useState } from 'react';

const ManageVolunteer = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentVolunteer, setCurrentVolunteer] = useState({
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
    mobilePhone: ''
  });

  
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/volunteer');
        const data = await response.json();

        if (response.ok) {
          setVolunteers(data); 
        } else {
          setError(data.message); 
        }
      } catch (error) {
        setError('Error fetching volunteers');
        console.error(error);
      }
    };

    fetchVolunteers();
  }, []); 

  
  const handleEdit = (volunteer) => {
    setIsEditing(true);
    setCurrentVolunteer({ ...volunteer });
  };

  
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/volunteer/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        setVolunteers(volunteers.filter((volunteer) => volunteer._id !== id)); // Remove deleted volunteer from the list
        alert('Volunteer deleted successfully');
      } else {
        alert('Error deleting volunteer');
      }
    } catch (error) {
      console.error('Error deleting volunteer:', error);
      alert('Error deleting volunteer');
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:5000/api/volunteer/update/${currentVolunteer._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentVolunteer),
    });

    const data = await response.json();
    if (response.ok) {
      setVolunteers(volunteers.map((volunteer) =>
        volunteer._id === currentVolunteer._id ? currentVolunteer : volunteer
      ));
      setIsEditing(false);
      alert('Volunteer updated successfully');
    } else {
      alert('Error updating volunteer');
    }
  };

  return (
    <div className="container">
      <h2>Manage Volunteers</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <h3>Edit Volunteer</h3>
          <input
            type="text"
            name="firstName"
            value={currentVolunteer.firstName}
            onChange={(e) => setCurrentVolunteer({ ...currentVolunteer, firstName: e.target.value })}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="lastName"
            value={currentVolunteer.lastName}
            onChange={(e) => setCurrentVolunteer({ ...currentVolunteer, lastName: e.target.value })}
            placeholder="Last Name"
            required
          />
          <input
            type="email"
            name="email"
            value={currentVolunteer.email}
            onChange={(e) => setCurrentVolunteer({ ...currentVolunteer, email: e.target.value })}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="mobilePhone"
            value={currentVolunteer.mobilePhone}
            onChange={(e) => setCurrentVolunteer({ ...currentVolunteer, mobilePhone: e.target.value })}
            placeholder="Phone"
            required
          />
          <button type="submit">Update Volunteer</button>
        </form>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((volunteer) => (
              <tr key={volunteer._id}>
                <td>{volunteer.firstName}</td>
                <td>{volunteer.lastName}</td>
                <td>{volunteer.email}</td>
                <td>{volunteer.mobilePhone}</td>
                <td>
                  <button onClick={() => handleEdit(volunteer)}>Edit</button>
                  <button onClick={() => handleDelete(volunteer._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageVolunteer;
