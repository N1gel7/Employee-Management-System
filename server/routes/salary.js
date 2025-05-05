const express = require("express");
const router = express.Router();
const mysql = require("mysql");
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

router.get("/salaries", (req, res) => {
  const query = `
    SELECT 
  e.empID, 
  CONCAT(e.empfirstName, ' ', e.emplastName) AS name, 
  d.deptName AS department,
  r.roleName AS role,  -- Get the role of the employee from Roles table
  r.salary AS baseSalary  -- Get the baseSalary from Roles table
FROM Employee e
INNER JOIN Department d ON e.empDeptID = d.deptID
INNER JOIN Roles r ON e.roleID = r.roleID  -- Join with Roles table to get roleName and baseSalary
WHERE e.empID IS NOT NULL  -- Ensures only employees with valid empID are selected
ORDER BY d.deptName, e.empfirstName;
  `;
  
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: "Error fetching salaries" });
    res.json(results);
  });
});



router.put("/salaries/:empID", (req, res) => {
  const empID = req.params.empID;
  const { baseSalary } = req.body;
  db.query("UPDATE Salaries SET baseSalary = ? WHERE empID = ?", [baseSalary, empID], (err) => {
    if (err) return res.status(500).json({ error: "Update failed" });
    res.json({ message: "Salary updated successfully" });
  });
});

// Delete a salary
router.delete("/salaries/:empID", (req, res) => {
  const empID = req.params.empID;
  db.query("DELETE FROM Salaries WHERE empID = ?", [empID], (err) => {
    if (err) return res.status(500).json({ error: "Delete failed" });
    res.json({ message: "Salary deleted successfully" });
  });
});




module.exports = router;
