const jwt=require("jsonwebtoken");

function authorization (req,res,next){
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(200).json({
                success:false,
                message:"Please login ....."
            })
        }
        let {email,userId}=jwt.verify(token,process.env.JWT_SECRET);
        req.email=email;
        req.userId=userId;
        next();
    }catch(error){
        return res.status(200).json({
            success:false,
            message:"Error in authorization...",
            error:error.message
        })
    }
}


module.exports=authorization;