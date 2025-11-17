// src/pages/events/EventList.js
import React, { useState, useEffect } from 'react';
import api from '../../utils/api'; 
import { Link } from 'react-router-dom';
//import Navbar from '../layout/Navbar'; 
import '../../assests/css/eventlist.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch all events
    const fetchEvents = async () => {
      try {
        // GET /api/events (Public endpoint)
        const res = await api.get('/events');
        setEvents(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please check the server connection.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []); 

  // --- Rendering States ---

  if (loading) {
    return (
        <div className="event-list-wrapper text-center" style={{paddingTop: '100px'}}>
            <h2 style={{color: '#bcaaa4'}}>Loading Events...</h2>
        </div>
    );
  }

  // --- Main Render ---

  return (
    <div className="event-list-wrapper">
      {/* <Navbar /> */} {/* <-- NAVBAR RENDERED HERE */}
      
      <div className="container" style={{paddingTop: '40px', paddingBottom: '40px'}}>
        <h1 className="main-heading">Upcoming Exclusive Events</h1>
        <p className="lead" style={{color: '#b0b0b0'}}>Browse conferences, workshops, and gatherings. Login to secure your spot!</p>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        {events.length === 0 ? (
          <div className="alert alert-info text-center" style={{marginTop: '40px'}}>
            No public events are currently scheduled. Check back soon.
          </div>
        ) : (
          <div className="event-cards-grid">
            {events.map(event => (
              <div key={event._id} className="event-card card">
                <h3>{event.title}</h3>
                
                <p className="event-date">
                    <strong>Date:</strong> {new Date(event.startDate).toLocaleDateString()}
                </p>
                <p className="event-location">
                    <strong>Location:</strong> {event.location}
                </p>
                
                <p className="event-description">
                    {event.description.substring(0, 120)}{event.description.length > 120 ? '...' : ''}
                </p>

                <div className="event-footer-info">
                    <span className="event-price">
                        {event.price > 0 ? `$${event.price.toFixed(2)}` : 'FREE'}
                    </span>
                    <span className="event-capacity">
                        Spots: {event.capacity}
                    </span>
                </div>
                
                {/* This link will take the user to the registration/details page */}
                <Link to={`/events/${event._id}`} className="btn btn-primary" style={{marginTop: '20px'}}>
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventList;