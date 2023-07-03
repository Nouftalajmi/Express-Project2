const { model, Schema } = require('mongoose')

const MovieSchema = new Schema({
    name: { type: String, required: true },

    actors: [{ type: Schema.Types.ObjectId, ref: "Celebrity" }],

    releaseDate: { type: Date },

    genres: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    watchlist: { type: Schema.Types.ObjectId, ref: "Watchlist" },



})

module.exports = model('Movie', MovieSchema)