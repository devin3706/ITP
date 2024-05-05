import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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
    <div className="fullDiv m-5 p-4 bg-dark text-white rounded-4 col-10 mx-auto">
      <h1>Edit Announcement</h1>
      <div className="row">
        <form onSubmit={editAnnouncement}>
          <div className="col-12 text-warning">
            <div className=" ">
              <label htmlFor="TeacherNameID" className="form-label">
                Teacher Name/ID:
              </label>{" "}
              <br />
              <input
                type="text"
                id="TeacherNameID"
                name="TeacherNameID"
                value={TeacherNameID}
                onChange={(e) => {
                  setUpdateTeacherNameID(e.target.value);
                }}
                required
              />
            </div>
            <div className="">
              <label htmlFor="SubjectSubjectID" className="form-label">
                Subject/Subject ID:
              </label>{" "}
              <br />
              <input
                id="SubjectSubjectID"
                name="SubjectSubjectID"
                value={SubjectSubjectID}
                onChange={(e) => {
                  setUpdateSubjectSubjectID(e.target.value);
                }}
                required
              />
            </div>
            <div className="">
              <label htmlFor="Announcement" className="form-label">
                Announcement:
              </label>{" "}
              <br />
              <input
                type="text"
                id="Announcement"
                name="Announcement"
                value={Announcement}
                onChange={(e) => {
                  setUpdateAnnouncement(e.target.value);
                }}
                required
              />
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-warning">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Update; // Exported the component correctly
