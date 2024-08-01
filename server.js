const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 4000;

// Serve static files from the "build" directory
app.use(express.static(path.join(__dirname, 'build')));

// Route to serve a_website.html
app.get('/a_website', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'a_website.html'));
});

// Catch-all route for React application
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
