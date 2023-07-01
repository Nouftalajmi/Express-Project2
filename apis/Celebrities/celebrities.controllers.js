const Celebrity = require('../../db/models/Celebrity')
const Movie = require('../../db/models/Movie')

require('dotenv').config()

const getAllCelebrities = async (req, res, next) => {
    try {
        console.log(req.user)


        const celebrity = await Celebrity.find()
        return res.status(200).json(celebrity)
    } catch (error) {
        next(error)
    }
}
const createCelebrities = async (req, res, next) => {
    try {
        const staff = req.user.isStaff
        if (staff) {
            const celebrity = await Celebrity.create(req.body)
            return res.status(201).json(celebrity)
        } return res.status(401).send({ msg: "you are not authorized to add movies" })
    } catch (error) {
        next(error)
    }

}
const addActorstoMovie = async (req, res, next) => {
    try {
        const { celebrityId, movieId } = req.params
        const celebrity = await Celebrity.findById(celebrityId)
        const movie = await Movie.findById(movieId)
        if (celebrity && movie) {
            await celebrity.updateOne({ $push: { movies: movie._id } })
            await movie.updateOne({ $push: { actors: celebrity._id } })

            return res.status(204).end()
        } else {
            return res.status(404).json({ message: "movie or actor not found" })

        }
    } catch (error) {
        next(error)
    }
}


module.exports = { getAllCelebrities, createCelebrities, addActorstoMovie }