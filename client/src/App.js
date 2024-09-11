import Header from "./components/Header";
import Home from "./components/Home";
import {Routes,Route} from "react-router-dom"
import MyPost from "./components/MyPost";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import { useState } from "react";
import EditPost from "./components/EditPost";

function App(){
  let [isLogin,setIsLogin]=useState(false);
  return (
    <div className="max-w-[1140px] h-screen mx-auto max-md:w-screen">
      <Header isLogin={isLogin} setIsLogin={setIsLogin}/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/my_post" element={<MyPost></MyPost>}></Route>
        <Route path="/create_post" element={<CreatePost />}></Route>
        <Route path="/login" element={<Login setIsLogin={setIsLogin}/>}></Route>
        <Route path="/edit_post" element={<EditPost/>}></Route>
      </Routes>
    </div>
  )
}


export default App;