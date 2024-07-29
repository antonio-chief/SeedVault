import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import './events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    Date: '',
    Event: '',
    EventLocation: '',
    AreasWithEvents: '',
    SeedToPlant: '',
    SeedID: ''
  });
  const [showDialog, setShowDialog] = useState(false);

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
      await axios.post('http://127.0.0.1:8001/api/events/', newEvent);
      setNewEvent({
        Date: '',
        Event: '',
        EventLocation: '',
        AreasWithEvents: '',
        SeedToPlant: '',
        SeedID: ''
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

    if (daysUntilEvent <= 1) return 'red';
    if (daysUntilEvent <= 2) return 'orange';
    return 'green';
  };

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
              name="AreasWithEvents"
              placeholder="Areas With Events"
              value={newEvent.AreasWithEvents}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="SeedToPlant"
              placeholder="Seed To Plant"
              value={newEvent.SeedToPlant}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="SeedID"
              placeholder="Seed ID"
              value={newEvent.SeedID}
              onChange={handleChange}
              required
            />
            <button type="submit">Add Event</button>
            <button type="button" onClick={() => setShowDialog(false)}>Cancel</button>
          </form>
        </div>
      )}
      <div className="events-timeline">
        {events.map((event) => (
          <div
            key={event.id}
            className="event-item"
            style={{ backgroundColor: getEventColor(event.Date) }}
          >
            <h3>{event.Event}</h3>
            <p>Date: {event.Date}</p>
            <p>Location: {event.EventLocation}</p>
            <p>Areas: {event.AreasWithEvents}</p>
            <p>Seed to Plant: {event.SeedToPlant}</p>
            <p>Seed ID: {event.SeedID}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
