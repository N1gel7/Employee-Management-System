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

router.post("/apply", (req, res) => {
  const { employeeId, reason, startDate, endDate } = req.body;
  const leaveID = "L" + Math.floor(Math.random() * 1000000);

  const insertLeave = `INSERT INTO EmpLeave (leaveID, empID, startDate, endDate, leaveStatus, reason) VALUES (?, ?, ?, ?, 0, ?)`;

  db.query(insertLeave, [leaveID, employeeId, startDate, endDate, reason], (err, result) => {
    if (err) {
      console.error("Error inserting leave request:", err);  
      return res.status(500).json({ success: false, error: err.message });
    }

    const insertApproval = `INSERT INTO leaveApproval (approvalID, empID, leaveID, approvalStatus, reason) VALUES (?, ?, ?, 'Pending', ?)`;
    db.query(insertApproval, ["A" + Math.floor(Math.random() * 1000000), employeeId, leaveID, reason], (err2) => {
      if (err2) {
        console.error("Error creating approval record:", err2);  
        return res.status(500).json({ success: false, error: err2.message });
      }

      res.json({ success: true, message: "Leave request submitted successfully." });
    });
  });
});

router.get("/requests", (req, res) => {
    const query = `
      SELECT 
        EmpLeave.leaveID, 
        EmpLeave.empID, 
        EmpLeave.startDate, 
        EmpLeave.endDate, 
        EmpLeave.leaveStatus,
         EmpLeave.reason,
        leaveApproval.approvalStatus
      FROM EmpLeave 
      LEFT JOIN leaveApproval ON EmpLeave.leaveID = leaveApproval.leaveID
    `;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error("DB error:", err); 
        return res.status(500).json({ error: "Failed to fetch leave requests" });
      }
  
      res.json(results); 
    });
  });
  
  router.post("/updateStatus", (req, res) => {
    const { leaveID, status } = req.body;
  
    const query = `UPDATE leaveApproval SET approvalStatus = ? WHERE leaveID = ?`;
  
    db.query(query, [status, leaveID], (err) => {
      if (err) return res.status(500).json({ success: false });
      res.json({ success: true });
    });
  });
  

module.exports = router;
