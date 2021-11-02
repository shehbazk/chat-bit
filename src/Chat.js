import { Avatar, IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {React, useState, useEffect} from 'react'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import "./Chat.css"
import Search from '@mui/icons-material/Search';
import { useParams } from "react-router-dom";
import db from './Firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';
const Chat = () => {
        const [input, setInput] = useState("")
    const [seed, setSeed] = useState("")
    const{roomId}= useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
  const [{user}, dispatch] = useStateValue();


    useEffect(() => {
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot=>{
                setRoomName(snapshot.data().name);
                db.collection('rooms').doc(roomId).
                collection("messages").orderBy("timestamp", "asc").
                onSnapshot((snapshot)=>
                setMessages(snapshot.docs.map((doc)=>
                doc.data()))
                );
            })
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.random()*5000);
    }, [roomId]);

    const sendMessage=(e)=>{
        e.preventDefault();
        console.log("You typed>>>", input);
        db.collection("rooms").doc(roomId).collection('messages')
        .add({
            message: input,
            name: user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        });

        setInput("");
    }
    function pageScroll() {
        window.scrollBy(0,1);
         var scrolldelay = setTimeout(pageScroll,10);
    }

    return (
        <div className="chat">
            <div className="chat__header">
            <Avatar src={`https://avatars.dicebear.com/api/human/:${seed}.svg`} />
            <div className="chat__headerInfo">
                <h3>{roomName}</h3>
                <p>last seen{" "}
                {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
                </p>
            </div>
                <div className="chat__headerRight">
                <IconButton>
                <Search />
                </IconButton>
                <IconButton>
               <AttachFileIcon />
                </IconButton>
                <IconButton>
                
                <MoreVertIcon />
                </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message=>(
                        <p className={`chat__message ${message.name===user.displayName && "chat__reciever" }`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
            
            </div>
            <div className="chat__footer">
            <InsertEmoticonIcon />
                <form action="submit">
                    <input value={input} onChange={(e)=>
                        setInput(e.target.value)
                    } type="text"placeholder="Type a message" />
                    <button onClick={sendMessage} type="submit">Send message</button>
                </form>
                <MicIcon />
            </div>
            
        </div>
    )
}

export default Chat
