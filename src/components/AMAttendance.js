import React, { useEffect, useState } from "react";


const AMAttendance = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/attendance/average-undertime")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setData(data);
        }
      })
      .catch((err) => setError("Error fetching data"));
  }, []);

  return (
    <div className="am-attendance-container">
      <h2>Employees With Average Undertime &gt; 1 Hour</h2>
      {error && <p className="error">{error}</p>}

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Average Undertime</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((record, index) => (
              <tr key={index}>
                <td>{record.empID}</td>
                <td>{record.empfirstName}</td>
                <td>{record.avgUndertime}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No records found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AMAttendance;
