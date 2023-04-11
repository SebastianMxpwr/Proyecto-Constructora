const multer = require('multer') 
const {uuid} = require('uuidv4')
const path = require('path')

const storage = multer.diskStorage({
    destination: 'uploads/profile_pictures',
    filename:(req, file, cb)=>{
        cb(null, uuid() + path.extname(file.originalname))
    }
})

const upload_Prp = multer({
    storage: storage,
    fileFilter: (req, file, cb)=>{
        if(file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/jpg"){
            cb(null, true)
        }else{
            cb(null, false)
            return cb(new Error("solo se permiten imgenes").message)
        }
    }
})

module.exports = upload_Prp