import React, { useEffect, useState } from "react";
import "./ASalary.css";

function ASalary() {
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newSalary, setNewSalary] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/salaries")  // Adjust to reflect your correct endpoint
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error("Failed to fetch salaries:", err));
  }, []);

  const handleDelete = (empID) => {
    fetch(`http://localhost:5000/api/salaries/${empID}`, {
      method: "DELETE"
    })
      .then(() => setEmployees(prev => prev.filter(emp => emp.empID !== empID)))
      .catch(err => console.error("Delete failed:", err));
  };

  const handleEdit = (empID, currentSalary) => {
    setEditingId(empID);
    setNewSalary(currentSalary);
  };

  const handleSave = (empID) => {
    fetch(`http://localhost:5000/api/salaries/${empID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ baseSalary: newSalary })
    })
      .then(() => {
        setEmployees(prev =>
          prev.map(emp =>
            emp.empID === empID ? { ...emp, baseSalary: newSalary } : emp
          )
        );
        setEditingId(null);
      })
      .catch(err => console.error("Update failed:", err));
  };

  return (
    <div className="salaries-container">
      <h2>Base Salaries</h2>
      <table className="salaries-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Department</th>
            <th>Role</th> {/* Added Role column */}
            <th>Base Salary (GHS)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(({ empID, name, department, role, baseSalary }) => (
            <tr key={empID}>
              <td>{name}</td>
              <td>{department}</td>
              <td>{role}</td> {/* Display the role from the backend */}
              <td>
                {editingId === empID ? (
                  <input
                    type="number"
                    value={newSalary}
                    onChange={e => setNewSalary(e.target.value)}
                  />
                ) : (
                  baseSalary
                )}
              </td>
              <td>
                <div className="action-buttons">
                  {editingId === empID ? (
                    <button className="edit-btn" onClick={() => handleSave(empID)}>Save</button>
                  ) : (
                    <button className="edit-btn" onClick={() => handleEdit(empID, baseSalary)}>Edit</button>
                  )}
                  <button className="delete-btn" onClick={() => handleDelete(empID)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ASalary;
