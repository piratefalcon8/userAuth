const mongoose = require("mongoose")

const connectToDb = async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Database connected successfully");
        
    } catch (error) {
        console.log("Failed to connect to database");
        process.exit(1)
    }
}
module.exports = connectToDb