import express from "express"
import controller from "../controllers/controllerusers.js"
import mdwAuthValication from "../middlewares/mdw.authValication.js"
import schemmavalidation from "../validations/auth.schemauser.js"

const router = express.Router()

router.post("/", mdwAuthValication(schemmavalidation.login), controller.login)


export default router