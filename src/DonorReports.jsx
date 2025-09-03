import React, { useEffect, useState } from 'react';
import './DonorReports.css';

const DonorReports = () => {
  const [reportData, setReportData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/donors/report');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setReportData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="donor-reports-container">
      <h2>Donor Reports</h2>

      {loading && <p>Loading reports...</p>}

      {error && <div className="error-message">Error: {error}</div>}

      <table className="reports-table">
        <thead>
          <tr>
            <th>Food Type</th>
            <th>Total Quantity</th>
            <th>Total Donors</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(reportData) && reportData.length > 0 ? (
            reportData.map((report, index) => (
              <tr key={index}>
                <td>{report.foodType}</td>
                <td>{report.totalQuantity}</td>
                <td>{report.totalDonors}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No reports available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DonorReports;
