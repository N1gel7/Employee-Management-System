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


router.get("/average-undertime", (req, res) => {
  const query = `
    SELECT  
      e.empID,  
      e.empfirstName,  
      SEC_TO_TIME(AVG(TIME_TO_SEC(a.undertime))) AS avgUndertime
    FROM Attendance a
    INNER JOIN Employee e ON a.empID = e.empID
    WHERE a.undertime != '-' -- exclude placeholder values
    GROUP BY e.empID, e.empfirstName
    HAVING avgUndertime > '01:00:00'
    ORDER BY avgUndertime DESC;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Failed to fetch average undertime" });
    }
    res.json(results);
  });
});

module.exports = router;
