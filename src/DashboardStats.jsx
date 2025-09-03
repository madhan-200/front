import React from 'react';
import './DashboardStats.css'; 
import { Pie } from 'react-chartjs-2';  
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Sidebar from './Sidebar';

ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardStats() {
  
  const statsData = {
    totalFood: 7,
    totalDonors: 3,
    totalUsers: 3,
    totalWaste: 2,
  };

  const pieData = {
    labels: ['Total Food', 'Total Donors', 'Total Users', 'Total Waste'],
    datasets: [
      {
        data: [statsData.totalFood, statsData.totalDonors, statsData.totalUsers, statsData.totalWaste],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#FF9F40'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#FF9F40'],
      },
    ],
  };

  return (
    <div>
      <Sidebar/>
    <div className="dashboard-stats-container">
      <h1>MJM FOOD RESCUE</h1>
      <h2>DashBoard</h2>
      <div className="dashboard-stats">
        <div className="stat-box">
          <h3>{statsData.totalFood}</h3>
          <p>Total Food List</p>
        </div>
        <div className="stat-box" style={{ marginLeft: "20px" }}>
          <h3>{statsData.totalDonors}</h3>
          <p>Total Donors</p>
        </div>
        <div className="stat-box" style={{ marginLeft: "20px" }}>
          <h3>{statsData.totalUsers}</h3>
          <p>Total Users</p>
        </div>
        <div className="stat-box" style={{ marginLeft: "20px" }}>
          <h3>{statsData.totalWaste}</h3>
          <p>Total Food Waste</p>
        </div>
      </div>

     
      <div className="activity-chart">
        <h3>Activity Status</h3>
        <Pie data={pieData} />
      </div>
    </div>
    </div>
  );
}

export default DashboardStats;