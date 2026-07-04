const Image = require("../models/image-model");
// Match casing perfectly with the file export
const uploadToCld = require("../helper/cld-helper");
const fs = require("fs")

const uploadImageController = async (req, res) => {
    try {
        // 1. Verify Multer successfully caught the file stream
        if (!req.file) {
            return res.status(400).json({ // Changed to 400 Bad Request
                success: false,
                message: "No file uploaded. Please select an image file."
            });
        }

        // 2. Pass local disk path from Multer directly to our Cloudinary helper
        const { url, publicId } = await uploadToCld(req.file.path);

        // 3. Save the returned asset URLs into your MongoDB Image Schema
        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId // Populated by your userMiddleware
        });
        
        await newlyUploadedImage.save();

         fs.unlinkSync(req.file.path)

        res.status(201).json({
            success: true,
            message: "Image uploaded and saved successfully",
            userImage: newlyUploadedImage
        });
        
    } catch (error) {
        console.error("Upload controller operation failed:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error during image upload processing."
        });
    }
};

const fetchImageController = async (req,res) => {
    try {
        const image = await Image.find({})
        if (image) {
            res.status(200).json({
                success:true,
                message:"image fetched successfully",
                data:image
            })
        }
    } catch (error) {
        console.log("sever error ",error);
        res.status(500).json({
            success:false,
            message: "server error"
        })
    }
}

module.exports = {
    uploadImageController,
    fetchImageController
};