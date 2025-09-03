import React, { useState } from 'react';
import './GenerateReport.css';

const GenerateReport = () => {
  const [reportType, setReportType] = useState('daily');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const handleGenerate = () => {
    if (!date) {
      setMessage('Please select a date to generate the report.');
    } else {
      setMessage(`Generating ${reportType} report for ${date}...`);
      
      setTimeout(() => {
        setMessage(`Successfully generated the ${reportType} report for ${date}!`);
      }, 1500);
    }
  };

  return (
    <div className="generate-report-container">
      <h2>Generate Report</h2>

      <div className="form-group">
        <label htmlFor="reportType">Report Type</label>
        <select id="reportType" value={reportType} onChange={(e) => setReportType(e.target.value)}>
          <option value="daily">Daily Report</option>
          <option value="weekly">Weekly Report</option>
          <option value="monthly">Monthly Report</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="date">Select Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <button onClick={handleGenerate} className="generate-btn">Generate Report</button>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default GenerateReport;