const { model, Schema } = require('mongoose')

const CelebritySchema = new Schema({
    name: { type: String, required: true },
    movies: [{ type: Schema.Types.ObjectId, ref: "Movie" }]

})

module.exports = model('Celebrity', CelebritySchema)