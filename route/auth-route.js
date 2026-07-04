const express = require("express")
const {userRegister,userLogin, changePassword} = require("../controller/auth-controller")
const userMiddleware = require("../middleware/user-middleware")

const route = express.Router()

route.post("/register",userRegister)
route.post("/login",userLogin)
route.post("/changePassword",userMiddleware,changePassword)

module.exports = route