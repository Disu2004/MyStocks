import React from 'react';
import './CSS/Contact.css';
import NavBar from './NavBar';

const Contact = () => {
  return (
    <>
    <NavBar/>
    <section className="contact-page">
          <div className="contact-container">
              <h2 className="contact-title">Contact Us</h2>
              <p className="contact-subtitle">
                  Have questions or need support? Fill out the form below and we'll get back to you shortly.
              </p>

              <form className="contact-form">
                  <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input type="text" id="name" placeholder="Enter your name" required />
                  </div>

                  <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" placeholder="Enter your email" required />
                  </div>

                  <div className="form-group">
                      <label htmlFor="message">Your Message</label>
                      <textarea id="message" rows="5" placeholder="Type your message here..." required></textarea>
                  </div>

                  <button type="submit" className="submit-btn">Send Message</button>
              </form>
          </div>
      </section><footer className="footer">
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
                  {/* Add more footer sections... */}
              </div>
              <div className="footer-bottom">
                  <p>&copy; 2025 MyStocks. All rights reserved.</p>
              </div>
          </footer></>
  );
};

export default Contact;
