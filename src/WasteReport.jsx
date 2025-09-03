import React, { useState, useEffect } from 'react';
import './WasteReport.css';

const initialWasteData = [
  { id: 1, wasteType: 'Vegetables', quantity: 50, disposalDate: '2024-10-10' },
  { id: 2, wasteType: 'Meat', quantity: 20, disposalDate: '2024-10-11' },
  { id: 3, wasteType: 'Bread', quantity: 30, disposalDate: '2024-10-12' },
  
];

const WasteReport = () => {
  const [wasteData, setWasteData] = useState(initialWasteData);
  const [filteredWaste, setFilteredWaste] = useState(initialWasteData);
  const [filterDate, setFilterDate] = useState('');

  const handleFilter = () => {
    const filtered = wasteData.filter((waste) =>
      filterDate ? waste.disposalDate === filterDate : true
    );
    setFilteredWaste(filtered);
  };

  const handleExport = () => {
    
    const csvContent = `data:text/csv;charset=utf-8,${[
      ['Waste Type', 'Quantity', 'Disposal Date'],
      ...filteredWaste.map((waste) => [waste.wasteType, waste.quantity, waste.disposalDate]),
    ]
      .map((e) => e.join(','))
      .join('\n')}`;

    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', 'waste_report.csv');
    link.click();
  };

  useEffect(() => {
    handleFilter(); 
  }, [filterDate]);

  return (
    <div className="waste-report-container">
      <h2>Waste Report</h2>

      <div className="filter-section">
        <label htmlFor="filterDate">Filter by Disposal Date:</label>
        <input
          type="date"
          id="filterDate"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <button onClick={handleFilter} className="filter-btn">Filter</button>
        <button onClick={handleExport} className="export-btn">Export to CSV</button>
      </div>

      <table className="report-table">
        <thead>
          <tr>
            <th>Waste Type</th>
            <th>Quantity (kg)</th>
            <th>Disposal Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredWaste.length > 0 ? (
            filteredWaste.map((waste) => (
              <tr key={waste.id}>
                <td>{waste.wasteType}</td>
                <td>{waste.quantity}</td>
                <td>{waste.disposalDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-data">No waste records found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WasteReport;