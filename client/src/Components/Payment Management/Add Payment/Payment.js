import React, { useState } from "react";
import "./Payment.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Payment() {
  // State variables to store form data
  const [studentName, setStudentName] = useState("");
  const [course, setCourse] = useState("");
  const [sid, setSid] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const submitWorkouts = (event) => {
    event.preventDefault();

    const newWorkouts = {
      studentName,
      course,
      sid,
      contactNumber,
      address,
      email,
    };

    axios
      .post("http://localhost:8081/workouts/create", newWorkouts)
      .then(() => {
        alert("Workout added successfully.");
      })
      .catch((err) => {
        console.error("Error adding workout:", err);
        alert("Failed to add workout. Check console for details.");
      });
  };

  return (
    <div>
      <h1>Add Payment</h1>
      <br />
      <div className="fullDiv m-5">
        <form onSubmit={submitWorkouts}>
          <div className="row g-3 text-primary">
            <div className="col-md-6">
              <label htmlFor="studentName">[1] Student Name:</label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="course">[2] Select Course:</label>
              <select
                id="course"
                name="course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
              >
                <option value="">Select Course</option>
                <option value="A/L">Advance Level(A/L)</option>
                <option value="O/L">Ordinary Level(O/L)</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="sid">[3] Student ID:</label>
              <input
                type="text"
                id="sid"
                name="sid"
                value={sid}
                onChange={(e) => setSid(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="contactNumber">[4] Contact No:</label>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                value={contactNumber}
                placeholder="07********"
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="address">[5] Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="email">[6] E-mail:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                placeholder="Example@address.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <input type="submit" value="Submit" />
            </div>
            <div className="col-md-6">
              <Link to={"/onlinePay"}>
                <input type="button" value="Pay Online" />
              </Link>
            </div>
            <div className="col-md-6">
              <Link to={"/paymentdetails"}>
                <input type="button" value="Payment Details" />
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Payment;