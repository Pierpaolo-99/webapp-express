const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors')

// server listening
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to movies Server')
})

// Cors Middleware
app.use(cors({
    origin: 'http://localhost:5173'
}))

// JSON Middleware
app.use(express.json())

// Static Assets Middleware
app.use(express.static('public'));