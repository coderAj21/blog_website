const mongoose=require("mongoose");
require("dotenv").config();


const connectDB=()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("DB is Connected...."))
    .catch((error)=>{
        console.log("Error in Connecting Database")
        console.log(error.message)
    });
}

module.exports=connectDB;