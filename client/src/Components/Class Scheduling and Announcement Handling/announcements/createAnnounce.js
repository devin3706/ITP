import React, { useState } from "react";
import axios from "axios";

function Announce() {
  const [teacherNameID, setTeacherNameID] = useState("");
  const [subjectSubjectID, setSubjectSubjectID] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [announcementContent, setAnnouncementContent] = useState("");

  const submitAnnouncements = (event) => {
    event.preventDefault();

    const newAnnouncement = {
      TeacherNameID: teacherNameID,
      SubjectSubjectID: subjectSubjectID,
      Announcement: announcement,
    };

    axios
      .post("http://localhost:8081/announcements/create", newAnnouncement)
      .then(() => {
        alert("Announcement added successfully.");
        console.log(newAnnouncement);
      })
      .catch((err) => {
        console.error("Error adding announcement:", err);
        alert("Failed to add announcement. Check console for details.");
      });
  };

  const handlePreviewClick = () => {
    const content = document.getElementById("announcement").value;
    setAnnouncementContent(content);
    document.getElementById("preview-overlay").style.display = "block";
  };

  const handleClosePreview = () => {
    document.getElementById("preview-overlay").style.display = "none";
  };

  const handleTeacherNameInput = (event) => {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/[^a-zA-Z0-9\s]/g, ""); // Remove special characters
    setTeacherNameID(sanitizedValue);
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#000" }}>
        Create Announcement
      </h1>
      <form onSubmit={submitAnnouncements}>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="teacher-name"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Teacher Name/ID:
          </label>
          <input
            type="text"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            id="teacher-name"
            name="teacher-name"
            value={teacherNameID}
            onInput={handleTeacherNameInput}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="subject"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Subject/Subject ID:
          </label>
          <input
            type="text"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            id="subject"
            name="subject"
            maxLength="30"
            onChange={(event) => {
              setSubjectSubjectID(event.target.value);
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="announcement"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Announcement:
          </label>
          <textarea
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            id="announcement"
            name="announcement"
            rows="7"
            onChange={(event) => {
              setAnnouncement(event.target.value);
            }}
            required
          ></textarea>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "rgb(36, 191, 36)",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Upload Announcement
          </button>
          <button
            type="button"
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "rgb(36, 191, 36)",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Back
          </button>
          <button
            type="button"
            id="preview-button"
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "rgb(36, 191, 36)",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={handlePreviewClick}
          >
            Preview
          </button>
        </div>
      </form>

      <div
        style={{
          display: "none",
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: "9999",
        }}
        id="preview-overlay"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#333",
            color: "#fff",
            padding: "20px",
            borderRadius: "5px",
          }}
          className="preview-content"
        >
          <span
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              fontSize: "20px",
              cursor: "pointer",
            }}
            id="close-preview"
            onClick={handleClosePreview}
          >
            &times;
          </span>
          <div
            style={{ marginTop: "10px", padding: "10px" }}
            className="preview-container"
          >
            {announcementContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Announce;
