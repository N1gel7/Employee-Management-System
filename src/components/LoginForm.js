import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/login/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: userID,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid credentials");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          localStorage.setItem("userID", userID);
          localStorage.setItem("empName", data.empName);

          
          if (userID === "E0011" && password === "pau12ul") {
            navigate("/admindashboard");
          } else {
            navigate("/employeedashboard");
          }
        }
      })
      .catch((error) => {
        alert(error.message);
        console.error("Error:", error);
      });
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img
          src="https://cdn-icons-png.flaticon.com/512/270/270798.png"
          alt="MNties logo"
          className="login-logo"
        />
        <h1>
          Welcome to <br />
          <span className="bold">NetPay Company</span> 👋
        </h1>
        <p>Managing teams, simplifying work.</p>
      </div>

      <div className="login-right">
        <h2>Employee Management System</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>User ID</label>
          <input
            type="text"
            placeholder="Enter your user ID"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
