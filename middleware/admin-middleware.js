const adminMiddleware = (req, res, next) => {
    // This safely runs right after userMiddleware sets req.userInfo
    if (!req.userInfo || req.userInfo.userRole !== "admin") { 
        return res.status(403).json({
            success: false,
            message: "Access denied. Admin rights required."
        });
    }
    next();
};
module.exports=adminMiddleware