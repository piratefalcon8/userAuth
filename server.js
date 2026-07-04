const express = require("express")
const connectToDb = require("./database/db")
const authRoute = require("./route/auth-route")
const userRoute = require("./route/user-route")
const adminRoute =require("./route/admin-route")
const uploadImageRoute = require("./route/image-routr")


connectToDb()

const app = express()

app.use(express.json())

app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)
app.use("/api/admin", adminRoute)
app.use("/api/image",uploadImageRoute)

const PORT = process.env.PORT || 7000

app.listen(PORT,() => {
    console.log(`Server is runing on port ${PORT} `);
    
})