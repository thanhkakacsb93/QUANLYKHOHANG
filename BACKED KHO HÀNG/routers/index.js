import express from "express"
import RouterLogin from "./router.Login.js"
import RouterSignup from "./router.signup.js"

const router = express.Router()


// router.use("./login", RouterLogin);
router.use("/Signup", RouterSignup)

export default router