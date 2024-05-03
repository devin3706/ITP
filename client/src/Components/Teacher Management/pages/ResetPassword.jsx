import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = ({ token }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const {resetToken, email} = useParams();
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      // Send POST request to reset password
      const response = await axios.post(
        "http://localhost:8081/teacher/reset-password",
        {
          newPassword: password, // Use newPassword instead of password
          confirmPassword,
          resetToken: resetToken, // Include the resetToken in the request body
          email: email
        }
      );

      alert("Reset Password Success");
      // Redirect to login page
      navigate("/tLogin");

    } catch (error) {
      setMessage("An error occurred while resetting the password");
      console.error("Reset password error:", error);
    }
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: '#ECF0F5' }}>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Reset Password</button>
        </form>
        {message && <p className="mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
