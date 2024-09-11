import {useRef, useState} from "react"
import { toast } from "react-toastify";

function CreatePost(){
    let form=useRef(null);
    let [formData,setFromData]=useState({
        title:"",
        content:""
    })
    async function submitHandler(event){
        event.preventDefault();
        let data=await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/posts`,{
            method:"POST",
            credentials:"include",
            body:JSON.stringify(formData),
            headers:{'Content-Type':'application/json'}
        });
        let response=await data.json();
        console.log(response);
        if(response.success){
            form.current.reset();
            return toast.success(response.message,{position:'top-center',autoClose:3000});
        }

        
    };
    function changeHanlder(event){
        setFromData((prev)=>(
            {
                ...prev,
                [event.target.name]:event.target.value
            }
        ))
    }
    console.log(formData);  
    return(
        <div className="w-full h-full my-6">
             <form ref={form} className='w-3/5 max-md:w-full h-1/2 flex flex-col gap-y-5 mx-auto shadow-lg '>
                <h1 className='text-center text-2xl font-semibold my-2 font-sans max-md:text-lg '>Create Post</h1>
                <div className="relative h-10 w-10/12 mx-auto">
                        <input onChange={changeHanlder} type="text" name="title" id="title"   className='input-field'required placeholder=" " />
                        <label className='input-label'>Post Title </label>
                </div>
                <div className="relative h-10 w-10/12 mx-auto">
                        <input onChange={changeHanlder} type="text" name="content" id="content"   className='input-field'required placeholder=" " />
                        <label className='input-label'>Post Content </label>
                </div>
                <div className="relative h-10 w-10/12 mx-auto max-md:text-sm">
                    <button onClick={submitHandler}
                className='w-fit h-fit  bg-zinc-700 px-4  py-1 text-white rounded hover:bg-zinc-900 transition duration-150'>Submit</button>
                </div>                
            </form>
        </div>
    )
}



export default CreatePost;