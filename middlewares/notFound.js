const notFound = (req, res, next) => {
    return res.status(404).json({
        msg: "path not found!"
    })
}

module.exports = notFound