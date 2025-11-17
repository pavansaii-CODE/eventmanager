// src/pages/auth/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../utils/api'; 
import '../../assests/css/login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/profile'); 
    } catch (err) {
      const errorMessage = err.response?.data?.msg || 'Login failed. Check server or credentials.';
      setError(errorMessage);
      console.error(err);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-form-section">
        <h2 className="form-title">Welcome Back!</h2>
        <p className="form-subtitle">Sign in to continue your event journey.</p>
        
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={onSubmit} className="auth-form">
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
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <p className="form-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
      <div className="auth-image-section">
        {/* Placeholder for the image on the right side */}
        <img 
          src="event_login_banner.jpg" // Ensure this image is in your `public` folder
          alt="Login Illustration" 
          className="auth-image" 
        />
      </div>
    </div>
  );
};

export default Login;