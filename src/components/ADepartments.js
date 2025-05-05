import React, { useEffect, useState } from "react";

function ADepartments() {
  const [departments, setDepartments] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedDept, setEditedDept] = useState({ deptID: "", deptName: "" });
  const [addingNew, setAddingNew] = useState(false);
  const [newDept, setNewDept] = useState({ deptID: "", deptName: "" });

  useEffect(() => {
    fetch("http://localhost:5000/api/departments")
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((err) => console.error("Error fetching departments:", err));
  }, []);

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditedDept(departments[index]);
  };

  const handleSaveClick = () => {
    const updated = [...departments];
    updated[editIndex] = editedDept;
    setDepartments(updated);
    setEditIndex(null);

    fetch(`http://localhost:5000/api/departments/${editedDept.deptID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedDept),
    })
      .then((res) => res.ok ? alert("Department updated") : alert("Update failed"))
      .catch((err) => console.error("Update error:", err));
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this department?");
    if (!confirm) return;

    fetch(`http://localhost:5000/api/departments/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setDepartments(departments.filter((d) => d.deptID !== id));
        } else {
          alert("Failed to delete department");
        }
      })
      .catch((err) => console.error("Delete error:", err));
  };

  const handleAddNew = () => {
    setAddingNew(true);
    setNewDept({ deptID: "", deptName: "" });
  };

  const handleSaveNew = () => {
    if (!newDept.deptID || !newDept.deptName) {
      alert("Both ID and Name are required.");
      return;
    }

    fetch("http://localhost:5000/api/departments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDept),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Add failed");
        return res.json();
      })
      .then(() => {
        setDepartments([...departments, newDept]);
        setAddingNew(false);
      })
      .catch((err) => alert("Error adding department: " + err.message));
  };

  return (
    <div className="departments-container">
      <h2>Manage Departments</h2>
      <button className="add-department-btn" onClick={handleAddNew}>
        + Add Department
      </button>

      <table className="departments-table">
        <thead>
          <tr>
            <th>Department ID</th>
            <th>Department Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept, index) => (
            <tr key={index}>
              <td>
                {editIndex === index ? (
                  <input
                    value={editedDept.deptID}
                    onChange={(e) =>
                      setEditedDept({ ...editedDept, deptID: e.target.value })
                    }
                  />
                ) : (
                  dept.deptID
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    value={editedDept.deptName}
                    onChange={(e) =>
                      setEditedDept({ ...editedDept, deptName: e.target.value })
                    }
                  />
                ) : (
                  dept.deptName
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={() => setEditIndex(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(index)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(dept.deptID)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}

          {addingNew && (
            <tr>
              <td>
                <input
                  value={newDept.deptID}
                  onChange={(e) => setNewDept({ ...newDept, deptID: e.target.value })}
                  placeholder="New Dept ID"
                />
              </td>
              <td>
                <input
                  value={newDept.deptName}
                  onChange={(e) => setNewDept({ ...newDept, deptName: e.target.value })}
                  placeholder="New Dept Name"
                />
              </td>
              <td>
                <button onClick={handleSaveNew}>Save</button>
                <button onClick={() => setAddingNew(false)}>Cancel</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ADepartments;
