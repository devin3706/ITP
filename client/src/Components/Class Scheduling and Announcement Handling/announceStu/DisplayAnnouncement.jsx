import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import Header from "../../Exam Platform and Leaderboard/components/Header";

const DisplayAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/announcements/"
        );
        setAnnouncements(response.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <div style={{ backgroundColor: "#ECF0F5" }}>
      <Header />

      <div
        className="mt-5 mb-5"
        style={{ maxWidth: "800px", margin: "0 auto" }}
      >
        <h2 className="alert alert-info border border-dark rounded-4">
          Announcements
        </h2>
        {announcements.length === 0 ? (
          <p>No announcements available.</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {announcements.map((announcement) => (
              <div
                key={announcement._id}
                style={{
                  width: "calc(50% - 20px)",
                  margin: "10px",
                  backgroundColor: "#FFFFFF",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "2px solid blue",
                }}
              >
                <div>
                  <strong className="fw-bold">Teacher Name:</strong>{" "}
                  {announcement.TeacherNameID}
                </div>
                <div>
                  <strong className="fw-bold">Subject:</strong>{" "}
                  {announcement.SubjectSubjectID}
                </div>
                <div>
                  <strong className="fw-bold">Announcement:</strong>{" "}
                  {announcement.Announcement}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default DisplayAnnouncement;
