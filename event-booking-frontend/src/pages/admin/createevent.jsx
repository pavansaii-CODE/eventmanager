import React, { useState } from 'react';
import api from '../../utils/api';
import Navbar from '../../components/layout/navbar';
import '../../assests/css/event.css'

const CreateEventForm = () => {
  const [formData, setFormData] = useState({
    title: '', 
    description: '', 
    startDate: '', 
    endDate: '', 
    location: '', 
    capacity: 1, 
    price: 0
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'capacity' || name === 'price' ? Number(value) : value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await api.post('/events', formData);
      setMessage('Event created successfully!');
      setFormData({ 
        title: '', 
        description: '', 
        startDate: '', 
        endDate: '', 
        location: '', 
        capacity: 1, 
        price: 0 
      });
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page-light">
      <Navbar />
      <div className="create-event-container">
        <h1 className="create-event-title">Create New Event</h1>
        <p className="create-event-subtitle">ADMIN ACCESS: Publish a new event.</p>
        
        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <form onSubmit={onSubmit} className="event-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              rows="5"
              value={formData.description}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={onChange}
                required
              />
            </div>

            <div className="form-group">
              <label>End Date (Optional)</label>
              <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Capacity</label>
              <input
                type="number"
                name="capacity"
                min="1"
                value={formData.capacity}
                onChange={onChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Price ($)</label>
              <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={onChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Creating Event...' : 'Create Event'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEventForm;