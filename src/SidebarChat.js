import { Avatar } from '@mui/material'
import React from 'react'
import { useState, useEffect } from "react";
import "./SidebarChat.css";
import db from './Firebase';
import { Link } from 'react-router-dom';

const SidebarChat = ({id, name , addNewChat}) => {
    const [seed, setSeed] = useState("")
    const [messages, setMessages] = useState("")

    useEffect(() => {
       if(id){
           db.collection("rooms").doc(id)
           .collection("messages")
           .orderBy("timestamp", "desc").
           onSnapshot((snapshot)=>
           setMessages(snapshot.docs.map((doc)=>
           doc.data()))
           );
       }
    }, [id])


    useEffect(() => {
        setSeed(Math.random()*5000);
    }, []);
    const createNewChat=()=>{
        const roomName=prompt("Please enter name for chat room"); 
        if(roomName){
            db.collection('rooms').add({
            name:roomName,
            }
            );
        }
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/:${seed}.svg`} />
            <div className="sidebarChat__info">
                <h1>{name}</h1>
                <p>
                    {messages[0]?.message}
                </p>
            </div>
        </div>
        </Link>
        
    ):(
        <div onClick={createNewChat} className="sidebarChat">
            <h1>Add a new chat</h1>
        </div>
    )
}

export default SidebarChat
