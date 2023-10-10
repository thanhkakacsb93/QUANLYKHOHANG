import express from "express"
import asyncHandler from "express-async-handler"
import modelUser from "../model/modelUser.js"
import bcrypt from "bcrypt"
import validation from "../validations/auth.schemauser.js"
import controller from "../controllers/controllerusers.js"
import schemmavalidation from "../validations/auth.schemauser.js"
import mdwAuthValication from "../middlewares/mdw.authValication.js"


const router = express.Router()

router.post('/', mdwAuthValication(schemmavalidation.schemasignup), controller.signup)






//  async (req, res) => {
//     const { Username, Password, Role, Keyresetpassword } = req.body
//     console.log("req.body")
// console.log(req.body)

// const checkUserSigup = await modelUser.findOne({ Username })
// if (!checkUserSigup) {
//     // res.status(400);
//     // throw new Error("username already exists")
//     res.status(400).json({
//         message: "error"
//     })

// }
// const difficult = await bcrypt.genSalt(10)
// const hashPassword = await bcrypt.hash(passwould, difficult)
// const newUser = new modelUser(
//     {
//         username,
//         passwould: hashPassword,
//         Role,
//         Keyresetpassword
//     })

// await newUser.save()

// const payload = {
//     Username,
//     Role
// }
// const KEY = process.env.KEY_TOKEN
// const token = jwt.sign(payload, KEY, {
//     expiresIn: process.env.TIME_TOKEN
// })

// res.json({
//     accesstoken: token
// })

// })

export default router