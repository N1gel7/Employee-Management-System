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

router.post("/login", (req, res) => {
  const { userID, password } = req.body;

  const employeeQuery = `SELECT * FROM Employee WHERE empID = ? AND empPassword = ?`;
  const adminQuery = `SELECT * FROM Administration WHERE adminID = ? AND adminPassword = ?`;

  db.query(employeeQuery, [userID, password], (err, empResult) => {
    if (err) return res.status(500).send("Server error");

    if (empResult.length === 0) {
      return res.status(401).send("Invalid credentials");
    }

    // Check if this employee is also an admin
    db.query(adminQuery, [userID, password], (adminErr, adminResult) => {
      if (adminErr) return res.status(500).send("Server error during admin check");

      const isAdmin = adminResult.length > 0;

      res.json({
        success: true,
        isAdmin,
        empID: empResult[0].empID,
        empName: `${empResult[0].empfirstName} ${empResult[0].emplastName}`
      });
    });
  });
});

module.exports = router;
