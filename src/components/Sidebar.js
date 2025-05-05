import React from "react";
import {
  FaCalendarCheck,
  FaFileInvoiceDollar,
  FaPlaneDeparture, 
} from "react-icons/fa";
import "./Sidebar.css";

function Sidebar({ handleSectionClick }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo-square">🏢</div>
        <h2>NetPay Company</h2>
      </div>
      <ul className="sidebar-menu">
        <li onClick={() => handleSectionClick("attendance")}>
          <FaCalendarCheck className="sidebar-icon" />
          <span>Attendance</span>
        </li>
        <li onClick={() => handleSectionClick("payslip")}>
          <FaFileInvoiceDollar className="sidebar-icon" />
          <span>Payslips</span>
        </li>
        <li onClick={() => handleSectionClick("leaves")}>
          <FaPlaneDeparture className="sidebar-icon" />
          <span>Request Leave</span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
