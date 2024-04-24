import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Footer from "../Exam Platform and Leaderboard/components/Footer";
import Header from "../Exam Platform and Leaderboard/components/Header";

// You need to specify the PDF worker source to load PDF files properly
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PdfComp({ pdfFile, onClose }) {
    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setPageNumber(1); // Reset to the first page when a new document is loaded
    };

    return (
      <div style={{backgroundColor: '#ECF0F5'}}>
        <div className="pdf-viewer-container">
            <div className="pdf-controls">
                <button onClick={onClose} className="close-btn">Close</button>
                <p>Page {pageNumber} of {numPages}</p>
                <button disabled={pageNumber <= 1} onClick={() => setPageNumber(pageNumber - 1)} className="nav-btn prev-btn">Previous</button>
                <button disabled={pageNumber >= numPages || numPages === null} onClick={() => setPageNumber(pageNumber + 1)} className="nav-btn next-btn">Next</button>
            </div>
            <Document
                file={pdfFile}
                onLoadSuccess={onDocumentLoadSuccess}
                className="pdf-document"
            >
                <Page pageNumber={pageNumber} />
            </Document>
        </div>
        </div>
    );
}

export default PdfComp;