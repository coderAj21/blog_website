const User=require("../modals/User");
const bcrypt=require("bcrypt");
require("dotenv").config();
const jwt=require("jsonwebtoken");


exports.login=async(req,res)=>{
    try{
        let{email,password}=req.body;
        if(!email || !password){
            return res.status(200).json({
                success:false,
                message:"All Fields required..."
            })
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(200).json({
                success:false,
                message:"User not found Please Sign in ..."
            })
        }
        if (!await bcrypt.compare(password,user.password)){
            return res.status(400).json({
                success:false,
                message:"Password is incorrect..."
            })
        }
        let option={
            email:user.email,
            userId:user._id
        }
        let token=jwt.sign(option,process.env.JWT_SECRET);
        return res.cookie("token",token,{
            httpOnly:true,
        })
        .status(200).json({
            success:true,
            message:"Login Successfully..."
        })
    }catch(error){
        return res.status(400).json({
            success:false,
            message:"Error in login...",
            error:error.message
        })
    }
}

exports.register=async(req,res)=>{
    try{
        let {name,email,password}=req.body;
        if(!name || !email || !password){
            return res.status(200).json({
                success:false,
                message:"All fields required.."
            })
        }
        const user=await User.findOne({email});
        if(user){
            return res.status(200).json({
                success:false,
                message:"User already Existed..."
            })
        }
        let hashed_password=await bcrypt.hash(password,10);
        const new_user=await User.create({
            name,
            email,
            password:hashed_password
        });
        let option={
            email:email,
            userId:new_user._id
        }
        const token=jwt.sign(option,process.env.JWT_SECRET);
        return res.cookie("token",token,{
            httpOnly:true,
        })
        .status(200).json({
            success:true,
            message:"Registered Successfully..."
        })
    }catch(error){
        return res.status(400).json({
            success:false,
            message:"Error in Registering the User....",
            error:error.message
        })
    }
}

exports.logOut=async(req,res)=>{
    try{
        res.clearCookie('token');
        res.status(200).json({
            success:true,
            message:"You are Logged out..."
        })
    }catch(error){
        return res.status(400).json({
            success:false,
            message:"Error in logout the User....",
            error:error.message
        })
    }
}