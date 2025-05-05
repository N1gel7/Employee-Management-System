import React from "react";
import LeaveApplication from "./LeaveApplication";




function DashBoard() {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Employee Dashboard</h1>

      <div className="top-section">
        <div className="attendance">
          <h3>Attendance</h3>
          <p>Date: April 20, 2024</p>
          <p>Check-in: 6:00 AM</p>
          <p>Check-out: 9:00 PM</p>
        </div>

        <div className="payslip">
          <h3>Payslip</h3>
          <p>Gross Salary: 5,000</p>
          <p>Deduction: 750</p>
          <p>Net Pay: 4,250</p>
          <p>Days Present: 20</p>
          <p>Leave Days: 2</p>
          <button className="view-btn">View</button>
        </div>
      </div>

     <LeaveApplication/>

        
      </div>
    
  );
}

export default DashBoard;
