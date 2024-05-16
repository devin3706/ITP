import { useEffect, useState } from "react";
import axios from "axios";
import { pdfjs } from "react-pdf";
import PdfComp from "../Study Material and Past Paper Management/PdfComp.js";
import Header from "../Exam Platform and Leaderboard/components/Header";
import Footer from "../Exam Platform and Leaderboard/components/Footer";
import SideNavbar from '../Teacher Management/component/SideNavbar.jsx';
import './styles/PastPaperUpload.css';
import jsPDF from 'jspdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

function PdfApp() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState("");
  const [file, setFile] = useState("");
  const [subject, setSubject] = useState(""); // Define subject state
  const [allPdf,setAllPdf]=useState(null); 
  const [pdfFile, setPdfFile] = useState(null);
  const [editFormData, setEditFormData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showPdfPopup, setShowPdfPopup] = useState(false);

  useEffect(() => {
    getPdf();
  }, []);
  
    const getPdf = async () =>{
    const result = await axios.get("http://localhost:8081/studyMaterial/get-files");
    console.log(result.data.data);
    setAllPdf(result.data.data); 
  };

 

  const submitPdf = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("grade", grade);
    formData.append("subject", subject);
    formData.append("file", file);
    console.log(title,description,grade,subject, file);

    try {
      const result = await axios.post("http://localhost:8081/studyMaterial/upload-pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(result);

      if (result.data.status === "ok") {
        alert("Uploaded Successfully!!");
        getPdf();
      }
    } catch (error) {
      console.error("Error uploading PDF:", error);
    }
  };

  const showPdf = (pdf) => {
   setPdfFile(`http://localhost:8081/studyMaterial/files/${pdf}`)
   setShowPdfPopup(true); 
  };

  const closePdfPopup = () => {
    setShowPdfPopup(false); // Close the PDF popup
  };

   
 
   const deletePdf = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure to delete this file?");
      if (confirmed) {
        const result = await axios.delete(`http://localhost:8081/studyMaterial/delete-pdf/${id}`);
        if (result.data.status === "ok") {
          alert("PDF Deleted Successfully!!");
          getPdf();
        }
      } else {
        // Handle cancellation
        console.log("Deletion cancelled");
      }
    } catch (error) {
      console.error("Error deleting PDF:", error);
    }
  };
  const openEditForm = (data) => {
    setEditFormData(data);
    setShowEditForm(true);
  };

  const closeEditForm = () => {
    setEditFormData(null);
    setShowEditForm(false);
  };

 
const saveEdit = async (e) => {
  e.preventDefault();

  const errors = validateForm();
  if (Object.keys(errors).length) {
    alert("Please fill in all fields correctly.");
    return; // Prevent submission if errors exist
  }

  const formData = new FormData();
  formData.append("title", editFormData.title);
  formData.append("description", editFormData.description);
  formData.append("grade", editFormData.grade);
  formData.append("subject", editFormData.subject);
  if (editFormData.file) {
    formData.append("file", editFormData.file);
  }

  try {
    const result = await axios.put(`http://localhost:8081/studyMaterial/update-pdf/${editFormData._id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    if (result.data.status === "ok") {
      alert("PDF details updated successfully!!");
      closeEditForm();
      getPdf(); // Refresh the list to show the updated details
    }
  } catch (error) {
    console.error("Error updating PDF details:", error);
  }
};
  

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    // Update state using functional update to ensure the latest state is used
    setEditFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };
  

  const handleEditFormFileChange = (e) => {
    const file = e.target.files[0];
    setEditFormData({ ...editFormData, file });
  };

  const validateForm = () => {
    // Check if any field is empty; add more validation as needed
    const errors = {};
    if (!editFormData.title.trim()) errors.title = "Title is required";
    if (!editFormData.description.trim()) errors.description = "Description is required";
    if (!editFormData.grade.trim()) errors.grade = "Grade is required";
    if (!editFormData.subject.trim()) errors.subject = "Subject is required";
  
    return errors;
  };

  const generateReport = () => {
    const doc = new jsPDF();
    let y = 10;
    allPdf.forEach(pdf => {
      doc.text(`Title: ${pdf.title}`, 10, y);
      doc.text(`Description: ${pdf.description}`, 10, y + 10);
      doc.text(`Grade: ${pdf.grade}`, 10, y + 20);
      doc.text(`Subject: ${pdf.subject}`, 10, y + 30);
      doc.text(`File Name: ${pdf.pdf}`, 10, y + 40);
      y += 50;
    });
  
    doc.save('Study Material Report.pdf');
  };
  

  return (
    <div style={{backgroundColor: '#ECF0F5'}}>
        <div>
            <Header />
            <SideNavbar />
        </div>
    <div className="App">
    <form className="fullDiv m-5 p-4 bg-dark text-white rounded-4 col-10 mx-auto" onSubmit={submitPdf}>
      <h4>Upload Study Materials</h4>
      <input
        type="text"
        className="form-control"
        placeholder="Title"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <input
        type="text"
        className="form-control"
        placeholder="Description"
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <select
        className="form-control"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
      >
        <option value="">Select Grade</option>
        <option value="Grade 10">Grade 10</option>
        <option value="Grade 11">Grade 11</option>
        <option value="A/L">A/L</option>
      </select>
      <br />
      <select
        className="form-control"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      >
        <option value="">Select Subject</option>
        <option value="Business Studies">Business Studies</option>
        <option value="Accounting">Accounting</option>
        <option value="Economics">Economics</option>
        <option value="Business Statistics">Business Statistics</option>
      </select>
      <br />
      <input
        type="file"
        className="form-control"
        placeholder="application/pdf"
        required
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <button className="btn btn-primary" type="submit">Submit</button>
    
    </form>

    <div className="fullDiv m-5 p-4 bg-dark text-white rounded-4 col-10 mx-auto">
      <br />
      <button className="btn btn-secondary" onClick={generateReport}>Generate Report</button>
      <h4>Uploaded Study Materials:</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Grade</th>
            <th>Subject</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allPdf && allPdf.map((data) => (
            <tr key={data._id} className="table-row">
              <td>{data.title}</td>
              <td>{data.description}</td>
              <td>{data.grade}</td>
              <td>{data.subject}</td>
              <td>
                <button className="btn btn-primary" onClick={() => showPdf(data.pdf)} style={{ marginRight: '10px' }}>Show</button>
                <button className="btn btn-danger" onClick={() => deletePdf(data._id)} style={{ marginRight: '10px' }}>Delete</button>
                <button className="btn btn-warning" onClick={() => openEditForm(data)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {showPdfPopup && (
      <div className="pdf-modal-backdrop">
        <div className="pdf-modal-content">
          <span className="pdf-modal-close" onClick={closePdfPopup}>&times;</span>
          <PdfComp pdfFile={pdfFile} onClose={closePdfPopup} />
        </div>
      </div>
    )}                              
    
    {showEditForm && (
      <div className="modal-backdrop">
        <div className="modal-content">
          <span className="close-button" onClick={closeEditForm}>&times;</span>
          <h4>Edit PDF Details</h4>
          <form className="formStyle2" onSubmit={saveEdit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" name="title" value={editFormData.title} onChange={handleEditFormChange} required />
              {editFormData.title === "" && <p className="error">Title is required</p>}
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input type="text" id="description" name="description" value={editFormData.description} onChange={handleEditFormChange} required />
              {editFormData.description === "" && <p className="error">Description is required</p>}
            </div>
            <div className="form-group">
              <label htmlFor="grade">Grade:</label>
              <select className="form-control" value={editFormData.grade} onChange={handleEditFormChange} name="grade">
                <option value="">Select Grade</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="A/L">A/L</option>
              </select>
              {editFormData.grade === "" && <p className="error">Grade is required</p>}
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <select className="form-control" value={editFormData.subject} onChange={handleEditFormChange} name="subject">
                <option value="">Select Subject</option>
                <option value="Business Studies">Business Studies</option>
                <option value="Accounting">Accounting</option>
                <option value="Economics">Economics</option>
                <option value="Business Statistics">Business Statistics</option>
              </select>
              {editFormData.subject === "" && <p className="error">Subject is required</p>}
            </div>
            <div className="form-group">
              <label htmlFor="file">File:</label>
              <input type="file" id="file" onChange={handleEditFormFileChange} />
              {editFormData.file === "" && <p className="error">This field is required</p>}
            </div>
            <div className="button-group">
              <button type="submit" className="btn btn-primary">Save Changes</button>
              <button type="button" onClick={closeEditForm} className="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )}
     
    <Footer/>
  </div>
</div>
  );

  
}

export default PdfApp;
