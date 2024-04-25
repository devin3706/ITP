import './styles/PastPaperUpload.css';
import { useEffect, useState } from "react";
import axios from "axios";
import PdfComp from "../Study Material and Past Paper Management/PdfComp.js";
import Header from "../Exam Platform and Leaderboard/components/Header";
import Footer from "../Exam Platform and Leaderboard/components/Footer.js";


function PastPaperUpload() {
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState("");
  const [file, setFile] = useState("");
  const [subject, setSubject] = useState(""); 
  const [allPastPapers, setAllPastPapers] = useState(null); 
  const [pdfFile, setPdfFile] = useState(null);
  const [editFormData, setEditFormData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showPdfPopup, setShowPdfPopup] = useState(false);

  useEffect(() => {
    fetchPastPapers();
  }, []);

  const fetchPastPapers = async () => {
    try {
      const result = await axios.get("http://localhost:8081/studyMaterial/get-past-papers-files");
      setAllPastPapers(result.data.data); 
    } catch (error) {
      console.error('Error fetching past papers:', error);
    }
  };

  const submitPastPaper = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("year", year);
    formData.append("description", description);
    formData.append("grade", grade);
    formData.append("subject", subject);
    formData.append("file", file);

    try {
      const result = await axios.post("http://localhost:8081/studyMaterial/upload-past-paper", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (result.data.status === "ok") {
        alert("Uploaded Successfully!!");
        fetchPastPapers();
      }
    } catch (error) {
      console.error("Error uploading PDF:", error);
    }
  };

  const showPdf = (pastPaper) => {
    setPdfFile(`http://localhost:8081/studyMaterial/files/${pastPaper.pdf}`)
    setShowPdfPopup(true); 
   };
 
   const closePdfPopup = () => {
     setShowPdfPopup(false); // Close the PDF popup
   };
 
    

  const deletePastPaper = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure to delete this file?");
      if (confirmed) {
        const result = await axios.delete(`http://localhost:8081/studyMaterial/delete-past-papers-pdf/${id}`);
        if (result.data.status === "ok") {
          alert("Past Paper Deleted Successfully!!");
          fetchPastPapers();
        }
      } else {
        console.log("Deletion cancelled");
      }
    } catch (error) {
      console.error("Error deleting Past Paper:", error);
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
    e.preventDefault(); // Prevent the form from causing a page reload
    const formData = new FormData();
    formData.append("year", editFormData.year);
    formData.append("description", editFormData.description);
    formData.append("grade", editFormData.grade);
    formData.append("subject", editFormData.subject);
  
    if (editFormData.file) {
      formData.append("file", editFormData.file);
    }
  
    try {
      const result = await axios.put(`http://localhost:8081/studyMaterial/update-past-papers-pdf/${editFormData._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (result.data.status === "ok") {
        alert("Past Paper details updated successfully!!");
        closeEditForm();
        fetchPastPapers(); // Refresh the list to show the updated details
      }
    } catch (error) {
      console.error("Error updating Past Paper details:", error);
    }
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditFormFileChange = (e) => {
    const file = e.target.files[0];
    setEditFormData({ ...editFormData, file });
  };

  const generateReport = () => {
    const csvRows = [
      ['Year', 'Description', 'Grade', 'Subject', 'File Name'].join(','), // CSV Header
    ];
    
    allPastPapers.forEach(paper => {
      const csvContent = [
        paper.year,
        `" ${paper.description.replace(/"/g, '""')}"`,  
        paper.grade,
        paper.subject,
        paper.pdf
      ].join(',');
      csvRows.push(csvContent);
    });
  
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'pastPapersReport.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{backgroundColor: '#ECF0F5'}}>
        <div>
            <Header />
        </div>
    <div className="App">
    
       
      <form className="fullDiv m-5 p-4 bg-dark text-white rounded-4 col-10 mx-auto" onSubmit={submitPastPaper}>
      
        <h4>Upload Past Papers</h4>
        <input
          type="text"
          className="form-control"
          placeholder="Year"
          required
          value={year}
          onChange={(e) => setYear(e.target.value)}
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
      <button className="btn btn-info" onClick={generateReport}>Generate Report</button>
       <h4>Uploaded Past Papers:</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Description</th>
              <th>Grade</th>
              <th>Subject</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allPastPapers && allPastPapers.map((data) => (
              <tr key={data._id} className="table-row">
                <td>{data.year}</td>
                <td>{data.description}</td>
                <td>{data.grade}</td>
                <td>{data.subject}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => showPdf(data)} style={{ marginRight: '10px' }}>Show</button>
                  <button className="btn btn-danger" onClick={() => deletePastPaper(data._id)} style={{ marginRight: '10px' }}>Delete</button>
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
            <h4>Edit Past Paper Details</h4>
            <form className="formStyle2" onSubmit={saveEdit}>
              <div className="form-group">
                <label htmlFor="year">Year:</label>
                <input type="text" id="year" name="year" value={editFormData.year} onChange={handleEditFormChange} required />
                {editFormData.year === "" && <p className="error">Year is required</p>}
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
       
      <Footer />
    </div>
    </div>
  );
}

export default PastPaperUpload;
