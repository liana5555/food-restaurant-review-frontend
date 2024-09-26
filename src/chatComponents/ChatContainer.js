import React, { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import moment from "moment";
import axios from "axios";
import dateSimplify from "../functions/date_r.mjs";
import { io } from "socket.io-client";
import ConversationList from "./ConversationList";
import ConversationChat from "./ConversationChat";

export default function ChatContainer() {
  const { currentUser, logout } = useContext(AuthContext);

  const socket = useRef();

  const [chatPartner, setChatPartner] = React.useState({
    conversation_name: "nobody",
    conversation_id: null,
  }); //sort of conversation name

  function handleConversationClick(id, name) {
    setChatPartner((prev) => {
      return {
        ...prev,
        conversation_name: name,
        conversation_id: id,
      };
    });
  }
  console.log(process.env.REACT_APP_SERVER);
  React.useEffect(() => {
    if (currentUser !== null) {
      socket.current = io(process.env.REACT_APP_SERVER); //i might need to write what's in the proxy
      socket.current.emit("addUser", currentUser.idusers); //currentuser.idusers originally
    }
  }, [currentUser]);

  console.log(chatPartner);

  return (
    <div className="chat-container">
      <ConversationList handleConversationClick={handleConversationClick} />
      {chatPartner.conversation_id == null ? (
        <div>
          Choose a chat partner from your already existing conversations or
          create a new conversation.
        </div>
      ) : (
        <ConversationChat chatPartner={chatPartner} socket={socket} />
      )}
    </div>
  );
}
