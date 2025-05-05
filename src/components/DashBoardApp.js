import React, { useState } from "react";
import Sidebar from "./Sidebar"; 
import Attendance from "./Attendance"; 
import "./Payslip.css";
import "./Attendance.css";

import Payslip from "./Payslip";

import ApplyForLeave from "./LeaveApply";


function DashBoardApp() {
  const [activeSection, setActiveSection] = useState("attendance"); 

 
  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Component */}
      <Sidebar handleSectionClick={handleSectionClick} />

      {/* Content Area */}
      <div className="content-area">
       
      
        {activeSection === "attendance" && <Attendance />}
        {activeSection === "payslip" && <Payslip />}
        {activeSection === "leaves" && <ApplyForLeave/>}
      </div>
    </div>
  );
}

export default DashBoardApp;
