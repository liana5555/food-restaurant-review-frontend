import React from "react";
import ConversationList from "./ConversationList";
import ConversationChat from "./ConversationChat";

export default function ChatContainer () {

    const [chatPartner, setChatPartner] = React.useState({
        conversation_name: "nobody",
        conversation_id: null
    }) //sort of conversation name

    function handleConversationClick (id, name) {
        setChatPartner(prev => {
            return(
                {
                    ...prev, 
                    conversation_name: name,
                    conversation_id: id
                }
            )
        })
    }

    console.log(chatPartner)

    return (
        <div className="chat-container">
            <ConversationList handleConversationClick = {handleConversationClick}  />
            {chatPartner.conversation_id == null ? 
                <div>Choose a chat partner from your already existing conversations or create a new conversation.</div> :
                <ConversationChat chatPartner={chatPartner}  />
            }
            

        </div>
    )

}