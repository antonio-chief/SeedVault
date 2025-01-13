import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

import './events.css';
dayjs.extend(isSameOrAfter);

const Events = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    Date: '',
    Event: '',
    EventLocation: '',
    Activity: ''
  });
  const [showDialog, setShowDialog] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8001/events/');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleChange = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8001/events/', newEvent);
      setNewEvent({
        Date: '',
        Event: '',
        EventLocation: '',
        Activity: ''
      });
      setShowDialog(false);
      fetchEvents();
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const getEventColor = (eventDate) => {
    const today = dayjs();
    const eventDay = dayjs(eventDate);
    const daysUntilEvent = eventDay.diff(today, 'day');

    if (daysUntilEvent <= 1) return '#FF4646';
    if (daysUntilEvent <= 2) return 'orange';
    return 'green';
  };

  const pastEvents = events.filter(event => dayjs(event.Date).isBefore(dayjs()));
  const upcomingEvents = events.filter(event => dayjs(event.Date).isSameOrAfter(dayjs()));

  return (
    <div className="events-container">
      <button onClick={() => setShowDialog(true)}>Add New Event</button>
      {showDialog && (
        <div className="dialog">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="Date"
              placeholder="Date (YYYY-MM-DD)"
              value={newEvent.Date}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="Event"
              placeholder="Event"
              value={newEvent.Event}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="EventLocation"
              placeholder="Event Location"
              value={newEvent.EventLocation}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="Activity"
              placeholder="Activity"
              value={newEvent.Activity}
              onChange={handleChange}
              required
            />
            <button type="submit">Add Event</button>
            <button type="button" onClick={() => setShowDialog(false)}>Cancel</button>
          </form>
        </div>
      )}
      <div className="events-timeline">
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className="event-item"
            style={{ backgroundColor: getEventColor(event.Date) }}
          >
            <h3>{event.Event}</h3>
            <p>Date: {event.Date}</p>
            <p>Location: {event.EventLocation}</p>
            <p>Activity: {event.Activity}</p>
          </div>
        ))}
      </div>
      <button onClick={() => setShowHistory(!showHistory)}>
        {showHistory ? 'Hide Events History' : 'Show Events History'}
      </button>
      {showHistory && (
        <div className="events-history">
          {pastEvents.map((event) => (
            <div key={event.id} className="event-item">
              <h3>{event.Event}</h3>
              <p>Date: {event.Date}</p>
              <p>Location: {event.EventLocation}</p>
              <p>Activity: {event.Activity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
