import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

function EditPost(){
    const location=useLocation();
    const navigate=useNavigate();
    const {title,content,post_id}=location.state;
    
    let [formData,setFromData]=useState({
        title:title,
        content:content,
    })

    async function changeHanlder(event){
        setFromData((prev)=>(
            {
                ...prev,
                [event.target.name]:event.target.value
            }
        ))
        
    };
    async function submitHandler(event){
        event.preventDefault();
        let data=await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/posts/${post_id}`,{
            method:"PUT",
            credentials:"include",
            body:JSON.stringify(formData),
            headers:{'Content-Type':'application/json'}
        });
        let response=await data.json();
        if(response.success){
            return toast.success(response.message,{position:"top-center",autoClose:3000});
        }
        return toast.error(response.message,{position:"top-center",autoClose:3000});
    };
    console.log(formData);
    return ( 
        <div className="w-full h-full my-6">
             <form  className='w-3/5 max-md:w-full h-1/2 flex flex-col gap-y-5 mx-auto shadow-lg '>
                <h1 className='text-center text-2xl font-semibold my-2 font-sans max-md:text-lg '>Edit Post</h1>
                <div className="relative h-10 w-10/12 mx-auto">
                        <input onChange={changeHanlder} type="text" name="title" id="title" value={formData.title}   className='input-field'required placeholder=" " />
                        <label className='input-label'>Post Title </label>
                </div>
                <div className="relative h-10 w-10/12 mx-auto">
                        <input onChange={changeHanlder} type="text" name="content" id="content" value={formData.content}  className='input-field'required placeholder=" " />
                        <label className='input-label'>Post Content </label>
                </div>
                <div className="relative flex gap-x-4 h-10 w-10/12 mx-auto max-md:text-sm">
                    <button onClick={submitHandler}
                        className='w-fit h-fit  bg-zinc-700 px-4  py-1 max-sm:px-2 text-white rounded hover:bg-zinc-900
                        transition duration-150'>Submit</button>
                    <button
                        onClick={(event)=>{
                            event.preventDefault();
                            navigate("/");
                        }}
                        className="bg-red-700 w-fit h-fit text-white p-1 px-4 max-sm:px-2 rounded hover:bg-red-900
                        transition duration-150 ease-in" >Close</button>
                </div>                
            </form>
        </div>
    )
};

export default EditPost;