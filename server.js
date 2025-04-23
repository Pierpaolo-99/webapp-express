const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

// Auth dependencies
const session = require('express-session');
const passport = require('passport');
const initializePassport = require('./auth/passport-config');

initializePassport(passport);

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}))

// import routes
const moviesRoutes = require('./routes/movies');

// import middleware
const serverError = require('./middleware/serverError');
const notFound = require('./middleware/notFound');

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
    origin: 'http://localhost:5173',
    credentials: true
}))

// JSON Middleware
app.use(express.json())

// Static Assets Middleware
app.use(express.static('public'));

// Routes Middleware
app.use('/api/v1/movies', moviesRoutes);

// Middlewares Error
app.use(serverError);
app.use(notFound);