import React, { useState } from "react";
import "./Class.css";
import {} from "react-router-dom";
import axios from "axios";

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
    <div class="container" onSubmit={submitWorkouts}>
      <h1>New Class Schedule </h1>
      <form id="classForm">
        <div class="form-group">
          <label for="teacherName">Teacher Name:</label>
          <input
            type="text"
            id="teacherName"
            name="teacherName"
            onChange={(t) => {
              setteacherName(t.target.value);
            }}
            required
          ></input>
        </div>
        <div class="form-group">
          <label for="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            onChange={(t) => {
              setsubject(t.target.value);
            }}
            required
          ></input>
        </div>
        <div class="form-group">
          <label for="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            onChange={(t) => {
              setdate(t.target.value);
            }}
            required
          ></input>
        </div>
        <div class="form-group">
          <label for="time">Start Time:</label>
          <input
            type="time"
            id="time"
            name="time"
            onChange={(t) => {
              settime(t.target.value);
            }}
            required
          ></input>
        </div>
        <div class="form-group">
          <label for="duration">End Time:</label>
          <input
            type="time"
            id="duration"
            name="duration"
            onChange={(t) => {
              setduration(t.target.value);
            }}
            required
          ></input>
        </div>
        <div class="form-group">
          <label for="venue">Venue:</label>
          <select
            id="venue"
            name="venue"
            onChange={(t) => {
              setvenue(t.target.value);
            }}
            required
          >
            <option value="" disabled selected>
              Select Venue
            </option>
            <option value="venue1">Venue 1</option>
            <option value="venue2">Venue 2</option>
            <option value="venue3">Venue 3</option>
            <option value="venue4">Venue 4</option>
          </select>
        </div>
        <div class="buttons">
          <button type="submit" class="create-button">
            Create
          </button>
          <button type="button" class="back-button">
            Back
          </button>
        </div>
      </form>
      <div id="message" class="hidden"></div>
    </div>
  );
}

export default Home;
