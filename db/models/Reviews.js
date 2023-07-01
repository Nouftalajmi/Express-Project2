const { model, Schema } = require('mongoose')

const ReviewSchema = new Schema({


    ratings: { type: Number, required: true },
    review: { type: String, required: true },
    movie: { type: Schema.Types.ObjectId, ref: "Movie" },
    addedBy: { type: Schema.Types.ObjectId, ref: "User" },




})

module.exports = model('Review', ReviewSchema)