import './styles/PdfApp.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { pdfjs } from "react-pdf";
import PdfComp from "./PdfComp";
 

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
    <div className="App">
      <form className="formStyle" onSubmit={submitImage}>
        <h4>Upload Study Materials</h4>
        <br />
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
        <input
          type="text"
          className="form-control"
          placeholder="Grade"
          required
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <br />
        <input
          type="file"
          className="form-control"
          placeholder="application/pdf"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
        </form>
        <div className="uploaded">
          <br/>
          <h4>Uploaded Study Materials:</h4>
          
          <div className="output-div">
            {allImage==null
            ? ""
            :allImage.map((data) =>{
              return(
           <div className="inner-div">
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
      <PdfComp pdfFile={pdfFile}/>
    </div>

    
  );

  
}

export default PdfApp;