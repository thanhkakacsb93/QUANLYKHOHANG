import express from "express"
import controller from "../controllers/controllerusers.js"
import mdwCheckToken from "../middlewares/mdw.checktoken.js"

const router = express.Router()

router.get("/", controller.fetchCurrentUser)



export default router