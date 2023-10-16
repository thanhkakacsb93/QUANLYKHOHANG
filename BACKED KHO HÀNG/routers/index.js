import express from "express"
import RouterLogin from "./router.Login.js"
import RouterSignup from "./router.signup.js"
import RouterAccount from "./router.viewAccout.js"
import RouterCurrent from "./router.fetchcurentUser.js"
import mdwCheckToken from "../middlewares/mdw.checktoken.js"
import RouterUpdateUser from "./router.updateUser.js"


const router = express.Router()


router.use("/", RouterLogin);
router.use("/Signup", RouterSignup)
router.use("/updateuser", RouterUpdateUser)
router.use("/accounts", RouterAccount)
router.use("/fechtcurrent", mdwCheckToken, RouterCurrent)


export default router