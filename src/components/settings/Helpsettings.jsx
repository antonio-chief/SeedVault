import React, { useState } from 'react';
import './helpsettings.css';

const Helpsettings = () => {
  const [reportInput, setReportInput] = useState('');
  const [feedbackInput, setFeedbackInput] = useState('');

  const handleReportProblem = () => {
    console.log('Reporting a problem:', reportInput);
    setReportInput(''); // Clear input field after reporting
  };

  const handleProvideFeedback = () => {
    console.log('Providing feedback:', feedbackInput);
    setFeedbackInput(''); // Clear input field after providing feedback
  };

  const handleReportInputChange = (event) => {
    setReportInput(event.target.value);
  };

  const handleFeedbackInputChange = (event) => {
    setFeedbackInput(event.target.value);
  };

  return (
    <div className="settings-content">
      <h2>Help</h2>
      <p>Get help and support here.</p>
      <div className="help-section">
        <h3>Report a Problem</h3>
        <button onClick={handleReportProblem}>Report Problem</button>
        <textarea
          placeholder="Describe the problem..."
          rows="4"
          cols="50"
          onChange={handleReportInputChange}
          value={reportInput}
        ></textarea>
      </div>
      <div className="help-section">
        <h3>Provide Feedback</h3>
        <button onClick={handleProvideFeedback}>Provide Feedback</button>
        <textarea
          placeholder="Enter your feedback..."
          rows="4"
          cols="50"
          onChange={handleFeedbackInputChange}
          value={feedbackInput}
        ></textarea>
      </div>
    </div>
  );
};

export default Helpsettings;