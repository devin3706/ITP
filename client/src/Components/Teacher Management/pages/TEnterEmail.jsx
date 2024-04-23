import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import Header from "../../Exam Platform and Leaderboard/components/Header";

const TEnterEmail = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Change history to navigate

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("http://localhost:8081/teacher/forgot-password", { email });
      alert("Password reset email sent.  Please check your email inbox.");
      navigate("/tLogin"); // Change history.push to navigate
    } catch (error) {
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

const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  inputContainer: {
    width: '250px',
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '3px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '3px',
    border: 'none',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default TEnterEmail;
