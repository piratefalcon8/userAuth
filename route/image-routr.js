const express = require("express")
const userMiddleware = require("../middleware/user-middleware")
const adminMiddleware = require("../middleware/admin-middleware")
const imageMiddleware = require("../middleware/image-middleware")
const { uploadImageController, fetchImageController } = require("../controller/image-controller")

const route = express.Router()

//upload the image 
route.post("/upload",userMiddleware,adminMiddleware,imageMiddleware.single("image"),uploadImageController)

//get all the image
route.get("/images",userMiddleware,fetchImageController)


module.exports = route