express = require('express')
const passport = require('passport');

const { getAllCelebrities, createCelebrities, addActorstoMovie } = require("./celebrities.controllers");
router = express.Router()


router.get('/celebrities', getAllCelebrities)
router.post('/celebrities', passport.authenticate('jwt', { session: false }), createCelebrities)
router.put('/:celebrityId/:movieId', addActorstoMovie)
module.exports = router