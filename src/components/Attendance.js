import React, { useEffect, useState } from "react";
import "./Attendance.css";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [totalDaysPresent, setTotalDaysPresent] = useState(0);


  const empID = localStorage.getItem("userID");

  useEffect(() => {
    fetch(`http://localhost:5000/api/attendance/${empID}`)
      .then((res) => res.json())
      .then((data) => {
        setAttendance(data.attendance);
        setTotalDaysPresent(data.totalDaysPresent);
       
      })
      .catch((err) => {
        console.error("Error fetching attendance:", err);
      });
  }, [empID]);

  return (
    <div className="attendance-container">
      <h1 className="attendance-title">View Attendance</h1>
      <div className="attendance-card">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Check In Time</th>
              <th>Check Out Time</th>
              <th>Overtime</th>
              <th>Undertime</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((data, index) => (
              <tr key={index}>
                <td>{data.date}</td>
                <td><span className="check-icon">✅</span> {data.checkIn}</td>
                <td><span className="out-icon">➡️</span> {data.checkOut}</td>
                <td>{data.overtime}</td>
                <td>{data.undertime}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="summary"><strong>Total Days Present: {totalDaysPresent}</strong></p>
      </div>
    </div>
  );
}

export default Attendance;
