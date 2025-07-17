import React from 'react';
import './CSS/Footer.css'

const Footer = () => {
  return (
    <footer className="footer" data-aos="fade-up">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Trading</h3>
          <ul>
            <li><a href="#">Stocks</a></li>
            <li><a href="#">Options</a></li>
            <li><a href="#">ETFs</a></li>
            <li><a href="#">Futures</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 MyStocks. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
