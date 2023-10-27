import modelUser from "../model/modelUser.js"
import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const signup = asyncHandler(async (req, res) => {
    const { Username, Password, Role, Keyresetpassword, Expiry } = req.body

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
        Keyresetpassword,
        Expiry
    })
    await newUser.save()
    console.log(`${Username}`)

    res.status(200).json({
        message: "đăng ký thành công",
        data: newUser
    })
})

const login = asyncHandler(async (req, res) => {
    const { Username, Password } = req.body
    console.log(Username, Password)


    const checkuser = await modelUser.findOne({ Username })
    if (!checkuser) {
        res.status(400);
        throw new Error("username or password is wrong")
    }

    const checkpasssword = await bcrypt.compare(Password, checkuser.Password)
    if (!checkpasssword) {
        res.status(400);
        throw new Error("username or password is wrong")
    }

    const KEY = process.env.KEY_TOKEN
    const payload = {
        Username: checkuser.Username,
        Role: checkuser.Role,
        id: checkuser._id,
        Expiry: checkuser.Expiry
    }
    const token = jwt.sign(payload, KEY, {
        expiresIn: process.env.TIME_TOKEN
    })
    res.status(200).json({
        token
    })
})

const fetchCurrentUser = asyncHandler(async (req, res) => {

    const idUser = req.user.id

    const datauser = await modelUser.findOne({ _id: idUser }).select("-Password")
    res.status(200).json({
        data: datauser
    })
})

const account = asyncHandler(async (req, res) => {
    // const { address, age, key, name } = req.body
    // console.log("skugcuybvclaksjc")
    // console.log(address, age, key, name)
    const dataaccount = await modelUser.find({}).select("-Password")
    if (!dataaccount) {
        res.status(500)
        throw new Error("server is not responding")
    }
    res.status(200).json({
        data: dataaccount
    })

})

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body
    console.log(id)
    const checkid = await modelUser.findOne({ _id: id })
    if (!checkid) {
        res.status(400)
        throw new Error("error checking id")
    }
    await modelUser.deleteOne({ _id: id })
    res.status(200).json({
        message: "deleted user"
    })
})


const update = asyncHandler(async (req, res) => {
    console.log("dax up date")
    const { Expiry, id } = req.body
    console.log(Expiry, id)

    const checkuser = await modelUser.findOne({ _id: id })
    if (!checkuser) {
        res.status(400);
        throw new Error("error operation")
    }

    const updateUser = await modelUser.updateOne({ _id: id }, { Expiry })
    const dataaccount = await modelUser.find({}).select("-Password")
    res.status(200).json({
        data: dataaccount
    })
})




const controller = { signup, account, login, fetchCurrentUser, update, deleteUser }
export default controller