const Genre = require('../../db/models/Genre')
const Movie = require('../../db/models/Movie')


require('dotenv').config()

const getAllmovies = async (req, res, next) => {
    try {
        console.log(req.user)


        const movie = await Movie.find().populate("genres", "name").populate("actors", "name").populate("reviews", "ratings review")
        return res.status(200).json(movie)
    } catch (error) {
        next(error)
    }
}
const createmovie = async (req, res, next) => {
    try {

        const staff = req.user.isStaff
        if (staff) {
            ``
            const movie = await Movie.create(req.body)

            return res.status(201).json(movie)
        } return res.status(401).json({ msg: "you are not authorized to add movies" })
    } catch (error) {
        next(error)
    }

}
const addGenraToMovie = async (req, res, next) => {
    try {
        const staff = req.user.isStaff
        if (staff) {

            const movie = await Movie.findOne({ _id: req.params.movieId })
            const genre = await Genre.findOne({ _id: req.params.genreId })


            if (movie && genre) {
                await movie.updateOne({ $push: { genres: genre._id } })
                await genre.updateOne({ $push: { movies: movie._id } })

                return res.status(200).json({ msg: "updated" })
            }
            return res.status(401).json({ msg: "movie not found" })



        } return res.status(401).json({ msg: "you are not authorized to add movies" })
    } catch (error) {
        next(error)
    }

}
const getMovie = async (req, res, next) => {
    try {
        const { movieId } = req.params
        const movie = await Movie.findById(movieId).populate('genres actors reviews')
        if (movie) {
            res.status(200).json(movie)

        } else {
            res.status(404).json({ message: "movie not found" })

        }
    } catch (error) {
        next(error)

    }

}
const deleteMovie = async (req, res, next) => {
    try {
        const staff = req.user.isStaff
        if (staff) {

            await Movie.deleteOne()

            return res.status(204).end()
        } return res.status(401).json({ msg: "you are not authorized to add movies" })

    } catch (error) {
        next(error)
    }
}

module.exports = { getAllmovies, createmovie, addGenraToMovie, getMovie, deleteMovie }