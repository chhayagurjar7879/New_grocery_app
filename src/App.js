import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";
import SubcategoriesPage from "./pages/SubcategoriesPage";
import "./App.css";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { HiOutlineShoppingBag } from 'react-icons/hi';
function App() {
  return (
    <Router>
      <div className="App">
        <header className="navbar">
          <div className="navbar-logo"><HiOutlineShoppingBag size={52} color=" #4facfe" /></div>
          <nav>
            <ul className="navbar-links">
              <li><a href="/">Categories</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
          <div className="hamburger" onClick={() => document.querySelector('.navbar-links').classList.toggle('active')}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<CategoriesPage />} />
            <Route path="/subcategory/:categoryId" element={<SubcategoriesPage />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p><FaEnvelope size={28} color="#333" /> &nbsp;knewxerp@gmail.com</p>
            <p><FaPhoneAlt size={20} color="#555" /> &nbsp; +123456789</p>
            <p>
            <FaMapMarkerAlt size={20} color="#555" /> &nbsp;123, MyApp Street, City</p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div> 

          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-media-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook size={28} color="#3b5998" /></a><br></br><br></br>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram size={28} color="#C13584" /></a><br></br><br></br>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter size={28} color="#1DA1F2" /></a><br></br><br></br>
              {/* <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">WhatsApp</a><br></br> */}
            </div>
          </div>

          <div className="footer-section">
            <p>&copy; 2025 MyApp. All rights reserved.</p>
            <p><a href="/privacy-policy">Privacy Policy</a> | <a href="/terms">Terms & Conditions</a></p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
// ye mrra naya bala code h



