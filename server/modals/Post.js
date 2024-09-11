const mongoose=require("mongoose");
const User=require("../modals/User");

const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    content:{
        type:String,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        reqiired:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    updatedAt:{
        tyoe:Date
    }
})

module.exports=mongoose.model("Post",postSchema);