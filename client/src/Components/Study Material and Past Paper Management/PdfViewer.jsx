import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Document, Page } from 'react-pdf';

const PdfViewer = () => {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    fetchPdfs();
  }, []);

  const fetchPdfs = async () => {
    try {
      const response = await axios.get('http://localhost:8081/studyMaterial/get-files');
      setPdfs(response.data.data);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
    }
  };

  const downloadPdf = async (pdfId) => {
    try {
      const response = await axios.get(`http://localhost:8081/studyMaterial/files/${pdfId}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${pdfId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return (
    <div className="pdf-viewer">
      <h1>Teacher Uploaded PDFs</h1>
      {pdfs.map((pdf) => (
        <div key={pdf._id} className="pdf-item">
          <h3>{pdf.title}</h3>
          <button onClick={() => downloadPdf(pdf.pdf)}>Download PDF</button>
          <div className="pdf-preview">
            <Document file={`http://localhost:8081/studyMaterial/files/${pdf.pdf}`}>
              <Page pageNumber={1} />
            </Document>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PdfViewer;
