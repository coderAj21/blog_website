import Post from "./Post";
import { useState,useEffect } from "react";



function MyPost(){
    const [posts,setPosts]=useState([]);
    async function fetchApi(){
        let data=await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user_post`,{
            method:"GET",
            credentials: 'include',
        });
        let response =await data.json();
        console.log(response);
        setPosts(response.data);
    }
    useEffect(()=>{
        fetchApi();
    },[]);
    return (
        <div className="w-full h-full flex flex-col items-center gap-y-4 overflow-x-auto py-4">
            {
                posts?.map((val,ind)=>{
                    return <Post key={"post"+ind} title={val.title} content={val.content} post_id={val._id} setPosts={setPosts} ></Post>
                })
            }
        </div>
    )
}


export default MyPost;