import express from "express"
import controller from "../controllers/controllerShelves.js"
import mdwAuthValication from "../middlewares/mdw.authValication.js"
import schemmavalidationRepo from "../validations/aut.sachemaRepo.js"

const router = express.Router()

router.post("/", mdwAuthValication(schemmavalidationRepo.SchemaSupplies), controller.addSupplies)

export default router
