import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import Header from "../../Exam Platform and Leaderboard/components/Header";

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
        navigate("/readAnnouncement");
      })
      .catch((err) => {
        console.error("Error deleting workout:", err);
        alert("Failed to delete class. Check console for details.");
      });
  }

  return (
    <div style={{ backgroundColor: '#ECF0F5'}}>
      <Header/>
      <div className="container fullDiv mt-5 mb-5">
        <h1 className="text-center mb-4">Announcements</h1>
        <div className="row justify-content-center">
          {announcements.map((announce) => (
            <div key={announce._id} className="col-md-6">
              <div className="card rounded-3 shadow p-3 mb-4">
                <form className="workout-form">
                  <div className="mb-3">
                    <label className="form-label">Teacher Name ID</label>
                    <input
                      value={announce.TeacherNameID}
                      className="form-control"
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Subject ID</label>
                    <input
                      value={announce.SubjectSubjectID}
                      className="form-control"
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Announcement</label>
                    <textarea
                      value={announce.Announcement}
                      className="form-control"
                      disabled
                    />
                  </div>
                  <div className="mb-3 d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(announce._id)}
                    >
                      Delete
                    </button>
                    <Link to={`/updateAnnouncement/${announce._id}`}>
                      <button type="button" className="btn btn-primary">
                        Update
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
