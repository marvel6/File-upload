const notFound = (req, res,next) => {
    res.status(404).json('Route does not exist')
    next();
}

module.exports = notFound
