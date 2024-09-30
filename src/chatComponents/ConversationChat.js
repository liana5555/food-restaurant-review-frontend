import React, { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import moment from "moment";
import axios from "axios";
import dateSimplify from "../functions/date_r.mjs";
import { io } from "socket.io-client";

export default function ConversationChat(props) {
  const { currentUser, logout } = useContext(AuthContext);

  const scrollRef = useRef(null);

  const socket = props.socket;

  var date = new Date();

  function joinRoom() {
    if (currentUser && props.chatPartner.conversation_id) {
      socket.current.emit("join_room", props.chatPartner.conversation_id);
    }
  }

  const [dateFetchFrom, setDateFetchFrom] = React.useState(
    moment(date.setDate(date.getDate() - 2)).format("YYYY-MM-DD")
  );
  const [messages, setMessages] = React.useState([]);

  const [sendingMessage, setSendingMessage] = React.useState("");

  //USeeffect for scrolling the messages
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [messages]);

  //Based on the chatpartner fetch the messages of the
  //actual partner in the moment.

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_ROUTE}/chat/conversation/${props.chatPartner.conversation_id}?from=${dateFetchFrom}`
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [dateFetchFrom, props.chatPartner]);

  //################### Socket io ##########################

  React.useEffect(() => {
    if (currentUser !== null) {
      socket.current.emit("join_room", props.chatPartner.conversation_id);
    }
  }, [currentUser, props.chatPartner.conversation_id]);

  // #########################################################
  function handleChangeOfMessage(e) {
    setSendingMessage(e.target.value);
  }

  async function handleSendMessage(e) {
    e.preventDefault();

    if (sendingMessage === "") {
      console.log("You can't send empty string");
      return;
    }
    const messageData = {
      message_text: sendingMessage,
      sent_datetime: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      from_id: currentUser.idusers,
      conversation_id: props.chatPartner.conversation_id,
      from_name: currentUser.username,
      from_img: currentUser.img,
    };

    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API_ROUTE}/chat`,
        messageData
      );
      console.log(result);
      await socket.current.emit("send_message", messageData);
      setMessages((prev) => {
        return [...prev, messageData];
      });
      setSendingMessage("");
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    socket.current.off("receive_message");
    socket.current.on("receive_message", (data_fromBackend) => {
      setMessages((prev) => {
        return [...prev, data_fromBackend];
      });
    });
  }, [socket]);

  const message = messages.map((message) => {
    return (
      <div
        key={
          message.idmessage
            ? message.idmessage
            : message.sent_datetime + Math.floor(Math.random() * 30000)
        }
        className={
          message.from_id === currentUser.idusers
            ? "my-messages"
            : "received-messages"
        }
      >
        <div className="message-container">
          {currentUser.idusers !== message.from_id && (
            <div className="message-from-img">
              <img
                src={`../uploads/profile_pics/${message.from_img}`}
                title={`${message.from_name}`}
                alt={`${message.from_name}`}
              />
            </div>
          )}
          <div className="message-text">{message.message_text}</div>
        </div>
        <div className="message-senddate">
          Sent: {dateSimplify(message.sent_datetime)}
        </div>
      </div>
    );
  });

  return (
    <div className="chat-conversation">
      <div className="convesartion-name">
        {props.chatPartner.conversation_name}
      </div>
      <div className="conversation-container">
        {message}
        <div id={"scrollRef"} ref={scrollRef}></div>
      </div>

      <div className="sender-box">
        <input
          className="chat-textarea"
          type="textare"
          onChange={handleChangeOfMessage}
          value={sendingMessage}
          onKeyDown={(e) => {
            e.key === "Enter" && handleSendMessage(e);
          }}
        />
        <button onClick={handleSendMessage} className="chat-send">
          Send
        </button>
      </div>
    </div>
  );
}
