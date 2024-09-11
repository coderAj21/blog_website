import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";


function Header({isLogin,setIsLogin}){

    async function logoutHandler(){
        let data=await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/logout`,{
            method:"POST",
            body:JSON.stringify({Logout:"logout"}),
            headers:{'Content-Type':'application/json'},
            credentials:"include",
        });
        let response=await data.json();
        if(response.success){
            setIsLogin(false);
            return toast.success(response.message,{position:"top-center",autoClose:3000});
        }
        return toast.error(response.message,{position:"top-center",autoClose:3000});
    }

    return (
        <div className="w-full flex justify-between items-center my-1">
            <NavLink to="/" className="text-5xl font-semibold cursor-pointer" >BLOG</NavLink>
            <div className="flex flex-row gap-x-4 text-lg">
                <NavLink className="hover:scale-95 transition duration-150 cursor-pointer" to="/"> Home
                </NavLink>
                <NavLink className="hover:scale-95 transition duration-150 cursor-pointer" to="/my_post"> My Post
                </NavLink>
                <NavLink className="hover:scale-95 transition duration-150 cursor-pointer" to="/create_post"> Create Post
                </NavLink>
            </div>
            <div>
                {
                    isLogin?
                    (<button onClick={logoutHandler}
                        className="bg-zinc-700 text-white p-1 px-4 rounded hover:bg-zinc-900 transition duration-150 ease-in "
                >Log out</button>)
                    :
                    (<NavLink className="bg-zinc-700 text-white p-1 px-4 rounded hover:bg-zinc-900 transition duration-150 ease-in "
                    to="/login">Login</NavLink>)
                }
            </div>

        </div>
    )
}

export default Header;