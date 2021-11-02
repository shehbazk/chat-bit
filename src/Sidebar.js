import React from 'react'
import './Sidebar.css'
// import firebase from "firebase"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, IconButton } from '@mui/material';
import db from './Firebase'
import SidebarChat from './SidebarChat';
import { useState, useEffect } from 'react';
import { useStateValue } from './StateProvider';
const Sidebar = () => {
  const [{user}, dispatch] = useStateValue();

    const [rooms, setRooms] = useState([]);
    useEffect(() => {

      const unsubscribe=  db.collection("rooms").onSnapshot((snapshot)=>
            setRooms(
                snapshot.docs.map((doc)=>({
                    id: doc.id,
                    data : doc.data(),
                }))
            )
        );
        return()=>{
            unsubscribe();
                }
       
    }, [])


    return (
        <div className="sidebar">
            {/* <h1>This is sidebar</h1> */}
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar__headerRight">
                    <IconButton>
                <SettingsIcon />
                </IconButton>
                <IconButton>
                <DonutLargeIcon />
                </IconButton>
                <IconButton>
                
                <MoreVertIcon />
                </IconButton>

                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    
                <SearchIcon />
                <input type="text" placeholder="Search or start a new chat" />

                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {rooms.map(room=>(
                    <SidebarChat key={room.id } id={room.id} 
                    name={room.data.name} />
                 ))}



            </div>

        </div>
    )
}

export default Sidebar
