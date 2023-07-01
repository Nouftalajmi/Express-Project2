express = require('express')
const passport = require('passport');

const { getAllmovies, createmovie, addGenraToMovie, getMovie } = require("./movies.controllers");
router = express.Router()


router.get('/movies', getAllmovies)
router.get("/movies/:movieId", getMovie)
router.post('/movies', passport.authenticate('jwt', { session: false }), createmovie)
router.put('/movies/:movieId/:genreId', passport.authenticate('jwt', { session: false }), addGenraToMovie)
module.exports = router