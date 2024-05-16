import React, { useState } from "react";
import { Link } from "react-router-dom";
import {} from "react-router-dom";
import axios from "axios";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import Header from "../../Exam Platform and Leaderboard/components/Header";
import SideNavbar from "../../Teacher Management/component/SideNavbar";

function Home() {
  // State variables to store from data
  const [teacherName, setteacherName] = useState("");
  const [subject, setsubject] = useState("");
  const [date, setdate] = useState(0);
  const [time, settime] = useState(0);
  const [duration, setduration] = useState(0);
  const [venue, setvenue] = useState("");

  const submitWorkouts = (t) => {
    t.preventDefault();

    const newWorkouts = {
      teacherName,
      subject,
      date,
      time,
      duration,
      venue,
    };

    axios
      .post("http://localhost:8081/classes/create", newWorkouts)
      .then(() => {
        alert("Class added successful.");
        console.log(newWorkouts);
      })
      .catch((err) => {
        console.error("Error adding workouts:", err);
        alert("Failed to add class. Check console for details.");
      });
  };

  return (
    <div style={{ backgroundColor: '#ECF0F5' }}>
      <Header/>
      <SideNavbar />

      <div className="container bg-white col-6 mt-5 rounded-3 shadow mt-5 mb-5 p-3">
        <h1 className="text-center mb-5">New Class Schedule</h1>
        <form id="classForm" onSubmit={submitWorkouts}>
          <div className="mb-3">
            <label htmlFor="teacherName" className="form-label">Teacher Name/ID:</label>
            <input
              type="text"
              id="teacherName"
              name="teacherName"
              className="form-control"
              onInput={(t) => {
                const inputValue = t.target.value;
                const filteredValue = inputValue.replace(/[^\w\s]/gi, ""); // Replace special characters with empty string
                t.target.value = filteredValue; // Update the input field value
                setteacherName(filteredValue); // Update the state with filtered value
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="subject" className="form-label">Subject Name/ID:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="form-control"
              onChange={(t) => {
                setsubject(t.target.value);
              }}
              required
            />
          </div>
          <div className="mb-3 w-50">
            <label htmlFor="date" className="form-label">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              className="form-control"
              onChange={(t) => {
                setdate(t.target.value);
              }}
              required
            />
          </div>
          <div className="mb-3 w-50">
            <label htmlFor="time" className="form-label">Start Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              className="form-control"
              onChange={(t) => {
                settime(t.target.value);
              }}
              required
            />
          </div>
          <div className="mb-3 w-50">
            <label htmlFor="duration" className="form-label">End Time:</label>
            <input
              type="time"
              id="duration"
              name="duration"
              className="form-control"
              onChange={(t) => {
                setduration(t.target.value);
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="venue" className="form-label">Venue:</label>
            <select
              id="venue"
              name="venue"
              className="form-select"
              onChange={(t) => {
                setvenue(t.target.value);
              }}
              required
            >
              <option value="" disabled selected>Select Venue</option>
              <option value="venue1">Venue 1</option>
              <option value="venue2">Venue 2</option>
              <option value="venue3">Venue 3</option>
              <option value="venue4">Venue 4</option>
            </select>
          </div>
          <div className="mb-3 d-flex justify-content-between">
            <button type="button" className="btn btn-info">Back</button>
            <Link to='/readclass' type="submit" className="btn btn-primary me-3">Create</Link>
          </div>
        </form>
        <div id="message" className=""></div>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
