const mdwerroHandler = (error, req, res, next) => {
    const statusCode = statusCode ?? 500;
    res.status(statusCode).json({
        statusCode,
        message: error.message,
        stuck: error.stuck
    })
}

export default mdwerroHandler