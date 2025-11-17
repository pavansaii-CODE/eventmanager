// src/pages/vendors/VendorList.js
import React, { useState, useEffect } from 'react';
import api from '../../utils/api'; 
import { Link } from 'react-router-dom';
//import Navbar from '../layout/Navbar'; // Import Navbar for conditional rendering
import '../../assests/css/vendors.css';

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch all approved vendors
    const fetchVendors = async () => {
      try {
        // GET /api/vendors (Public endpoint, shows only approved vendors)
        const res = await api.get('/vendors');
        setVendors(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching vendors:', err);
        setError('Failed to load vendors. Please check the server connection.');
        setLoading(false);
      }
    };

    fetchVendors();
  }, []); 

  // --- Rendering States ---

  if (loading) {
    return (
        <div className="vendor-list-wrapper text-center" style={{paddingTop: '100px'}}>
            <h2 style={{color: '#bcaaa4'}}>Loading Service Providers...</h2>
        </div>
    );
  }

  // --- Main Render ---

  return (
    <div className="vendor-list-wrapper">
     {/* <Navbar /> */} {/* <-- NAVBAR RENDERED HERE */}
      
      <div className="container" style={{paddingTop: '40px', paddingBottom: '40px'}}>
        <h1 className="main-heading">Find Approved Event Vendors</h1>
        <p className="lead" style={{color: '#b0b0b0'}}>Browse highly-rated caterers, photographers, and decorators.</p>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        {vendors.length === 0 ? (
          <div className="alert alert-info text-center" style={{marginTop: '40px'}}>
            No approved vendors are currently listed. Check back soon.
          </div>
        ) : (
          <div className="vendor-cards-grid">
            {vendors.map(vendor => (
              <div key={vendor._id} className="vendor-card card">
                <h3>{vendor.companyName}</h3>
                
                <span className={`vendor-service-tag tag-${vendor.serviceType.toLowerCase()}`}>
                    {vendor.serviceType}
                </span>

                <p className="vendor-description">
                    {vendor.description.substring(0, 100)}{vendor.description.length > 100 ? '...' : ''}
                </p>

                <div className="vendor-footer-info">
                    <span className="vendor-price">
                        Base Price: ${vendor.basePrice.toFixed(2)}
                    </span>
                    <span className="vendor-contact">
                        Contact: {vendor.contactPhone || vendor.contactEmail}
                    </span>
                </div>
                
                {/* This link will take the client to the booking request form */}
                {/* Note: This should ideally be protected by a PrivateRoute or only shown if logged in */}
                <Link to={`/vendors/book/${vendor._id}`} className="btn btn-primary" style={{marginTop: '20px'}}>
                  Request Booking
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorList;