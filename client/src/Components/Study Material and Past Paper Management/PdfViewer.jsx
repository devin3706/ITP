import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import './styles/PdfViewer.css';
import PdfComp from "../Study Material and Past Paper Management/PdfComp.js";
import Footer from "../Exam Platform and Leaderboard/components/Footer.js";
import Header from '../Exam Platform and Leaderboard/components/Header';
import { Document, Page } from 'react-pdf';

const PdfViewer = () => {
  const [pdfs, setPdfs] = useState([]);
  const [filteredPdfs, setFilteredPdfs] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPdfPopup, setShowPdfPopup] = useState(false);

  useEffect(() => {
    fetchPdfs();
  }, []);

  const fetchPdfs = async () => {
    try {
      const response = await axios.get('http://localhost:8081/studyMaterial/get-files');
      const pdfsWithLikes = response.data.data.map(pdf => ({ ...pdf, likes: 0, dislikes: 0 }));
      setPdfs(pdfsWithLikes);
      setFilteredPdfs(pdfsWithLikes);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
    }
  };

  const showPdf = (pdf) => {
    setPdfFile(`http://localhost:8081/studyMaterial/files/${pdf}`);
    setShowPdfPopup(true);
};

const closePdfPopup = () => {
    setShowPdfPopup(false);
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
      alert("Downloading!");
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  const likePdf = (pdfId) => {
    setPdfs(pdfs.map(pdf => pdf._id === pdfId ? { ...pdf, likes: pdf.likes + 1 } : pdf));
  };

  const dislikePdf = (pdfId) => {
    setPdfs(pdfs.map(pdf => pdf._id === pdfId ? { ...pdf, dislikes: pdf.dislikes + 1 } : pdf));
  };

  useEffect(() => {
    const filtered = pdfs.filter(pdf =>
      pdf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pdf.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPdfs(filtered);
  }, [searchTerm, pdfs]);

  return (
    <div className="pdf-viewer-container">
      <h1 className="pdf-viewer-heading">Study Materials</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="pdf-list">
        {filteredPdfs.map((pdf) => (
          <div key={pdf._id} className="pdf-item">
            
            <h3 className="pdf-title">{pdf.title}</h3>
            <h3 className="pdf-description">{pdf.description}</h3>
             
            <button className="btn btn-primary" onClick={() => showPdf(pdf.pdf)} style={{ marginRight: '10px' }}>Show PDF</button>
            <button className="btn btn-danger" onClick={() => downloadPdf(pdf.pdf)} style={{ marginRight: '10px' }}>Download PDF</button>
            <div className="like-dislike-icons">
              <AiFillLike onClick={() => likePdf(pdf._id)} style={{ marginRight: '5px' }} /> <span>{pdf.likes}</span>
              <span style={{ margin: '0 5px' }}>|</span>
              <AiFillDislike onClick={() => dislikePdf(pdf._id)} style={{ marginLeft: '5px' }} /> <span>{pdf.dislikes}</span>
            </div>
            {showPdfPopup && (
            <div className="pdf-modal-backdrop">
                <div className="pdf-modal-content">
                    <span className="pdf-modal-close" onClick={closePdfPopup}>&times;</span>
                    <PdfComp pdfFile={pdfFile} onClose={closePdfPopup} />
                </div>
            </div>
        )}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default PdfViewer;