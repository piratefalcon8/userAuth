const jwt = require("jsonwebtoken")


const userMiddleware = (req,res,next) => {
    const authHeader = req.headers["authorization"]
    console.log("Token", authHeader);

    const token = authHeader && authHeader.split(" ")[1]
    if (!token) {
        return res.status(400).json({
            success:false,
            message:"Do not have an account Register now"
        })
    }
    try {
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log(decodedToken);
        req.userInfo = decodedToken
        next()
    } catch (error) {
        console.log("Server error",error);
        res.status(500).json({
            success:false,
            message:"Server error"
        })
    } 
}
module.exports = userMiddleware