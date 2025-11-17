// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../assests/css/homepage.css';
const Home = () => {
  return (
    <div className="homepage-wrapper">
      {/* Navbar is typically included outside the main content wrapper, 
          but for this demonstration, we'll ensure it's rendered. */}
      {/* <Navbar /> -- NOTE: The Navbar is already rendered in App.js above the Routes */}
      
      <div className="hero-section text-center">
        <div className="hero-content container">
          
          {/* Top Corner Image/Icon (Placeholder) */}
          <div className="top-corner-image-wrapper">
            {/*  (Replace with actual image path later) */}
          </div>
          
          <h1>Plan, Connect, Celebrate.</h1>
          
          <p className="lead hero-subtext">
            Your seamless platform for **booking premium vendors** and **registering for exclusive events**. 
            Manage every detail of your special occasion or find your next great experience—all in one place.
          </p>
          
          <div className="hero-actions">
            {/* Call to action buttons */}
            <Link to="/login" className="btn btn-hero btn-primary-alt">
              Login
            </Link>
            <Link to="/register" className="btn btn-hero btn-secondary-alt">
              Sign Up
            </Link>
          </div>
          
          <p className="small-text">New events and vendors added daily!</p>
        </div>
      </div>
      
      {/* Optional: Simple section below the hero for more intro content */}
      <div className="section-intro container">
          <h2>Why Choose EventEase?</h2>
          <div className="feature-grid">
              <div>
                  <h3>Vendor Marketplace</h3>
                  <p>Browse highly-rated caterers, photographers, and decorators.</p>
              </div>
              <div>
                  <h3>Event Registration</h3>
                  <p>Secure your spot at exclusive conferences, workshops, and gatherings.</p>
              </div>
              <div>
                  <h3>Personalized Dashboard</h3>
                  <p>Track all your bookings, payments, and event details in one place.</p>
              </div>
          </div>
      </div>
      
    </div>
  );
};

export default Home;