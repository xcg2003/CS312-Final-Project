
const express = require('express');
const path = require('path');
const app = express();

// ...existing code...

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Serve images
app.use('/images', express.static(path.join(__dirname, 'images')));

// ...existing code...

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});