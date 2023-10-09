import React from "react";

import axios from "axios";
import AddingConversation from "./AddingConversation";



export default function ConversationList (props) {

    const [showAddConversationState, setShowAddConversationState] = React.useState(false)

    // I will need to fetch every single conversation that the 
    //current user in. They will be the contacts
    //Adding a new conversation means starting
    //a new conversation with one person or multiple people


    const contacts = [
        {
            idusers: 2,
            username: "liana55",
            img: "user-icon.svg",
            conversation_id: 1,
            conversation_name: "liana55"

        },
        {
            idusers: 6,
            username: "animeaddict",
            img: "user-icon.svg",
            conversation_id: 2,
            conversation_name: "animeaddict"

        }
    
    ]
    
    function handleShowAddConversationState() {
        setShowAddConversationState(prev => true)
    }

    function handleCloseShowAddConversationState() {
         setShowAddConversationState(false)
    }

    const designingContacts = contacts.map(contact => {
        return (
            <div key={contact.conversation_id} className="contact" onClick={() => props.handleConversationClick(contact.conversation_id, contact.conversation_name)}>
                <img src={`../uploads/profile_pics/${contact.img}`}></img>
                <div className="chat-contact-name">{contact.username}</div>
            </div>
        )
    })


    return (
        <div className="conversation-list-container">
            <div className="chat-adding-conversation" onClick={handleShowAddConversationState}>
                <button className="add-contact">+</button>
                <span className="add-contact-text">Add a new conversation</span>
            </div>
            {showAddConversationState && <AddingConversation handleClose={handleCloseShowAddConversationState} />}
            <div className="listing-contacts">
                {designingContacts}
                
            </div>

        </div>
    )
}