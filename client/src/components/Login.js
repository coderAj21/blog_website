import {useState } from "react";
import LoginHandler from "./LoginHandler";
import SignInHandler from "./SignInHandler";

function Login({setIsLogin}){
    let [isRegistered,setIsRegistered]=useState(true);
    return (
        <div className="w-full h-full">
            {
                isRegistered?
                (<LoginHandler isRegistered={isRegistered} setIsRegistered={setIsRegistered} setIsLogin={setIsLogin} />)
                :
                (<SignInHandler isRegistered={isRegistered} setIsRegistered={setIsRegistered} setIsLogin={setIsLogin} />)
            }

        </div>
    )
}
export default Login;