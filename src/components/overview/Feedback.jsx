import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './feedback.css';

const Feedback = () => {
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackHistory, setFeedbackHistory] = useState([]);
  const [recommendationSeedName, setRecommendationSeedName] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');

  // Fetch feedback history
  useEffect(() => {
    const fetchFeedbackHistory = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8001/admin-feedback/');
        setFeedbackHistory(response.data);
      } catch (error) {
        setError('Failed to fetch feedback history.');
      }
    };

    fetchFeedbackHistory();
  }, []);

  // Fetch recommendations based on seed name
  useEffect(() => {
    if (recommendationSeedName) {
      const fetchRecommendations = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8001/recommendations/?seed_name=${recommendationSeedName}`);
          setRecommendations(response.data);
        } catch (error) {
          setError('Failed to fetch recommendations.');
        }
      };

      fetchRecommendations();
    }
  }, [recommendationSeedName]);

  const handleFeedbackSubmit = async () => {
    try {
      await axios.post('http://127.0.0.1:8001/admin-feedback/', { Feedback: feedbackText });
      setFeedbackText('');
      // Refresh feedback history
      const response = await axios.get('http://127.0.0.1:8001/admin-feedback/');
      setFeedbackHistory(response.data);
    } catch (error) {
      setError('Failed to submit feedback.');
    }
  };

  const handleRecommendationSearch = (event) => {
    setRecommendationSeedName(event.target.value);
  };

  return (
    <div className="feedback-container">
      {/* Feedback Submission Card */}
      <div className="feedback-card">
        <h2>Submit Feedback</h2>
        <textarea
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="Enter your feedback here"
        />
        <button onClick={handleFeedbackSubmit}>Send Feedback</button>
      </div>

      {/* Feedback History Card */}
        <div className="feedback-history-card">
          <h2>Feedback History</h2>
          {feedbackHistory.length === 0 ? (
            <p>No feedback available.</p>
          ) : (
            feedbackHistory.map((feedback) => (
          <div key={feedback.id} className="feedback-item">
            <h3>User: {feedback.UserName}</h3>
            <p>{feedback.Feedback}</p>
            <p style={{ color: 'light-green' }}>Response: {feedback.Responses}</p>
          </div>
            ))
          )}
        </div>

        {/* Recommendations Card */}
      <div className="recommendations-card">
        <h2>Seed Recommendations</h2>
        <input
          type="text"
          value={recommendationSeedName}
          onChange={handleRecommendationSearch}
          placeholder="Enter seed name to search"
        />
        {recommendations.length === 0 ? (
          <p>No recommendations found.</p>
        ) : (
          recommendations.map((rec) => (
            <div key={rec.id} className="recommendation-item">
              <h3>Recommendation for {rec.seed_name}</h3>
              <p>{rec.text_snippet}</p>
            </div>
          ))
        )}
      </div>
      
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Feedback;
