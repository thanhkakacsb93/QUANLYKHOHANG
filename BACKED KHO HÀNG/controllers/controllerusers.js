import modelUser from "../model/modelUser.js"
import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const signup = asyncHandler(async (req, res, next) => {
    const { Username, Password, Role, Keyresetpassword } = req.body

    const checkUsername = await modelUser.findOne({ Username })
    if (checkUsername) {
        res.status(400)
        throw new Error("Username alrealy exists")
    }

    const difficult = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(Password, difficult)
    const newUser = new modelUser({
        Username,
        Password: hashpassword,
        Role,
        Keyresetpassword
    })
    await newUser.save()
    console.log(`${Username}`)

    res.status(200).json({
        message: "đăng ký thành công",
        data: newUser
    })
})

// const login = asyncHandler(async (req, res, next) => {
//     const { username, password } = req.body

//     const checkusername = await modelUser.findMany({ username })
//     if (!checkusername) {
//         res.status(400);
//         throw new Error("username or password is wrong")
//     }

//     const checkpasssword = await bcrypt.compare(password, checkuser.hashpassword)
//     if (!checkpasssword) {
//         res.status(400);
//         throw new Error("username or password is wrong")
//     }



//     const KEY = process.env.KEY_TOKEN
//     const payload = {
//         username: checkuser.username,
//         role: checkuser.role
//     }
//     const token = jwt.sign(payload, KEY, { expiresIn: process.env.TIME_LOGIN })
//     res.status(200).json({
//         message: ("token:", token)
//     })

// }
// ) 

const controller = { signup }
export default controller