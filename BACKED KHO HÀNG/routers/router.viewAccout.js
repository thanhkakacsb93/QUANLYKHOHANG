import express from "express"
import controller from "../controllers/controllerusers.js"


const router = express.Router()

router.get('/', controller.account)

export default router