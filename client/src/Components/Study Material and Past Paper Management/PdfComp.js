import { useState } from "react";
import { Document, Page } from "react-pdf";
import pdf from "./1.pdf";
import Footer from "../Exam Platform and Leaderboard/components/Footer";
import Header from "../Exam Platform and Leaderboard/components/Header";

function PdfComp() {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div style={{backgroundColor: '#ECF0F5'}}>
      <Header/>
    <div>
          <p className="text-center">
            Page {pageNumber} of {numPages}
          </p>
      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.apply(null,Array(numPages))
        .map((x,i)=>i+1)
        .map(page=>{return(
          <page 
          pageNumber={page}
          renderTextLayer={false}
          renderAnnotationLayer={false}/>

        );
        })}
 
      </Document>
   
    </div>
    <Footer/>
    </div>
  );
}
export default PdfComp;