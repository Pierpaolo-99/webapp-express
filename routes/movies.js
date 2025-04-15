const router = require('express').Router()
const moviesController = require('../controllers/moviesController')

router.get('/', moviesController.index);

router.get('/:id', moviesController.show);

module.exports = router