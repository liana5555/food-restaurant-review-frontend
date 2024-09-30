import React from "react";

import axios from "axios";
import AddingConversation from "./AddingConversation";

export default function ConversationList(props) {
  const [showAddConversationState, setShowAddConversationState] =
    React.useState(false);
  const [contacts, setContact] = React.useState([]);

  // I will need to fetch every single conversation that the
  //current user in. They will be the contacts
  //Adding a new conversation means starting
  //a new conversation with one person or multiple people

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_ROUTE}/chat/conversation`
        );
        setContact(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [showAddConversationState]);

  function handleShowAddConversationState() {
    setShowAddConversationState((prev) => true);
  }

  function handleCloseShowAddConversationState() {
    setShowAddConversationState(false);
  }

  const designingContacts = contacts.map((contact) => {
    return (
      <div
        key={contact.conversation_id}
        className="contact"
        onClick={() =>
          props.handleConversationClick(
            contact.conversation_id,
            contact.conversation_name
          )
        }
      >
        <img src={`../uploads/conversation_pic/${contact.img}`}></img>
        <div className="chat-contact-name">{contact.conversation_name}</div>
      </div>
    );
  });

  return (
    <div className="conversation-list-container">
      <div
        className="chat-adding-conversation"
        onClick={handleShowAddConversationState}
      >
        <button className="add-contact">+</button>
        <span className="add-contact-text">Add a new conversation</span>
      </div>
      {showAddConversationState && (
        <AddingConversation handleClose={handleCloseShowAddConversationState} />
      )}
      <div className="listing-contacts">{designingContacts}</div>
    </div>
  );
}
