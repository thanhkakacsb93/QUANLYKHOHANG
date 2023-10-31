import asyncHandler from "express-async-handler"
import modelShelves from "../model/modelShelves.js"
import { v2 as cloudinary } from "cloudinary"
import cloudinaryService from "../Service/Servicecloudinary.js"
import modelSupplies from "../model/modelSupplies.js"

// cloudinary.config({
//     cloud_name: "dphpzud46",
//     api_key: '823198521483488',
//     api_secret: 'AukvFyXCUJLfzyubghqjJIMUyrU'
// })

const listshelves = asyncHandler(async (req, res) => {
    const { CreatorId } = req.body
    console.log("req.body", req.body)
    const repo = await modelShelves.find({ CreatorId })
    res.status(200).json({
        data: repo
    })
})

const addShelves = asyncHandler(async (req, res) => {
    const { CreatorId, NameShelves } = req.body
    const checknameShelves = await modelShelves.findOne({ $and: [{ CreatorId }, { NameShelves }] })
    if (checknameShelves) {
        res.status(400)
        throw new Error("nameShelves alrealy exists")
    }
    const newShelves = new modelShelves({
        CreatorId,
        NameShelves
    })
    await newShelves.save()

    res.status(200).json({
        message: "Shelves created successfully"
    })

})

const addImage = asyncHandler(async (req, res) => {
    const file = req.file
    // console.log("file: ", file)

    // const result = await cloudinary.uploader.upload(file.path, {
    //     resource_type: "auto",
    //     folder: "imgsupplies"
    // })

    const result = await cloudinaryService.uploadImg(file.path)

    res.json({
        message: "tai anh xong"
    })
})

const addSupplies = asyncHandler(async (req, res) => {
    const { CreatorId, NameShelves, NameSupplies, Quantity, Unit } = req.body

    if (!CreatorId || !NameShelves || !NameSupplies || !Quantity || !Unit) {
        res.status(400)
        throw new Error("not enough information")
    }

    const checkSupplies = await modelSupplies.findOne({ $and: [{ CreatorId }, { NameShelves }, { NameSupplies }] })

    if (checkSupplies) {
        const Total = +checkSupplies.Quantity + +Quantity
        console.log(Total)
        await modelSupplies.updateOne({ _id: checkSupplies._id }, { Quantity: Total })
        return res.status(200).json({
            message: `${NameSupplies} quantity has been updated`
        })
    }

    const newSupplies = new modelSupplies({
        CreatorId,
        NameShelves,
        NameSupplies,
        Quantity,
        Unit
    })
    await newSupplies.save()

    res.status(200).json({
        message: `${NameSupplies} were added successfully`
    })

})

const listSupplies = asyncHandler(async (req, res) => {
    const { CreatorId, NameShelves } = req.body

    if (!CreatorId || !NameShelves) {
        res.status(400)
        throw new Error("error information")
    }

    const listSupplies = await modelSupplies.find({ $and: [{ CreatorId }, { NameShelves }] })
    res.status(200).json({
        data: listSupplies
    })
})

const deleteSupplies = asyncHandler(async (req, res) => {
    const { id } = req.body
    console.log(id)
    const checkSupplies = await modelSupplies.findOne({ _id: id })
    if (!checkSupplies) {
        res.status(400)
        throw new Error("supplies not found")
    }
    await modelSupplies.deleteOne({ _id: id })
    res.status(200).json({
        message: `${checkSupplies.NameSupplies} has been deleted`
    })
})

const updateSupplies = asyncHandler(async (req, res) => {
    const { NameSupplies, Quantity, Unit, NameShelves, id } = req.body
    const newvalue = {
        NameSupplies, Quantity, Unit, NameShelves
    }

    const checkSupplies = await modelSupplies.findOne({ _id: id })
    if (!checkSupplies) {
        res.status(400)
        throw new Error("supplies not found")
    }
    await modelSupplies.updateOne({ _id: id }, newvalue)
    res.status(200).json({
        message: "has been updated"
    })
})

const controller = { addShelves, addImage, listshelves, addSupplies, listSupplies, deleteSupplies, updateSupplies }
export default controller