// src/components/layout/Footer.js
import React from 'react';
import '../assests/css/navbar.css';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container text-center">
        <p>&copy; {new Date().getFullYear()} Event & Vendor Booking. All rights reserved.</p>
        <p>Built with Node.js, Express, MongoDB, and React.</p>
      </div>
    </footer>
  );
};

export default Footer;