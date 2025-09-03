import React, { useState, useEffect } from 'react';
import './ViewReport.css';

const mockReports = [
  { id: 1, type: 'Daily', date: '2024-10-10', status: 'Completed' },
  { id: 2, type: 'Weekly', date: '2024-10-03', status: 'Completed' },
  { id: 3, type: 'Monthly', date: '2024-09-01', status: 'Completed' },
];

const ViewReport = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    
    setReports(mockReports);
  }, []);

  return (
    <div className="view-report-container">
      <h2>View Reports</h2>

      <table className="report-table">
        <thead>
          <tr>
            <th>Report Type</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.type}</td>
              <td>{report.date}</td>
              <td>{report.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewReport;