const { model, Schema } = require('mongoose')

const GenreSchema = new Schema({
    name: { type: String, required: true },
    movies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],

})

module.exports = model('Genre', GenreSchema)