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


router.get("/employeeInfo", (req, res) => {
  const year = req.query.year;

  const query = `
    SELECT 
      e.empID, 
      e.empfirstName, 
      e.emplastName,
      e.email,
      e.contact,
      e.hireDate,
      d.deptName 
    FROM Employee e 
    INNER JOIN Department d ON e.empDeptID = d.deptID 
    WHERE YEAR(e.hireDate) = ?
    ORDER BY e.hireDate
  `;

  db.query(query, [year], (err, results) => {
    if (err) {
      console.error("Error fetching employee info:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

module.exports = router;
