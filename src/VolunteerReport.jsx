import React, { useEffect, useState } from 'react';
import './VolunteerReport.css'; 

const VolunteerReport = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/volunteer');
        const data = await response.json();

        if (response.ok) {
          setVolunteers(data); 
          setFilteredVolunteers(data); 
        } else {
          console.error(data.message); 
        }
      } catch (error) {
        console.error('Error fetching volunteers', error);
      }
    };

    fetchVolunteers();
  }, []);

  
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

   
    if (query) {
      const filtered = volunteers.filter(
        (volunteer) =>
          volunteer.firstName.toLowerCase().includes(query.toLowerCase()) ||
          volunteer.lastName.toLowerCase().includes(query.toLowerCase()) ||
          volunteer.email.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredVolunteers(filtered);
    } else {
      setFilteredVolunteers(volunteers); 
    }
  };

  return (
    <div className="container">
      <h2>Volunteer Report</h2>
      <input
        type="text"
        placeholder="Search Volunteers"
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredVolunteers.map((volunteer) => (
            <tr key={volunteer._id}>
              <td>{volunteer.firstName}</td>
              <td>{volunteer.lastName}</td>
              <td>{volunteer.email}</td>
              <td>{volunteer.mobilePhone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VolunteerReport;
