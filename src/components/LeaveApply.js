import React, { useState } from 'react';
import "./ApplyForLeave.css";


function ApplyForLeave() {
  const [employeeId, setEmployeeId] = useState('');
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    fetch("http://localhost:5000/leave/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ employeeId, reason, startDate, endDate }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Leave request submitted!");
          setEmployeeId("");
          setReason("");
          setStartDate("");
          setEndDate("");
        } else {
          alert("Error: " + data.error);
        }
      })
      .catch((err) => {
        console.error("Error submitting leave request:", err);
        alert("Failed to submit leave request.");
      });
  };
  
  return (
    <div className="leave-form-container">
      <h2>Apply for Leave</h2>
      <form onSubmit={handleSubmit} className="leave-form">
        <div>
          <label htmlFor="employeeId">Employee ID</label>
          <input
            type="text"
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="Enter Employee ID"
            required
          />
        </div>
        <div>
          <label htmlFor="reason">Reason for Leave</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for leave"
            required
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ApplyForLeave;
