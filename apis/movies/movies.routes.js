express = require('express')
const passport = require('passport');

const { getAllmovies, createmovie, addGenraToMovie, getMovie, deleteMovie } = require("./movies.controllers");
router = express.Router()


router.get('/movies', passport.authenticate('jwt', { session: false }), getAllmovies)
router.get("/movies/:movieId", getMovie)
router.post('/movies', passport.authenticate('jwt', { session: false }), createmovie)
router.put('/movies/:movieId/:genreId', passport.authenticate('jwt', { session: false }), addGenraToMovie)
router.delete('/movies/:movieId', passport.authenticate('jwt', { session: false }), deleteMovie)
module.exports = router