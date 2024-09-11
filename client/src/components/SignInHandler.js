import { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";


function SignInHandler({isRegistered,setIsRegistered,setIsLogin}){
    let form=useRef(null);
    const navigate=useNavigate();
    let [formData,setFromData]=useState({
        email:"",
        password:"",
        name:"",
        confirmPassword:""
    })
    async function submitHandler(event){
        event.preventDefault();
        let data=await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/register`,{
            method:"POST",
            body:JSON.stringify(formData),
            headers:{'Content-Type':'application/json'}
        });
        let response=await data.json();
        if(response.success){
            navigate("/");
            setIsLogin(true);
        };
        
    };
    function changeHanlder(event){
        setFromData((prev)=>(
            {
                ...prev,
                [event.target.name]:event.target.value
            }
        ))
    }
    return(
        <div className="w-full h-full my-6">
             <form ref={form} className='w-3/5 max-md:w-full h-1/2 flex flex-col gap-y-5 mx-auto shadow-lg '>
                <h1 className='text-center text-2xl font-semibold my-2 font-sans '>Sign In</h1>
                <div className="relative h-10 w-10/12 mx-auto">
                        <input onChange={changeHanlder} type="text" name="name" id="name"   className='input-field'required placeholder=" " />
                        <label className='input-label'>Name </label>
                </div>
                <div className="relative h-10 w-10/12 mx-auto">
                        <input onChange={changeHanlder} type="text" name="email" id="email"   className='input-field'required placeholder=" " />
                        <label className='input-label'>Email </label>
                </div>
                <div className="w-10/12 justify-between flex mx-auto gap-x-6 ">
                    <div className="relative h-10 w-1/2">
                        <input onChange={changeHanlder} type="password" name="password" id="password"   className='input-field'required placeholder=" " />
                        <label className='input-label'>Password </label>
                    </div>
                    <div className="relative h-10 w-1/2 ">
                        <input onChange={changeHanlder} type="text" name="confirmPassword" id="confirmPassword"   className='input-field'required placeholder=" " />
                        <label className='input-label'>Confirm Password </label>
                    </div>                     
                </div>
                <div className="w-full ml-16 flex gap-x-2 cursor-pointer">
                    <p className="text-zinc-400">{isRegistered?"New to BLOG":"Alreday Registred?"}</p>
                    <p onClick={()=>setIsRegistered(!isRegistered)} >{isRegistered?"Sign in":"Log in"}</p>
                </div>
                <div className="relative h-10 w-10/12 mx-auto">
                    <button onClick={submitHandler}
                className='w-fit h-fit  bg-zinc-700 px-4  py-1 text-white rounded hover:bg-zinc-900 transition duration-150'>Submit</button>
                </div>                
            </form>
        </div>
    )
}


export default SignInHandler;