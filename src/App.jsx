import React from 'react';
import Sidebar from './Sidebar';
import './App.css';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Donor from './Donor';
import ManageDonors from './ManageDonors';
import DonorReports from './DonorReports';
import DashboardStats from './DashboardStats';
import AddVolunteer from './AddVolunteer.jsx';
import ManageVolunteer from './ManageVolunteer';
import VolunteerReport from './VolunteerReport';
import AddListedFood from './AddListedFood';
import ManageListedFood from './ManageListedFood';
import ListedFoodReport from './ListedFoodReport';
import AddUser from './AddUser';
import ManageUser from './ManageUser';
import UserReport from './UserReport';
import AddWaste from './AddWaste';
import ManageWaste from './ManageWaste';
import WasteReport from './WasteReport';
import GenerateReport from './GenerateReport';
import ViewReport from './ViewReport';
import UpdateWebsite from './UpdateWebsite';
import ManageSettings from './ManageSettings';

function App() {
  return (
    <div className="app-container">
      <Router>
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<DashboardStats />} exact /> 
            <Route path="/add-donor" element={<Donor />} />
            <Route path="/manage-donors" element={<ManageDonors />} />
            <Route path="/donor-reports" element={<DonorReports />} />
            <Route path="/add-volunteer" element={<AddVolunteer />} />
            <Route path="/manage-volunteers" element={<ManageVolunteer />} />
            <Route path="/volunteer-reports" element={<VolunteerReport />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/manage-users" element={<ManageUser />} />
            <Route path="/user-reports" element={<UserReport />} />
            <Route path="/add-food" element={<AddListedFood />} />
            <Route path="/manage-listed-foods" element={<ManageListedFood />} />
            <Route path="/listed-food-reports" element={<ListedFoodReport />} />
            <Route path="/add-waste" element={<AddWaste />} />
            <Route path="/manage-waste" element={<ManageWaste />} />
            <Route path="/waste-reports" element={<WasteReport />} />
            <Route path="/generate-report" element={<GenerateReport />} />
            <Route path="/view-reports" element={<ViewReport />} />
            <Route path="/update-website" element={<UpdateWebsite />} />
            <Route path="/manage-settings" element={<ManageSettings />} />
            <Route path="/" element={<DashboardStats />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
