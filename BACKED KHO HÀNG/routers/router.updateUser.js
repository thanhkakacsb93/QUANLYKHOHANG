import express from "express"
import controller from "../controllers/controllerusers.js"

const router = express.Router()

router.post("/", controller.update)


export default router