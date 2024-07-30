const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Serve website.html as the default page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'a_website.html'));
});

// Serve index.html for React routes
app.get('/app', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Handle all other routes and redirect to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
