import React from 'react';
import '../styles/footer.css';
import logo from '../images/logo.png'

const Footer = () => {
  return (
 <div>
    <div className="footer">
      <div className="footer-section">
        <img src={logo} alt="Logo" className="logo" />
        <p className="para">The Academy for Accounting and Business Studies, nestled in the heart of Sri Lanka, stands as a beacon of excellence in the realm of education. With a steadfast commitment to fostering academic prowess and professional acumen, the institute provides a dynamic learning environment where students thrive. Offering comprehensive courses in accounting and business studies, coupled with innovative teaching methodologies and experienced faculty, the Academy prepares students for success in the competitive global landscape.</p>
      </div>

      <div className="navigation">
        <ul>
          <li><a href="/" target="_self"> Home</a></li>
          <li><a href="/about" target="_self"> About Us</a></li>
          <li><a href="/#services" target="_self"> Services</a></li>
          <li><a href="/lecturers" target="_self"> Lecturers</a></li>
          <li><a href="/other-services" target="_self"> Gallery</a></li>
        </ul>
      </div>

      <div className="contact">
        <h2>Contact Us</h2>
        <p>No 221, High Level Road, 10280 Maharagama</p>
        <p>absacademy@gmail.com</p>
        <p>0115 920 470</p>
      </div>

      <div className="social">
        <h2> Follow Us </h2>
        <ul>
          <li><a href="#">Facebook</a></li>
          <li><a href="#">Instagram</a></li>
          <li><a href="#">Youtube</a></li>
          <li><a href="#">LinkedIn</a></li>
        </ul>
      </div>
    </div>

    <div className="copyright">
      <div>
        <div>
          <div>
            <p className="copyright-para">Copyright © 2024 | Concept and Design by B3_02_10. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Footer;
