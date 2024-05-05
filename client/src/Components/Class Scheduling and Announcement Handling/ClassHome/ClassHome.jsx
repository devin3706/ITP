import React, { useState } from "react";
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
    <div class="container" onSubmit={submitWorkouts}>
      <h1>New Class Schedule </h1>
      <form id="classForm">
        <div class="form-group">
          <label htmlFor="teacherName">Teacher Name/ID:</label>
          <input
            type="text"
            id="teacherName"
            name="teacherName"
            onInput={(t) => {
              const inputValue = t.target.value;
              const filteredValue = inputValue.replace(/[^\w\s]/gi, ""); // Replace special characters with empty string
              t.target.value = filteredValue; // Update the input field value
              setteacherName(filteredValue); // Update the state with filtered value
            }}
            required
          ></input>
        </div>
        <div class="form-group">
          <label htmlFor="subject">Subject Name/ID:</label>
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
          <label htmlFor="date">Date:</label>
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
          <label htmlFor="time">Start Time:</label>
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
          <label htmlFor="duration">End Time:</label>
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
          <label htmlFor="venue">Venue:</label>
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
