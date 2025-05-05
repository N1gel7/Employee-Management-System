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

router.get("/payslip/:empID", (req, res) => {
  const empID = req.params.empID;

  const query = `
  SELECT  
    e.empfirstName,  
    e.emplastName,  
    p.payMonth,  
    r.salary AS baseSalary,  -- Base salary from the Roles table
    p.deductions,
    p.bonus,
    0.03 * r.salary AS NHIS,  -- Assuming NHIS is 3% of base salary
    0.05 * r.salary AS pension,  -- Assuming pension is 5% of base salary
    0.05 * r.salary AS tax,  -- Assuming tax is 5% of base salary
    r.salary + p.bonus AS grossSalary,  -- Gross salary = base salary + bonus
    r.salary - p.deductions - (0.03 * r.salary) - (0.05 * r.salary) - (0.05 * r.salary) + p.bonus AS netPay -- Net pay calculation
FROM Payslips p  
INNER JOIN Employee e ON p.empID = e.empID  
INNER JOIN Department d ON e.empDeptID = d.deptID  
INNER JOIN Roles r ON e.roleID = r.roleID  -- Join Roles to get baseSalary
WHERE e.empID = ?  -- Filter for a specific employee by empID
GROUP BY 
    e.empID, 
    e.empfirstName, 
    e.emplastName, 
    p.payMonth,
    r.salary, 
    p.deductions, 
    p.bonus
ORDER BY p.payMonth DESC;


  `;

  db.query(query, [empID], (err, result) => {
    if (err) {
      console.error("Error fetching payslips:", err);
      return res.status(500).json({ error: "Server error fetching payslips" });
    }

    res.json(result);
  });
});

module.exports = router;
