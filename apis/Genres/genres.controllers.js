const Genre = require('../../db/models/Genre')

require('dotenv').config()

const getGenres = async (req, res, next) => {
    try {
        console.log(req.user)


        const genre = await Genre.find()
        return res.status(200).json(genre)
    } catch (error) {
        next(error)
    }
}
const createGenre = async (req, res, next) => {
    try {
        const staff = req.user.isStaff
        if (staff) {
            // req.body.addedBy = req.user._id
            const genre = await Genre.create(req.body)
            return res.status(201).json(genre)
        } return res.status(401).send({ msg: "you are not authorized to add movies" })
    } catch (error) {
        next(error)
    }

}

module.exports = { getGenres, createGenre }