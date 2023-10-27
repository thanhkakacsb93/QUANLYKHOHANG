import express from "express"
import controller from "../controllers/controllerShelves.js"

const router = express.Router()

router.post("/", controller.listshelves)

export default router