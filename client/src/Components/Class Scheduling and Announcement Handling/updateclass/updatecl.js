import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import Header from "../../Exam Platform and Leaderboard/components/Header";

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
    <div style={{ backgroundColor: '#ECF0F5'}}>
      <Header/>
      <div className="container bg-white col-6 rounded-3 shadow mt-5 mb-5 p-3">
        <h1 className="mb-4 text-center">Edit Class Schedule</h1>
        <form id="classForm" onSubmit={editClass}>
          <div className="mb-3">
            <label htmlFor="teacherName" className="form-label">Teacher Name:</label>
            <input
              type="text"
              id="teacherName"
              name="teacherName"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="subject" className="form-label">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3 w-50">
            <label htmlFor="date" className="form-label">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3 w-50">
            <label htmlFor="time" className="form-label">Start Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3 w-50">
            <label htmlFor="duration" className="form-label">End Time:</label>
            <input
              type="time"
              id="duration"
              name="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="venue" className="form-label">Venue:</label>
            <select
              id="venue"
              name="venue"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="form-select"
              required
            >
              <option value="" disabled>Select Venue</option>
              <option value="venue1">Venue 1</option>
              <option value="venue2">Venue 2</option>
              <option value="venue3">Venue 3</option>
              <option value="venue4">Venue 4</option>
            </select>
          </div>
          <div className="mb-3 d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">Update</button>
          </div>
        </form>
        <div id="message" className="hidden"></div>
      </div>
      <Footer/>
    </div>
  );
}

export default UpdateClass;
