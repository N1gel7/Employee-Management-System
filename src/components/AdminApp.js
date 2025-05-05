import React, { useState } from "react";
import ASideBar from "./ASideBar"; 
import "./AdminApp.css";
import ADepartments from "./ADepartments"; 
import AMAttendance from "./AMAttendance";
import "./AttendanceOverview.css";
import ASalary from "./ASalary";
import "./ASalary.css";
import ALeave from "./ALeave";
import AEmployeeInfo from "./AEmployeeInfo"; 

function AdminApp() {
  const [activeSection, setActiveSection] = useState("departments");

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="adminapp-container">
      {/* Sidebar Component */}
      <ASideBar handleSectionClick={handleSectionClick} />

      {/* Content Area */}
      <div className="content-area">
        {activeSection === "departments" && <ADepartments />}
        {activeSection === "attendance" && <AMAttendance />}
        {activeSection === "salary" && <ASalary />}
        {activeSection === "leave" && <ALeave />}
        {activeSection === "employee-info" && <AEmployeeInfo />} 
      </div>
    </div>
  );
}

export default AdminApp;
