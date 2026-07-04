const cloudinary = require("../config/cloudinary");

const uploadToCld = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath);
        return {
            url: result.secure_url,
            publicId: result.public_id
        }; 
    } catch (error) {
        console.error("Cloudinary upload raw error:", error);
        throw new Error("Failed to upload asset to Cloudinary service");
    }
};

// Export the function directly
module.exports = uploadToCld;