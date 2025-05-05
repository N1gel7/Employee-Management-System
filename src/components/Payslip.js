import React, { useEffect, useState } from "react";
import "./Payslip.css";

function Payslip() {
  const [payslips, setPayslips] = useState([]);
  const empID = localStorage.getItem("userID");

  useEffect(() => {
    fetch(`http://localhost:5000/api/payslip/${empID}`)
      .then((res) => res.json())
      .then((data) => setPayslips(data))
      .catch((err) => console.error("Error fetching payslips:", err));
  }, [empID]);

  return (
    <div className="payslip-container">
      <h2 className="payslip-title">Payslips</h2>
      <h3>Summary of Salary Payments</h3>
      <table className="pay-slip">
        <thead>
          <tr>
            
            <th>Month</th>
            <th>Base Salary</th>
            <th>Deductions</th>
            <th>Bonus</th>
            <th>NHIS</th>
            <th>SSNIT</th>
            <th>Gross Salary</th>
            <th>Net Pay</th>
          </tr>
        </thead>
        <tbody>
          {payslips.map((item, index) => (
            <tr key={index}>
      
              <td>{item.payMonth}</td>
              <td>{item.baseSalary}</td>
              <td>{item.deductions}</td>
              <td>{item.bonus}</td>
              <td>{item.NHIS}</td>
              <td>{item.pension}</td>
              <td>₵{item.grossSalary}</td>
              <td>₵{item.netPay}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Payslip;
