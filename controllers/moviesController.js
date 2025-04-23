const connection = require('../database/db')

function index(req, res) {

    const sql = 'SELECT * FROM movies'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results)
    })
}

function show(req, res) {

    const { id } = req.params

    const movieSql = 'SELECT * FROM movies WHERE id = ?'
    const reviewSql = 'SELECT * FROM reviews WHERE movie_id = ?'

    connection.query(movieSql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (result.length === 0) return res.status(404).json({ error: 'Movie not found' });

        const movie = result[0]

        connection.query(reviewSql, [id], (err, reviews) => {
            if (err) return res.status(500).json({ error: 'Review not found' });

            movie.review = reviews

            res.json(movie)
        })
    })
}

function storeReview(req, res) {
    const { id } = req.params
    const { name, text, vote } = req.body

    // Validate input
    if (!name || !text || vote < 1 || vote > 5) {
        return res.status(400).json({ error: 'Invalid input data. Ensure vote is between 1 and 5.' });
    }

    const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ')
    const updated_at = created_at

    const sql = 'INSERT INTO reviews (movie_id, name, text, vote, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)'
    const values = [id, name, text, vote, created_at, updated_at]

    connection.query(sql, values, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        console.log('SQL Query executed, results:', results);

        res.status(201).json({ message: 'Review added successfully' })
    })
}

function storeRegistration(req, res) {
    return res.json({ message: 'Registered successfully', user: req.user });
}

function storeLogin(req, res) {
    return res.json({ message: 'Logged in successfully', user: req.user });
}

module.exports = {
    index,
    show,
    storeReview,
    storeRegistration,
    storeLogin
}