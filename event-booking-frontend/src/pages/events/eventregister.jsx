import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import '../../assests/css/eventregister.css';

const EventRegistration = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    numberOfTickets: 1
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${eventId}`);
        setEvent(res.data);
      } catch (err) {
        setError('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post(`/events/${eventId}/register`, {
        numberOfTickets: Number(formData.numberOfTickets)
      });
      navigate(`/events/${eventId}/confirmation`);
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !event) return <div>Loading event details...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div className="event-registration-page">
      <div className="container">
        <h1>Register for {event.title}</h1>
        
        <div className="registration-form-container">
          <div className="event-summary">
            <h3>Event Details</h3>
            <p><strong>Date:</strong> {new Date(event.startDate).toLocaleDateString()}</p>
            {event.location && <p><strong>Location:</strong> {event.location}</p>}
            <p><strong>Available Seats:</strong> {event.capacity - (event.registeredCount || 0)}</p>
            <p><strong>Price per ticket:</strong> ${event.price > 0 ? event.price.toFixed(2) : 'Free'}</p>
          </div>

          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Number of Tickets (Max: {event.capacity - (event.registeredCount || 0)})</label>
              <input
                type="number"
                name="numberOfTickets"
                min="1"
                max={event.capacity - (event.registeredCount || 0)}
                value={formData.numberOfTickets}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <p className="total-price">
                <strong>Total: </strong> 
                ${(event.price * formData.numberOfTickets).toFixed(2)}
              </p>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Complete Registration'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventRegistration;