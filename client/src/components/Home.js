import { useEffect, useState } from "react";
import Post from "./Post";

function Home(){
    const [posts,setPosts]=useState([]);
    async function fetchApi(){
        let data=await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/posts`);
        let response =await data.json();
        setPosts(response.data);
    }
    useEffect(()=>{
        fetchApi();
    },[]);
    console.log(posts);
    return (
        <div className="w-full h-full flex flex-col items-center gap-y-4 py-4">
            {
                posts?.map((val,ind)=>{
                    return <Post key={"post"+ind} title={val.title} content={val.content} post_id={val._id} setPosts={setPosts}  ></Post>
                })
            }
        </div>
    )
}


export default Home;