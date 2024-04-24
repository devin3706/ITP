import React, { useState } from "react";
import {} from "react-router-dom";
import axios from "axios";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import Header from "../../Exam Platform and Leaderboard/components/Header";

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
      .post("http://localhost:8081/class/create", newWorkouts)
      .then(() => {
        alert("Class added successful.");
      })
      .catch((err) => {
        console.error("Error adding classes:", err);
        alert("Failed to add classes. Check console for details.");
      });
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center" style={{ backgroundColor: '#ECF0F5' }}>
      <Header/>
      <div className="w-50 bg-white rounded p-3 shadow">
        <form onSubmit={submitWorkouts} id="classForm">
          <h1>New Class Schedule</h1>
          <div className="form-group mb-2">
            <label htmlFor="teacherName">Teacher Name:</label>
            <input
              type="text"
              id="teacherName"
              name="teacherName"
              onChange={(t) => {
                setteacherName(t.target.value);
              }}
              className="form-control"
              required
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              onChange={(t) => {
                setsubject(t.target.value);
              }}
              className="form-control"
              required
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              onChange={(t) => {
                setdate(t.target.value);
              }}
              className="form-control"
              required
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="time">Start Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              onChange={(t) => {
                settime(t.target.value);
              }}
              className="form-control"
              required
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="duration">End Time:</label>
            <input
              type="time"
              id="duration"
              name="duration"
              onChange={(t) => {
                setduration(t.target.value);
              }}
              className="form-control"
              required
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="venue">Venue:</label>
            <select
              id="venue"
              name="venue"
              onChange={(t) => {
                setvenue(t.target.value);
              }}
              className="form-select"
              required
            >
              <option value="" disabled selected>Select Venue</option>
              <option value="venue1">Venue 1</option>
              <option value="venue2">Venue 2</option>
              <option value="venue3">Venue 3</option>
              <option value="venue4">Venue 4</option>
            </select>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <button type="submit" className="btn btn-success">Create</button>
            <button type="button" className="btn btn-grey">Back</button>
          </div>
          <div id="message" className="hidden"></div>
        </form>
      </div>
      <Footer/>
    </div>

  );
}

export default Home;
