import { useEffect, useState } from "react";
import axios from "axios";
import { pdfjs } from "react-pdf";
import PdfComp from "./PdfComp";
import Header from "../Exam Platform and Leaderboard/components/Header";
import Footer from "../Exam Platform and Leaderboard/components/Footer";
 

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

function PdfApp() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState("");
  const [file, setFile] = useState("");
  const [allImage,setAllImage]=useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    getPdf();
  }, []);
  
    const getPdf = async () =>{
    const result = await axios.get("http://localhost:8081/studyMaterial/get-files");
    console.log(result.data.data);
    setAllImage(result.data.data);
  };

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("grade", grade);
    formData.append("file", file);
    console.log(title,description,grade,file);

    try {
      const result = await axios.post("http://localhost:8081/studyMaterial/upload-files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(result);
      
      if(result.data.status == "ok"){
        alert("Uploaded Successfully!!");
        getPdf();
      }
    }
    catch (error) {
      console.error("Error uploading file:", error);
    }
  };


   const showPdf = (pdf) =>{
  
    setPdfFile(`http://localhost:8081/studyMaterial/files/${pdf}`);
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
  

  return (
    <div style={{backgroundColor: '#ECF0F5'}}>
      <Header/>
      <div className="d-flex justify-content-center">
       
        <form className="alert alert-info border border-primary col-5 text-center mt-4 mb-4 form-group" onSubmit={submitImage}>
          
          <h4>Upload Study Materials</h4>

            <div className="input-group mt-3">
              <span className="input-group-text text-bg-secondary border border-dark w-20">Title</span>
              <input
                type="text"
                className="form-control border border-dark"
                placeholder="Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="input-group mt-3">
              <span className="input-group-text text-bg-secondary border border-dark w-20">Description</span>
              <input
                type="text"
                className="form-control border border-dark"
                placeholder="Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="input-group mt-3">
              <span className="input-group-text text-bg-secondary border border-dark w-20">Grade</span>
              <input
                type="text"
                className="form-control border border-dark"
                placeholder="Grade"
                required
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              />
            </div>

            <div className="input-group mt-3">
              <label class="input-group-text text-bg-secondary border border-dark w-20">Upload</label>
              <input
                type="file"
                className="form-control border border-dark"
                placeholder="application/pdf"
                required
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            
            <button className="btn btn-primary mt-4 mb-2" type="submit">
              Submit
            </button>
        </form>
        </div>
        
        <div className="text-center">
          <br/>
          <h4>Uploaded Study Materials:</h4>
          <div className="d-flex justify-content-center">
            <div className="row">
              {allImage==null
              ? ""
              :allImage.map((data) =>{
                return(
                  <div className="col-4">
                    <h6>Title:{data.title}</h6>
                  
                    <button className="btn btn-primary" onClick={()=>showPdf(data.pdf)}>
                      Show PDF</button>

                    <button className="btn btn-danger" onClick={() => deletePdf(data._id)}>
                        Delete PDF
                      </button>
                  </div>
                );
              })}
            </div>
          </div>
      </div>
      <div className="text-center mt-4">
        <PdfComp pdfFile={pdfFile}/>
      </div>
      <Footer/>
    </div>
  );

  
}

export default PdfApp;