// src/pages/auth/Register.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../utils/api'; 
import '../../assests/css/login.css';
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'client' // Default role for registration
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { username, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      return setError('Password must be 6 or more characters.');
    }

    try {
      // POST /api/auth/register
      const res = await api.post('/auth/register', { username, email, password, role: 'client' });
      
      // Store the JWT token after successful registration
      localStorage.setItem('token', res.data.token);
      
      // Redirect to the protected profile page (dashboard)
      navigate('/profile'); 
      
    } catch (err) {
      // Handle 400 errors (e.g., User already exists) from the backend
      const errorMessage = err.response?.data?.msg || 'Registration failed. Check server or details.';
      setError(errorMessage);
      console.error(err);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-form-section">
        <h2 className="form-title">Join Our Community!</h2>
        <p className="form-subtitle">Create your account to unlock event bookings.</p>
        
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={onSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              minLength="6"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
        <p className="form-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
      <div className="auth-image-section">
        {/* Placeholder for the image on the right side */}
        <img 
          src="https://images.pexels.com/photos/698907/pexels-photo-698907.jpeg" // Ensure this image is in your `public` folder
          alt="Registration Illustration" 
          className="auth-image" 
        />
      </div>
    </div>
  );
};

export default Register;