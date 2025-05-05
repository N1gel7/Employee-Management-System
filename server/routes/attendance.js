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

router.get("/attendance/:empID", (req, res) => {
  const empID = req.params.empID;

  const attendanceQuery = `
    SELECT 
      DATE_FORMAT(recordedDate, '%b %d %Y') AS date,
      DATE_FORMAT(checkInTime, '%h:%i %p') AS checkIn,
      DATE_FORMAT(checkOutTime, '%h:%i %p') AS checkOut,
      TIME_FORMAT(overtime, '%H:%i:%s') AS overtime,
      TIME_FORMAT(undertime, '%H:%i:%s') AS undertime
    FROM Attendance 
    WHERE empID = ? 
    ORDER BY recordedDate DESC
  `;

  const summaryQuery = `
    SELECT daysPresent 
    FROM AttendanceSummary 
    WHERE empID = ? 
    ORDER BY summaryID DESC 
    LIMIT 1
  `;

  db.query(attendanceQuery, [empID], (err, attendanceResults) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch attendance" });
    }

    db.query(summaryQuery, [empID], (err, summaryResults) => {
      if (err) {
        return res.status(500).json({ error: "Failed to fetch summary" });
      }

      const totalDaysPresent = summaryResults.length > 0 ? summaryResults[0].daysPresent : 0;

      res.json({
        attendance: attendanceResults,
        totalDaysPresent
      });
    });
  });
});


router.get("/names-departments", (req, res) => {
  const query = `
    SELECT e.empID, CONCAT(e.empfirstName, ' ', e.emplastName) AS name, d.deptName 
    FROM Employee e 
    JOIN Department d ON e.empDeptID = d.deptID
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch employee data" });
    res.json(results);
  });
});



module.exports = router;
