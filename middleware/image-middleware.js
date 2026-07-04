const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})


// funtion to filter image
const checkfileFilter = (req,file,cb) => {
    if (file.mimetype.startsWith("image")){
        cb(null,true)
    }else{
        cb(new Error("Not an image please upload only image"))
    }
}

module.exports = multer({
    storage: storage,
    fileFilter: checkfileFilter,
    limits:{
        fieldSize:5 *1024 *1025
    }
})