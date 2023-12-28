import React, { useState } from 'react'
import "./Join.css";
import OIG  from "../../image/OIG.jpg"
import {Link} from 'react-router-dom';


let user;
const sendUser=()=>{
    user= document.getElementById('joinInput').value;
    document.getElementById('joinInput').value="";
  }

// login container
const Join = () => {

   const [name, setname] = useState("")
  
   const handleLogin = (e) => {
    if (name==="") {
      e.preventDefault();
    } else{
      sendUser();
    }
  };


  return (
    <div className='JoinPage'>
      <div className='JoinContainer'>
        <img src={OIG} alt='logo'></img>
        <h1>Let's Chat</h1>
        <input onChange={(e)=>setname(e.target.value)} placeholder='Enter your name' type="text" id='joinInput'/>
        <Link to="/chat">
          <button onClick={(e) => handleLogin(e)} className="joinbtn">
            Join us
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Join
export {user}
