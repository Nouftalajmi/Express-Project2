const express = require('express')
const passport = require('passport');

const { getGenres, createGenre } = require("./genres.controllers");
router = express.Router()


router.get('/genres', getGenres)
router.post('/genres', passport.authenticate('jwt', { session: false }), createGenre)
module.exports = router