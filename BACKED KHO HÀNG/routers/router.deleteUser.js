import express from "express"
import controller from "../controllers/controllerusers.js"

const router = express.Router()

router.post("/", controller.deleteUser)


export default router