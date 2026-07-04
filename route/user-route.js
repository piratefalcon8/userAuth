const express = require("express")
const userMiddleware = require("../middleware/user-middleware")

const route = express.Router()

route.get("/userRoute",userMiddleware,(req,res) => {
    const {userId,userEmail,userRole} = req.userInfo
    res.status(200).json({
        message:"Welcome to the home page",
        user:{
            _id:userId,
            userEmail,
            userRole
        }
    })
})

module.exports = route