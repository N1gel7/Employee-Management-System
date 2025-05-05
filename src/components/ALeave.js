import React, { useEffect, useState } from "react";
import './ALeave.css';

function ALeave() {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/leave/requests")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const formattedData = data.map((request) => ({
            ...request,
            startDate: formatDate(request.startDate),
            endDate: formatDate(request.endDate),
          }));
          setLeaveRequests(formattedData);
        } else {
          console.error("Expected array but got:", data);
          setLeaveRequests([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching leave requests:", error);
        setLeaveRequests([]);
      });
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split('T')[0]; 
  };

  const updateStatus = (leaveID, status) => {
    fetch(`http://localhost:5000/leave/updateStatus`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leaveID, status }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setLeaveRequests(prev =>
            prev.map(req => req.leaveID === leaveID ? { ...req, approvalStatus: status } : req)
          );
        }
      });
  };

  return (
    <div className="leave-requests-container">
      <h2>Leave Requests</h2>
      <table className="leave-requests-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request) => (
            <tr key={request.leaveID}>
              <td>{request.empID}</td>
              <td>{request.startDate}</td>
              <td>{request.endDate}</td>
              <td>{request.reason}</td>
              <td>{request.approvalStatus}</td>
              <td>
                {request.approvalStatus === "Pending" && (
                  <>
                    <button onClick={() => updateStatus(request.leaveID, "Approved")} className="approve-btn">Approve</button>
                    <button onClick={() => updateStatus(request.leaveID, "Declined")} className="decline-btn">Decline</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ALeave;
