import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div class="container">
      <h1 class="header">Create Announcement</h1>
      <form class="announcement-form">
        <div class="form-section">
          <label for="teacher-name">Teacher Name:</label>
          <input
            type="text"
            id="teacher-name"
            name="teacher-name"
            required
          ></input>
        </div>
        <div class="form-section">
          <label for="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            maxlength="30"
            required
          ></input>
        </div>
        <div class="form-section">
          <label for="announcement">Announcement:</label>
          <textarea
            id="announcement"
            name="announcement"
            rows="7"
            required
          ></textarea>
        </div>
        <div class="form-actions">
          <button type="submit" class="button-upload">
            Upload Announcement
          </button>
          <button type="button" class="button-back">
            Back
          </button>
          <Link to={"/home2"}>
            <input type="button" id="preview-button">
              Preview
            </input>
          </Link>
        </div>
      </form>

      <div class="preview-overlay" id="preview-overlay">
        <div class="preview-content">
          <span class="close" id="close-preview">
            &times;
          </span>
          <div id="preview-container" class="preview-container"></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
