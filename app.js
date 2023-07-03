const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./dataBase')
const notFound = require('./middlewares/notFound')
const errorHandler = require('./middlewares/errorHandler')
const morgan = require('morgan')
const cors = require('cors')
const userRouter = require("./apis/user/user.routes")
const movieRouter = require('./apis/movies/movies.routes')
const genresRouter = require("./apis/Genres/genres.routes")
const reviewsRouter = require("./apis/reviews/reviews.routes")
const CelebrityRouter = require("./apis/Celebrities/celebrities.routes")

const { localStrategy, jwtStrategy } = require('./middlewares/localStrategy')
const passport = require('passport')
const path = require('path')


// middlewares before routes
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(passport.initialize())
passport.use(localStrategy)
passport.use(jwtStrategy)

// routes
app.use('/media', express.static(path.join(__dirname, 'media')))
app.use('/api', userRouter)
app.use('/api', movieRouter)
app.use('/api', CelebrityRouter)
app.use("/api", genresRouter)
app.use("/api", reviewsRouter)

// middlewares after routes
app.use(notFound)
app.use(errorHandler)


connectDB()

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`App is runnig on port: ${PORT}`)
})