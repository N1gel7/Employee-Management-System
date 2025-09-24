// server/routes/departments.js
const express = require("express");
const router = express.Router();
const mysql = require("mysql");
require('dotenv').config();
//done
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

router.get("/departments", (req, res) => {
  const sql = "SELECT * FROM Department";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send("Database error");
    res.json(results);
  });
});

router.put("/departments/:id", (req, res) => {
    const { id } = req.params;
    const { deptID, deptName } = req.body;
  
    const sql = `UPDATE Department SET deptID = ?, deptName = ? WHERE deptID = ?`;
    db.query(sql, [deptID, deptName, id], (err, result) => {
      if (err) return res.status(500).send("Update failed");
      res.send("Department updated");
    });
  });
  
  router.delete("/departments/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM Department WHERE deptID = ?";
  
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Delete error:", err);
        return res.status(500).send("Delete failed");
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).send("Department not found");
      }
  
      res.send("Department deleted");
    });
  });
  
  router.post("/departments", (req, res) => {
    const { deptID, deptName } = req.body;
    const sql = "INSERT INTO Department (deptID, deptName) VALUES (?, ?)";
    db.query(sql, [deptID, deptName], (err, result) => {
      if (err) {
        console.error("Insert error:", err);
        return res.status(500).send("Insert failed");
      }
      res.status(201).json({ message: "Department added" });
    });
  });
  

module.exports = router;
