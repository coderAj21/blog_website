import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";


function Post({title,content,post_id,setPosts}){
    const navigate=useNavigate();
    function editHandler(){
        navigate("/edit_post",{state:{title,content,post_id}});
    }
    async function deleteHandler(){
        let data=await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/posts/${post_id}`,{
            method:"DELETE",
            credentials:"include",
        });
        let response=await data.json();
        if(response.success){
            setPosts((prev)=>{
                prev.filter((val,id)=>id!==post_id)
            });
            return toast.success(response.message,{position:"top-center",autoClose:3000});
        }
        return toast.error(response.message,{position:"top-center",autoClose:3000});
    }
    return (
        <div className="border w-1/2 h-fit shadow rounded-md">
            <p className="uppercase font-bold mx-4 my-2">{title}</p>
            <p className="mx-4">{content}</p>
            <div className="flex gap-x-4 m-4">
                <button onClick={editHandler} className="bg-zinc-700 text-white p-1 px-4 rounded hover:bg-zinc-900
                                    transition duration-150 ease-in">Edit</button>
                <button onClick={deleteHandler} className="bg-red-700 text-white p-1 px-4 rounded hover:bg-red-900
                 transition duration-150 ease-in" >Delete</button>
            </div>
        </div>
    )
};

export default Post;