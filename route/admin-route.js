const express = require("express")
const userMiddleware = require("../middleware/user-middleware")
const adminMiddleware = require("../middleware/admin-middleware")

const route = express.Router()

route.get("/adminRoute",userMiddleware,adminMiddleware,(req,res) => {
    res.json({
        message:"Welcome to the admin page",
    })
})

module.exports = route