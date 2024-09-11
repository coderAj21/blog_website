const Post=require("../modals/Post");
const User = require("../modals/User");




exports.createPost=async(req,res)=>{
    try{
        let {title,content}=req.body;
        if(!title || !content){
            return res.status(200).json({
                success:false,
                message:"All field Required"
            })
        }
        let userId=req.userId;
        const post=await Post.create({title,content,userId:userId});
        await User.findByIdAndUpdate(
            userId,
            {$push:{posts:post._id}},
            {new:true}
        );
        return res.status(200).json({
            success:true,
            message:"Post created Successfully..."
        })
    }catch(error){
         return res.status(400).json({
            success:false,
            message:"Error occurred in getting all post...",
            error:error.message
        })
    }
}
exports.getAllPost=async(req,res)=>{
    try{
        let getPost=await Post.find();
        if(getPost.length<1){
            return res.status(200).json({
                success:false,
                message:"No post found...."
            })
        }
        return res.status(200).json({
            success:true,
            data:getPost,
            message:"All Post Fetched Successfully..."
        })
    }catch(error){
        return res.status(400).json({
            success:false,
            message:"Error occurred in getting all post...",
            error:error.message
        })
    }
}

exports.getPostById=async(req,res)=>{
    try{
        let id=req.params.id;
        if(!id){
            return res.status(200).json({
                success:false,
                message:"Id not found..."
            })
        }
        let post=await Post.findById({_id:id});
        if(!post){
            return res.status(200).json({
                success:false,
                message:"Post not found..."
            })
        }
        return res.status(200).json({
            success:true,
            message:"Post Fetched Successfully...",
            data:post
        })
    }catch(error){
         return res.status(400).json({
            success:false,
            message:"Error occurred in getting post by Id...",
            error:error.message
        })
    }
}

exports.updatePostById=async(req,res)=>{
    try{
        let id=req.params.id;
        let {title,content}=req.body;
        if(!id){
            return res.status(200).json({
                success:false,
                message:"Id not Found..."
            })
        }
        let userId=req.userId;
        if(!userId){
            return res.status(200).json({
                success:false,
                message:"User Id not found..."
            })
        }
        let update_post=await Post.findOneAndUpdate(
            {_id:id,userId:userId},
            {$set:{title:title,content:content}},
            {new:true}
        );
        if (!update_post){
            return res.status(200).json({
                success:false,
                message:"You are not authorised to update this post"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Post Updated Successfully..."
        })
    }catch(error){
         return res.status(400).json({
            success:false,
            message:"Error occurred in updating the post...",
            error:error.message
        })
    }
}

exports.deletePostById=async(req,res)=>{
    try{
        let id=req.params.id;
        if(!id){
            return res.status(200).json({
                success:false,
                message:"Id not Found..."
            })
        }
        let userId=req.userId;
        if(!userId){
            return res.status(200).json({
                success:false,
                message:"User Id not found..."
            })
        }
        let delete_post=await Post.findOneAndDelete({_id:id,userId:userId});
        if(!delete_post){
            return res.status(200).json({
                success:false,
                message:"You are not authorised to delete this post"
            })
        }
        await User.findByIdAndUpdate(
            userId,
            {$pull:{posts:id}}
        );
        return res.status(200).json({
                success:true,
                message:"Post Deleted Successfully...."
        })
    }catch(error){
        return res.status(400).json({
            success:false,
            message:"Error occurred in deleting the post...",
            error:error.message
        })
    }
}
exports.getUserPost=async(req,res)=>{
    try{
        let userId=req.userId;
        if(!userId){
            return res.status(200).json({
                success:false,
                message:"Please login..."
            })
        }
        let user=await User.findById(userId).populate("posts").exec();
        if (user.posts.length<1){
            return res.status(200).json({
                success:false,
                message:"Not Post Found..."
            })
        }
        return res.status(200).json({
            success:true,
            message:"All Post Fetched Successfully...",
            data:user.posts
        })
    }catch(error){
        return res.status(400).json({
            success:false,
            message:"Error occurred in getting the post...",
            error:error.message
        })

    }
}
