
import ChatContainer from "../chatComponents/ChatContainer";
import { AuthContext } from "../context/authContext";
import React, { useContext } from "react"






export default function Chat () {

    const {currentUser, logout} = useContext(AuthContext)
    return (
        <main className="profile">

           {currentUser ? <ChatContainer /> : <div>For using the chat you need to log in.</div>}

           
        </main>
    )
}