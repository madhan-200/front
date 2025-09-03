import React, { useState } from 'react';
import './Sidebar.css';
import logo from "./assets/logo.jpg";
import {
  FaChevronDown, FaChevronRight,
  FaHandsHelping, FaUser, FaUserFriends,
  FaListAlt, FaTrash, FaFileAlt, FaCog,
  FaPlus, FaEdit, FaEye, FaRegFileAlt, FaBars, FaTimes
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const sections = [
  { key: 'donor', label: 'Donor', icon: FaHandsHelping },
  { key: 'user', label: 'User', icon: FaUser },
  { key: 'volunteer', label: 'Volunteer', icon: FaUserFriends },
  { key: 'listedFoods', label: 'Listed Foods', icon: FaListAlt },
  { key: 'wasteManagement', label: 'Waste Management', icon: FaTrash },
  { key: 'report', label: 'Report', icon: FaFileAlt },
  { key: 'manageWebsite', label: 'Manage Website', icon: FaCog }
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdowns, setDropdowns] = useState(
    sections.reduce((acc, section) => ({ ...acc, [section.key]: false }), {})
  );

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (section) => {
    setDropdowns(prevState => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="logo">
        <img src={logo} alt="Food Rescue Logo" />
        <h2>District Level Food Rescue</h2>
      </div>
      <ul className="nav-menu">
        {sections.map(({ key, label, icon: Icon }) => (
          <li key={key}>
            <div onClick={() => toggleDropdown(key)} className="menu-item">
              <Icon className="menu-icon" /> {label}
              {dropdowns[key] ? <FaChevronDown /> : <FaChevronRight />}
            </div>
            {dropdowns[key] && (
              <ul className="submenu">
                {getDropdownItems(key).map(item => (
                  <li key={item.path}>
                    <Link to={item.path} className="submenu-item">
                      {item.icon} {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <div className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
    </div>
  );
};

const getDropdownItems = (key) => {
  switch (key) {
    case 'donor':
      return [
        { label: 'Add Donor', path: '/add-donor', icon: <FaPlus /> },
        { label: 'Manage Donors', path: '/manage-donors', icon: <FaEdit /> },
        { label: 'Donor Reports', path: '/donor-reports', icon: <FaEye /> },
      ];
    case 'user':
      return [
        { label: 'Add User', path: '/add-user', icon: <FaPlus /> },
        { label: 'Manage Users', path: '/manage-users', icon: <FaEdit /> },
        { label: 'User Reports', path: '/user-reports', icon: <FaEye /> },
      ];
    case 'volunteer':
      return [
        { label: 'Add Volunteer', path: '/add-volunteer', icon: <FaPlus /> },
        { label: 'Manage Volunteers', path: '/manage-volunteers', icon: <FaEdit /> },
        { label: 'Volunteer Reports', path: '/volunteer-reports', icon: <FaEye /> },
      ];
    case 'listedFoods':
      return [
        { label: 'Add Listed Food', path: '/add-food', icon: <FaPlus /> },
        { label: 'Manage Listed Foods', path: '/manage-listed-foods', icon: <FaEdit /> },
        { label: 'Listed Food Reports', path: '/listed-food-reports', icon: <FaEye /> },
      ];
    case 'wasteManagement':
      return [
        { label: 'Add Waste', path: '/add-waste', icon: <FaPlus /> },
        { label: 'Manage Waste', path: '/manage-waste', icon: <FaEdit /> },
        { label: 'Waste Reports', path: '/waste-reports', icon: <FaEye /> },
      ];
    case 'report':
      return [
        { label: 'Generate Report', path: '/generate-report', icon: <FaRegFileAlt /> },
        { label: 'View Reports', path: '/view-reports', icon: <FaEye /> },
      ];
    case 'manageWebsite':
      return [
        { label: 'Update Website', path: '/update-website', icon: <FaEdit /> },
        { label: 'Manage Settings', path: '/manage-settings', icon: <FaCog /> },
      ];
    default:
      return [];
  }
};

export default Sidebar;