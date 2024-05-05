import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function ReadAnnounce() {
  const [announcements, setAnnouncements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    function readWorkouts() {
      axios
        .get("http://localhost:8081/announcements")
        .then((res) => {
          setAnnouncements(res.data);
        })
        .catch((err) => {
          console.error("Error fetching workouts:", err);
          alert("Failed to load workouts. Check console for details.");
        });
    }
    readWorkouts();
  }, []);

  function handleDelete(id) {
    axios
      .delete(`http://localhost:8081/announcements/${id}`)
      .then(() => {
        alert("Class Deleted.");
        navigate("/readAnnouncements");
      })
      .catch((err) => {
        console.error("Error deleting workout:", err);
        alert("Failed to delete class. Check console for details.");
      });
  }

  return (
    <div style={{ width: "100%" }} className="fullDiv m-5">
      <div style={{ display: "flex", flexWrap: "wrap" }} className="row">
        {announcements.map((announce) => (
          <div
            key={announce._id}
            style={{ flex: "0 0 50%", maxWidth: "50%" }}
            className="col-md-6 p-4"
          >
            <div className="card-block p-4 rounded-3 text-start text-primary workout-card">
              <form className="workout-form">
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                  className="input-group"
                >
                  <div
                    style={{
                      flex: "0 0 calc(50% - 10px)",
                      maxWidth: "calc(50% - 10px)",
                      marginBottom: "10px",
                    }}
                    className="input-box"
                  >
                    <label style={{ fontWeight: "bold" }}>
                      Teacher Name ID
                    </label>
                    <input
                      value={announce.TeacherNameID}
                      className="form-control"
                      disabled
                    />
                  </div>
                  <div
                    style={{
                      flex: "0 0 calc(50% - 10px)",
                      maxWidth: "calc(50% - 10px)",
                      marginBottom: "10px",
                    }}
                    className="input-box"
                  >
                    <label style={{ fontWeight: "bold" }}>Subject ID</label>
                    <input
                      value={announce.SubjectSubjectID}
                      className="form-control"
                      disabled
                    />
                  </div>
                  <div
                    style={{ flex: "0 0 100%", marginBottom: "10px" }}
                    className="input-box"
                  >
                    <label style={{ fontWeight: "bold" }}>Announcement</label>
                    <textarea
                      value={announce.Announcement}
                      className="form-control"
                      disabled
                    />
                  </div>
                  <div
                    style={{ marginTop: "10px" }}
                    className="input-group-btn"
                  >
                    <Link to={`/updateAnnouncement/${announce._id}`}>
                    <button
                        type="button"
                        className="btn btn-primary update-button"
                      >
                        Update
                      </button>
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger delete-button"
                      onClick={() => handleDelete(announce._id)}
                      style={{ width: "100%", backgroundColor: "red" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
