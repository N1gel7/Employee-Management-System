import React from "react";
import {
  FaBuilding,
  FaCalendarCheck,
  FaMoneyCheckAlt,
  FaPlaneDeparture,
  FaSignOutAlt,
  FaIdBadge, 
} from "react-icons/fa";
import "./ASideBar.css";

function ASideBar({ handleSectionClick }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo-square">🏢</div>
        <h2>NetPay Admin</h2>
      </div>
      <ul className="sidebar-menu">
        <li onClick={() => handleSectionClick("departments")}>
          <FaBuilding className="sidebar-icon" />
          <span>Departments</span>
        </li>
        <li onClick={() => handleSectionClick("attendance")}>
          <FaCalendarCheck className="sidebar-icon" />
          <span>Attendance</span>
        </li>
        <li onClick={() => handleSectionClick("salary")}>
          <FaMoneyCheckAlt className="sidebar-icon" />
          <span>Salaries</span>
        </li>
        <li onClick={() => handleSectionClick("leave")}>
          <FaPlaneDeparture className="sidebar-icon" />
          <span>Leave</span>
        </li>
        <li onClick={() => handleSectionClick("employee-info")}>
          <FaIdBadge className="sidebar-icon" />
          <span>Employee Info</span>
        </li>
        <li>
          <FaSignOutAlt className="sidebar-icon" />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
}

export default ASideBar;
