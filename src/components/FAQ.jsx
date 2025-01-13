import React from 'react';
import './faq.css';

function FAQ() {
  return (
    <div className="section">
      <h1>FAQ</h1>
      <p>Frequently Asked Questions.</p>
      <p>No Questions yet<br></br>Be the first to ask</p>
      <button ><a href='.feedback-container.feedback-card'>Ask a question</a></button>
    </div>
  );
}

export default FAQ;
