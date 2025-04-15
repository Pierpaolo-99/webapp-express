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

            const reviewsData = reviews.map(review => {
                const { id, movie_id, ...rest } = review;
                return rest
            })

            movie.review = reviewsData

            res.json(movie)
        })
    })
}

module.exports = {
    index,
    show
}