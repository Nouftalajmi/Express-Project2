const Movie = require("../../db/models/Movie")
const Reviews = require("../../db/models/Reviews")

const addReviewsToMovie = async (req, res, next) => {
    try {
        const { movieId } = req.params

        const movie = await Movie.findById(movieId)
        if (movie) {
            req.body.movie = movie._id
            req.body.addedBy = req.user._id
            const review = await Reviews.create(req.body)
            await movie.updateOne({ $push: { reviews: review._id } })
            res.status(201).json(review)
        } else {
            res.status(404).json({ message: "movie not found" })
        }
    } catch (error) {
        next(error)
    }
}
module.exports = addReviewsToMovie