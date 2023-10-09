import React, { useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";


export default function ConversationChat (props) {

    const {currentUser, logout} = useContext(AuthContext)

    //Based on the chatpartner fetch the messages of the 
    //actual partner in the moment. 


    const fake_messages = [
        {
        idmessage: 1,
        message_text: "Hey, hoq is it going? How was the restaurant you last visited? ",
        sent_datetime: "2023-10-01 20:50:00",
        from_id: 5,
        from_img: "user-icon.svg",
        from_name: "test",
        conversation_id: 1
        },
        {
            idmessage: 2,
            message_text: "Hi, it was really nice. I ate some sushi I really like it and I recommend you to try it. ",
            sent_datetime: "2023-10-01 20:51:00",
            from_id: 1,
            from_name: "test",
            from_img: "user-icon.svg",
            conversation_id: 1
            },
            {
                idmessage: 3,
                message_text: "Hey, hoq is it going? How was the restaurant you last visited? ",
                sent_datetime: "2023-10-01 20:50:00",
                from_id: 5,
                from_name: "test",
                from_img: "user-icon.svg",
                conversation_id: 1
                },
                {
                idmessage: 4,
                message_text: "Hi, it was really nice. I ate some sushi I really like it and I recommend you to try it. ",
                sent_datetime: "2023-10-01 20:51:00",
                from_id: 1,
                from_name: "test",
                from_img: "user-icon.svg",
                conversation_id: 1
                },
                {
                idmessage: 5,
                message_text: "Hey, hoq is it going? How was the restaurant you last visited? ",
                sent_datetime: "2023-10-01 20:50:00",
                from_id: 5,
                from_name: "test",
                from_img: "user-icon.svg",
                conversation_id: 1
                },
                {
                idmessage: 6,
                message_text: "Hi, it was really nice. I ate some sushi I really like it and I recommend you to try it. ",
                sent_datetime: "2023-10-01 20:51:00",
                from_id: 1,
                from_name: "test",
                from_img: "user-icon.svg",
                conversation_id: 1
                },
            
    ]

    const message = fake_messages.map(message => {
        return(
            <div key={message.idmessage} className={message.from_id === currentUser.idusers ? "my-messages" : "received-messages"}>
                <div className="message-container">
                    {currentUser.idusers !== message.from_id && <div className="message-from-img"><img src={`../uploads/profile_pics/${message.from_img}`} title={`${message.from_name}`} alt={`${message.from_name}`}/></div>}
                    <div className="message-text">
                         {message.message_text}
                    </div>
                   
                    </div>
                <div className="message-senddate">Sent: {message.sent_datetime}</div>
            </div>
        )
    })



    return (
        <div className="chat-conversation">
            <div className="convesartion-name">{props.chatPartner.conversation_name}</div>
            <div className="conversation-container">
                {message}
                
            </div>
            <div className="sender-box">
                <input className="chat-textarea" type="textare"/> 
                <button className="chat-send">Send</button>
                
            </div>
            
        
        </div>
    )
}