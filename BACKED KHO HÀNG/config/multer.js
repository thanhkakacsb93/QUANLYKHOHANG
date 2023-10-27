import multer from "multer";

const multerconfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const fileExtention = file.originalname.split('.').pop()
        const filename = `${file.originalname}-${uniqueSuffix}.${fileExtention}`
        cb(null, filename)
    }
})

export default multerconfig