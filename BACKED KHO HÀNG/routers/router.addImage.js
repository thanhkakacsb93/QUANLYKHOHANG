import express from "express"
import controller from "../controllers/controllerShelves.js"
// import multer from "multer"
import mdwuploadimg from "../middlewares/mdw.uploadImg.js"

// const multerconfig = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/");
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         const fileExtention = file.originalname.split('.').pop()
//         const filename = `${file.originalname}-${uniqueSuffix}.${fileExtention}`
//         cb(null, filename)
//     }
// })
// const mdwuploadidm = multer({
//     storage: multerconfig
// })
const router = express.Router()

router.post("/", mdwuploadimg.single("image"), controller.addImage)

export default router