// src/components/layout/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assests/css/navbar.css';
const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Simple way to check authentication status
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [navigate]); 
  // Note: For complex state, you would use an AuthContext here.

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const authLinks = (
    <ul className="nav-links">
      <li><Link to="/events">Events</Link></li>
      <li><Link to="/vendors">Vendors</Link></li>
      <li><Link to="/profile">Profile</Link></li>
      <li><a onClick={handleLogout} href="#!">Logout</a></li>
    </ul>
  );

  const guestLinks = (
    <ul className="nav-links">
      <li><Link to="/events">Events</Link></li>
      <li><Link to="/vendors">Vendors</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  );

  return (
    <nav className="navbar">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>EventApp</Link>
        </h1>
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    </nav>
  );
};

export default Navbar;