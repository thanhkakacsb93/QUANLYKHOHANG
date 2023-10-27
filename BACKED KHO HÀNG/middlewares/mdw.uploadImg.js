import multer from "multer"
import multerconfig from "../config/multer.js"

const mdwuploadimg = multer({
    storage: multerconfig
})

export default mdwuploadimg