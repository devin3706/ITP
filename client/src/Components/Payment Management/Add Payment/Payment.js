import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();

  // State variables to store from data
  const [studentName, setStudentName] = useState("");
  const [course, setCourse] = useState("");
  const [sid, setSid] = useState("");
  const [contactNumber, setContactNumber] = useState(0);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const submitWorkouts = (t) => {
    t.preventDefault();

    const newWorkouts = {
      studentName,
      course,
      sid,
      contactNumber,
      address,
      email,
    };

    axios
      .post("http://localhost:4000/workouts/create", newWorkouts)
      .then(() => {
        alert("payment added successful.");
        navigate("/paymentdetails");
      })
      .catch((err) => {
        console.error("Error adding workouts:", err);
        alert("Failed to add workouts. Check console for details.");
      });
  };

  return (
    <div className="fullDiv m-5 p-4 bg-dark text-white rounded-4 col-10 mx-auto">
      <h1>Add Payment</h1>

      <div className="row">
        <form onSubmit={submitWorkouts}>
          <div className="col-12 text-warning">
            <div className="row">
              <div className="">
                <label htmlFor="studentName" className="form-label">
                  Student Name:
                </label>

                <input
                  className="form-control"
                  type="text"
                  id="studentName"
                  name="studentName"
                  onChange={(t) => {
                    setStudentName(t.target.value);
                  }}
                  required
                />
              </div>
              <div className="">
                <label htmlFor="sid" className="form-label">
                  Student ID:
                </label>

                <input
                  className="form-control"
                  type="text"
                  id="sid"
                  name="sid"
                  onChange={(t) => {
                    setSid(t.target.value);
                  }}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-5  ">
                <label htmlFor="course" className="form-label">
                  Select Course:
                </label>

                <select
                  className="form-control"
                  id="course"
                  name="course"
                  onChange={(t) => {
                    setCourse(t.target.value);
                  }}
                  required
                >
                  <option value="">Select Course</option>
                  <option value="A/L">Advance Level(A/L)</option>
                  <option value="O/L">Ordinary Level(O/L)</option>
                </select>
              </div>

              <div className="">
                <label htmlFor="contactNumber" className="form-label">
                  Contact No:
                </label>

                <input
                  className="form-control"
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  placeholder="07********"
                  onChange={(t) => {
                    setContactNumber(t.target.value);
                  }}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="">
                <label htmlFor="address" className="form-label">
                  Address:{" "}
                </label>

                <input
                  className="form-control"
                  type="text"
                  id="address"
                  name="address"
                  onChange={(t) => {
                    setAddress(t.target.value);
                  }}
                  required
                />
              </div>

              <div className="">
                <label htmlFor="email" className="form-label">
                  E-mail:
                </label>

                <input
                  className="form-control"
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Example@address.com"
                  onChange={(t) => {
                    setEmail(t.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <br></br>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <Link to={"/onlinePay"}>
                <button type="button" className="btn btn-success">
                  Pay Online
                </button>
              </Link>
            </div>
            <br></br>
          </div>
        </form>
        <div className="col-md-6">
          <img
            src="https://www.searchenginejournal.com/wp-content/uploads/2020/03/the-top-10-most-popular-online-payment-solutions-5e9978d564973-1280x720.png"
            alt="nur"
            style={{ maxHeight: "600px", maxWidth: "550px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Payment;
