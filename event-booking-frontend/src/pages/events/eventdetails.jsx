import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import Navbar from '../../components/layout/navbar';
import '../../assests/css/eventdetails.css';

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${eventId}`);
        setEvent(res.data);
      } catch (err) {
        setError('Failed to fetch event details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleRegister = () => {
    navigate(`/events/${eventId}/register`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div className="event-details-page">
      <Navbar />
      <div className="container">
        <div className="event-details-card">
          <div className="event-header">
            <h1>{event.title}</h1>
            <p className="event-meta">
              <span>{new Date(event.startDate).toLocaleDateString()}</span>
              {event.location && <span> • {event.location}</span>}
            </p>
          </div>

          <div className="event-content">
            <div className="event-description">
              <h3>About This Event</h3>
              <p>{event.description || 'No description available.'}</p>
            </div>

            <div className="event-details-sidebar">
              <div className="event-info-card">
                <h3>Event Details</h3>
                <ul>
                  <li>
                    <strong>Date:</strong> {new Date(event.startDate).toLocaleDateString()}
                    {event.endDate && ` to ${new Date(event.endDate).toLocaleDateString()}`}
                  </li>
                  {event.location && (
                    <li>
                      <strong>Location:</strong> {event.location}
                    </li>
                  )}
                  <li>
                    <strong>Capacity:</strong> {event.registeredCount || 0} / {event.capacity} registered
                  </li>
                  <li>
                    <strong>Price:</strong> ${event.price > 0 ? event.price.toFixed(2) : 'Free'}
                  </li>
                </ul>

                <button 
                  onClick={handleRegister}
                  className="btn btn-primary btn-block"
                  disabled={event.registeredCount >= event.capacity}
                >
                  {event.registeredCount >= event.capacity 
                    ? 'Event Full' 
                    : 'Register Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;