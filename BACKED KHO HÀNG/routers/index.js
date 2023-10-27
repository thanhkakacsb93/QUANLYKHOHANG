import express from "express"
import RouterLogin from "./router.Login.js"
import RouterSignup from "./router.signup.js"
import RouterAccount from "./router.viewAccout.js"
import RouterCurrent from "./router.fetchcurentUser.js"
import mdwCheckToken from "../middlewares/mdw.checktoken.js"
import RouterUpdateUser from "./router.updateUser.js"
import Routereleteuser from "./router.deleteUser.js"
import RouteraddShelves from "./router.AddShelves.js"
import Routeraddimg from "./router.addImage.js"
import RouterRepo from "./router.Repo.js"
import RouterSupplies from "./router.AddSupplies.js"
import RouterListSupplies from "./router.viewListSupplies.js"


const router = express.Router()


router.use("/", RouterLogin);
router.use("/Signup", RouterSignup)
router.use("/updateuser", RouterUpdateUser)
router.use("/accounts", RouterAccount)
router.use("/fechtcurrent", mdwCheckToken, RouterCurrent)
router.use("/deleteuser", Routereleteuser)
router.use("/addShelves", RouteraddShelves)
router.use("/addimg", Routeraddimg)
router.use("/repo", RouterRepo)
router.use("/addsupplies", RouterSupplies)
router.use("/listsupplies", RouterListSupplies)









export default router