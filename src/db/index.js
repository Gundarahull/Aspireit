

const mongoose = require('mongoose');
require('dotenv').config()
const DB_NAME="LinkedinTask"


const connectDB= async ()=>{
    try {
        const connnection=await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log("MONGODB CONNECTED ",connnection.connection.host);
    } catch (error) {
        console.error("Error in ConnecTION DB",error);
        process.exit(1)
    }
}

module.exports=connectDB



