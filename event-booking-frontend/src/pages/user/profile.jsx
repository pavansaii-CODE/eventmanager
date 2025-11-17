// src/pages/user/Profile.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../utils/api'; 
import Navbar from '../../components/layout/navbar'; // <-- IMPORT NAVBAR HERE
import Button from '../../components/common/button'; 
import '../../assests/css/profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/users/profile');
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch profile. Token might be expired.', err);
        handleLogout(); 
      }
    };
    fetchProfile();
  }, [navigate]);

  if (loading) return <div className="loading-spinner text-center">Loading Profile Data...</div>;
  if (!user) return <div className="alert alert-danger">Could not load user profile.</div>;

  const isAdmin = user.role === 'admin';

  return (
    <div className="profile-wrapper">
      <Navbar /> {/* <-- NAVBAR RENDERED HERE */}
      
      <div className="profile-page-container container">
        
        <header className="profile-header">
          <h1>{isAdmin ? 'Admin Dashboard' : 'My Profile & Dashboard'}</h1>
          <span className={`role-tag role-${user.role}`}>{user.role.toUpperCase()}</span>
        </header>
        
        <div className="profile-content-grid">
          
          {/* === 1. Account Details Card === */}
          <div className="profile-info-card card">
            <h2>Account Details</h2>
            <div className="detail-row"><strong>Username:</strong> <span>{user.username}</span></div>
            <div className="detail-row"><strong>Email:</strong> <span>{user.email}</span></div>
            <div className="detail-row"><strong>Member Since:</strong> <span>{new Date(user.createdAt).toLocaleDateString()}</span></div>
            
            <div className="profile-actions-bottom">
               <Button btnStyle="secondary" onClick={() => navigate('/update-profile')}>Update Profile</Button>
               <Button btnStyle="danger" onClick={handleLogout}>Logout</Button>
            </div>
          </div>

          {/* === 2. Client/Admin Actions Card === */}
          <div className="actions-card card">
            <h2>{isAdmin ? 'Management Tools' : 'Client Services'}</h2>
            
            <div className="action-list">
              {/* Client Links */}
              <Link to="/my-event-bookings" className="action-link">View My Event Bookings</Link>
              <Link to="/my-vendor-requests" className="action-link">View My Vendor Requests</Link>
              
              {/* Admin Links (Conditional) */}
              {isAdmin && (
                <>
                  <Link to="/admin/createevent" className="action-link admin-link">➕ Create New Event</Link>
                  <Link to="/admin/manage-vendors" className="action-link admin-link">👥 Manage Vendor Approvals</Link>
                </>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Profile;