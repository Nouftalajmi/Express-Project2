const express = require("express")
const passport = require("passport")
const addReviewsToMovie = require("./reviews.controllers")
const router = express.Router()


router.post("/:movieId", passport.authenticate("jwt", { session: false }), addReviewsToMovie)

module.exports = router