import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import './styles/PastPaperView.css';
import PdfComp from "../Study Material and Past Paper Management/PdfComp.js";
import Footer from "../Exam Platform and Leaderboard/components/Footer.js";
import './styles/PdfApp.css';

const PastPaperView = () => {
  const [pastPapers, setPastPapers] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPdfPopup, setShowPdfPopup] = useState(false);

  useEffect(() => {
    fetchPastPapers();
  }, []);

  const fetchPastPapers = async () => {
    try {
      const response = await axios.get('http://localhost:8081/studyMaterial/get-past-papers-files');
      setPastPapers(response.data.data);
    } catch (error) {
      console.error('Error fetching past papers:', error);
    }
  };

  const showPdf = (pastPaper) => {
    setPdfFile(`http://localhost:8081/studyMaterial/files/${pastPaper.pdf}`)
    setShowPdfPopup(true); 
   };
 
   const closePdfPopup = () => {
     setShowPdfPopup(false); // Close the PDF popup
   };
 

  const downloadPdf = async (pastPaperId) => {
    try {
      const response = await axios.get(`http://localhost:8081/studyMaterial/files/${pastPaperId}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${pastPaperId}.pdf`);
      document.body.appendChild(link);
      link.click();
      alert("Downloading!");
    } catch (error) {
      console.error('Error downloading past paper:', error);
    }
  };

  const likePastPaper = async (pastPaperId) => {
    try {
      await axios.post(`http://localhost:8081/studyMaterial/pdfs/${pastPaperId}/like`);
      setPastPapers(pastPapers.map(paper => paper._id === pastPaperId ? { ...paper, likes: paper.likes + 1 } : paper));
    } catch (error) {
      console.error('Error liking past paper:', error);
    }
  };

  const dislikePastPaper = async (pastPaperId) => {
    try {
      await axios.post(`http://localhost:8081/studyMaterial/pdfs/${pastPaperId}/dislike`);
      setPastPapers(pastPapers.map(paper => paper._id === pastPaperId ? { ...paper, dislikes: paper.dislikes + 1 } : paper));
    } catch (error) {
      console.error('Error disliking past paper:', error);
    }
  };

  // Filter past papers based on search term
  const filteredPastPapers = pastPapers.filter(paper =>
    paper.year.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pdf-viewer-container">
      <h1 className="pdf-viewer-heading">Past Papers</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="pdf-list">
        {filteredPastPapers.map((pastPaper) => (
          <div key={pastPaper._id} className="pdf-item">
            
            <h3 className="pastPaper-year">{pastPaper.year}</h3>
            <h3 className="pastPaper-subject">{pastPaper.subject}</h3>
            <button className="btn btn-primary" onClick={() => showPdf(pastPaper)} style={{ marginRight: '10px' }}>Show PDF</button>
            <button className="btn btn-danger" onClick={() => downloadPdf(pastPaper.pdf)} style={{ marginRight: '10px' }}>Download PDF</button>
            
            <div className="like-dislike-icons">
              <AiFillLike onClick={() => likePastPaper(pastPaper._id)} style={{ marginRight: '5px' }} /> <span>{pastPaper.likes}</span>
              <span style={{ margin: '0 5px' }}>|</span>
              <AiFillDislike onClick={() => dislikePastPaper(pastPaper._id)} style={{ marginLeft: '5px' }} /> <span>{pastPaper.dislikes}</span>
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

export default PastPaperView;
