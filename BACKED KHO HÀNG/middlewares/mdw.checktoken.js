import jwt from "jsonwebtoken"

const mdwCheckToken = (req, res, next) => {
    try {
        const accesstoken = req.headers["x-access-token"]
        if (!accesstoken) {
            return res.status(400).json({
                message: "missing token"
            })
        }
        const checktoken = jwt.verify(accesstoken, process.env.KEY_TOKEN)
        req.user = checktoken

        next()
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(400).json({
                message: "token expired"
            })
        }
        else {
            return res.status(500).json({
                message: error.message,
                stack: error.stack
            })
        }

    }
}
export default mdwCheckToken