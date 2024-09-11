const express=require("express");
const { login, register, logOut } = require("../controllers/userController");
const auth = require("../middleware/auth");
const { getAllPost, createPost, getPostById, updatePostById, deletePostById, getUserPost } = require("../controllers/postController");
const router=express.Router();


//middleware
router.get("/auth",auth)

// authentication
router.post("/login",login);
router.post("/register",register);

// posts
router.get("/posts",getAllPost);
router.post("/posts",auth,createPost);
router.get("/posts/:id",getPostById);
router.put("/posts/:id",auth,updatePostById);
router.delete("/posts/:id",auth,deletePostById);
router.get("/user_post",auth,getUserPost);
router.post("/logout",logOut);


module.exports=router;