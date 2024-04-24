import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Footer from "../Exam Platform and Leaderboard/components/Footer";
import Header from "../Exam Platform and Leaderboard/components/Header";

// You need to specify the PDF worker source to load PDF files properly
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PdfComp({ pdfFile, onClose }) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    return (
      <div style={{backgroundColor: '#ECF0F5'}}>
        <Header/>
        <div className="d-flex justify-content-center">
         
          <form className="alert alert-info border border-primary col-5 text-center mt-4 mb-4 form-group" onSubmit={submitPdf}>
            
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
                <label className="input-group-text text-bg-secondary border border-dark w-20">Upload</label>
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

export default PdfComp;
