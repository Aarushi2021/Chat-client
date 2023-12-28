import React, { useEffect, useState } from 'react'
import {user} from "../Join/Join"
import socketIO from 'socket.io-client'
import './chat.css';
import sendlogo from "../../image/send.png"
import Message from '../Message/Message'
import ReactScrollToBottom from 'react-scroll-to-bottom';
import close from "../../image/close.png";


let socket;

const ENDPOINT="https://chat-server-rho-seven.vercel.app/";


const Chat = () => {

    const [id, setid] = useState("")
  const [messages, setMessages] = useState([])


    const send=()=>{
    const message= document.getElementById('chatInput').value;
        socket.emit('message',{message,id});
        document.getElementById('chatInput').value="";
    }

console.log(messages);
useEffect(() => {

    socket=socketIO(ENDPOINT,{transports:['websocket']});

    socket.on('connect',()=>{
        setid(socket.id);
    })
    console.log(socket)
    socket.emit('joined',{user})

    socket.on(`welcome`,(data)=>{
      setMessages([...messages,data]);
        console.log(data.user,data.message);
    })

    socket.on('userjoined',(data)=>{
      setMessages([...messages,data]);
        console.log(data.user+data.message);
    })

    socket.on('leave',(data)=>{
      setMessages([...messages,data]);
        console.log(data.user,data.message);
    })

  return () => {
socket.disconnect();
 socket.off();
  }
}, [])


useEffect(() => {
 socket.on('sendMessage',(data)=>{
  setMessages([...messages,data]);
    console.log(data.user,data.message,data.id)
 })

  return () => {
   socket.off();  //baar baar render na ho
  }
}, [messages])

//  now item is an object which has user message id

  return (
    <div className='chatPage'>
     <div className='chatContainer'>
       <div className='header'>
        <h2>Let's chat</h2>
     <a href='/'>  <img src={close} alt='close'/> </a> 
        </div>
       <ReactScrollToBottom className='chatBox'>
       {messages.map((item,i)=><Message user={item.id===id?'':item.user} message={item.message} classs={item.id===id?'right':'left'}/>)} 
        </ReactScrollToBottom>
       <div className='inputBox'>
        <input onKeyPress={(event)=>event.key==='Enter'?send():null} type='text' id='chatInput'/>
        <button onClick={send} className='sendBtn'><img src={sendlogo} alt='logo'/></button>
        </div>
     </div>
    </div>
  )
}

export default Chat
