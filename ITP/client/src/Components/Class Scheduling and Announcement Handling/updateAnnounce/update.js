import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import Header from "../../Exam Platform and Leaderboard/components/Header";

function Update() {
  // Capitalized the first letter of the function name
  const { id } = useParams();
  console.log("Announcement id :", id);

  const navigate = useNavigate();

  const [TeacherNameID, setUpdateTeacherNameID] = useState("");
  const [SubjectSubjectID, setUpdateSubjectSubjectID] = useState("");
  const [Announcement, setUpdateAnnouncement] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8081/announcements/${id}`)
      .then((res) => {
        console.log(res.data);
        setUpdateTeacherNameID(res.data.TeacherNameID);
        setUpdateSubjectSubjectID(res.data.SubjectSubjectID);
        setUpdateAnnouncement(res.data.Announcement);
      })
      .catch((err) => {
        alert("Error fetching announcement:", err);
      });
  }, [id]);

  const editAnnouncement = (e) => {
    e.preventDefault();

    const updatedannounce = {
      TeacherNameID,
      SubjectSubjectID,
      Announcement,
    };

    axios
      .put(
        `http://localhost:8081/announcements/${id}`,
        updatedannounce
      )
      .then((result) => {
        console.log(result);
        alert("Updated successfully.");
        navigate("/readAnnouncement");
      })
      .catch((err) => {
        console.error("Error updating announcement:", err);
        alert("Failed to update announcement. Check console for details.");
      });
  };

  return (
    <div style={{ backgroundColor: '#ECF0F5'}}>
      <Header/>
      <div className="container fullDiv">
        <div className="container bg-white mt-10 mb-10 col-8 rounded-3 shadow p-3">
        <h1 className="text-center mb-4">Edit Announcement</h1>
          <form className="justify-content-center" onSubmit={editAnnouncement}>
            <div className="">
              <div className="mb-3">
                <label htmlFor="TeacherNameID" className="form-label">
                  Teacher Name/ID:
                </label>
                <input
                  type="text"
                  id="TeacherNameID"
                  name="TeacherNameID"
                  value={TeacherNameID}
                  onChange={(e) => setUpdateTeacherNameID(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="SubjectSubjectID" className="form-label">
                  Subject/Subject ID:
                </label>
                <input
                  id="SubjectSubjectID"
                  name="SubjectSubjectID"
                  value={SubjectSubjectID}
                  onChange={(e) => setUpdateSubjectSubjectID(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Announcement" className="form-label">
                  Announcement:
                </label>
                <textarea
                  id="Announcement"
                  name="Announcement"
                  value={Announcement}
                  onChange={(e) => setUpdateAnnouncement(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-info">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Update; // Exported the component correctly
