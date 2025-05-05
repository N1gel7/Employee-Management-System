import React, { useEffect, useState } from "react";
import "./AEmployeeInfo.css";

function AEmployeeInfo() {
  const [employees, setEmployees] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2023");

  const fetchEmployees = async (year) => {
    try {
      const response = await fetch(`http://localhost:5000/api/employeeInfo?year=${year}`);
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employee info:", error);
    }
  };

  useEffect(() => {
    fetchEmployees(selectedYear);
  }, [selectedYear]);

  return (
    <div className="employee-info-container">
      <h2>Employee Info by Year</h2>
      <div className="filter-container">
        <label htmlFor="year">Select Year:</label>
        <select id="year" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
        </select>
      </div>

      <table className="employee-info-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Hire Date</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.empID}>
                <td>{emp.empID}</td>
                <td>{emp.empfirstName} {emp.emplastName}</td>
                <td>{emp.email}</td>
                <td>{emp.contact}</td>
                <td>{emp.hireDate}</td>
                <td>{emp.deptName}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No employees found for {selectedYear}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AEmployeeInfo;
