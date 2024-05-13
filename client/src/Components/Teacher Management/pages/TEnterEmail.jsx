import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import Header from "../../Exam Platform and Leaderboard/components/Header";

const TEnterEmail = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Change history to navigate

  // Retrieve the email from localStorage when the component mounts
  useEffect(() => {
    const savedEmail = localStorage.getItem("forgotPasswordEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      

      // Send a POST request to the backend to initiate the password reset process
      await axios.post("http://localhost:8081/teacher/forgot-password", { email });

      // Display success message and navigate to login page
      alert("Password reset email sent. Please check your email inbox.");

      // delete the email in localStorage
      localStorage.removeItem("forgotPasswordEmail", email);
      // Navigate to login page
      navigate("/tLogin");
    } catch (error) {
      // Display error message if request fails
      setError("Failed to send password reset email. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: '#ECF0F5'}}>
      <Header />
      <div className="container-fluid">
      <div className="container" style={{marginTop: '10%', marginBottom: '10%'}}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4">Enter Your Email</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
              {error && <div className="text-danger mt-3">{error}</div>}
            </form>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default TEnterEmail;
