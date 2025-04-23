const router = require('express').Router()
const moviesController = require('../controllers/moviesController')
const passport = require('passport')

router.get('/', moviesController.index);

router.get('/:id', moviesController.show);

router.post('/:id/review', moviesController.storeReview);

router.post('/register', passport.authenticate('register'), moviesController.storeRegistration);

router.post('/login', passport.authenticate('login'), moviesController.storeLogin);

module.exports = router