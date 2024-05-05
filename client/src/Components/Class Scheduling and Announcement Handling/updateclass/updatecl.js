import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateClass() {
  const { id } = useParams();
  console.log("Announcement id :", id);

  const navigate = useNavigate();
 
  // State variables to store form data
  const [teacherName, setTeacherName] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [venue, setVenue] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8081/classes/${id}`)
      .then((res) => {
        const data = res.data;
        setTeacherName(data.teacherName);
        setSubject(data.subject);
        setDate(data.date);
        setTime(data.time);
        setDuration(data.duration);
        setVenue(data.venue);
      })
      .catch((err) => {
        console.error("Error fetching class details:", err);
        alert("Failed to fetch class details. Check console for details.");
      });
  }, [id]);

  const editClass = (e) => {
    e.preventDefault();

    const updateWorkout = {
      teacherName,
      subject,
      date,
      time,
      duration,
      venue,
    };

    axios
      .put(`http://localhost:8081/classes/${id}`, updateWorkout)
      .then((result) => {
        console.log(result);
        alert("Updated successfully.");
        navigate("/readClass");
      })
      .catch((err) => {
        console.error("Error updating class:", err);
        alert("Failed to update class. Check console for details.");
        console.log("Update Payload:", updateWorkout);
      });
  };

  return (
    <div className="container">
      <h1>Edit Class Schedule</h1>
      <form id="classForm" onSubmit={editClass}>
        <div className="form-group">
          <label htmlFor="teacherName">Teacher Name:</label>
          <input
            type="text"
            id="teacherName"
            name="teacherName"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Start Time:</label>
          <input
            type="time"
            id="time"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">End Time:</label>
          <input
            type="time"
            id="duration"
            name="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="venue">Venue:</label>
          <select
            id="venue"
            name="venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Venue
            </option>
            <option value="venue1">Venue 1</option>
            <option value="venue2">Venue 2</option>
            <option value="venue3">Venue 3</option>
            <option value="venue4">Venue 4</option>
          </select>
        </div>
        <div className="buttons">
          <button type="submit" className="create-button">
            Update
          </button>
        </div>
      </form>
      <div id="message" className="hidden"></div>
    </div>
  );
}

export default UpdateClass;
