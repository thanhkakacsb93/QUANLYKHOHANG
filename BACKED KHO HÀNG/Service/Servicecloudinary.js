import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: "dphpzud46",
    api_key: '823198521483488',
    api_secret: 'AukvFyXCUJLfzyubghqjJIMUyrU'
})

const uploadImg = (filePath, foder = 'imgsupplies') => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(filePath, {
            resource_type: "auto",
            folder: "imgsupplies"
        }, (error, result) => {
            if (error) {
                reject(error)
            } else {
                fs.unlink(filePath)
                // console.log("result: ", result)
                // console.log(filePath)
                resolve({
                    url: result.secure_url,
                    id: result.public_id
                })
            }
        })
    })
}

const cloudinaryService = { uploadImg }

export default cloudinaryService