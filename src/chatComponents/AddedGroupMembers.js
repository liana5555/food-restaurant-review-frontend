import React from "react";



export default function AddedGroupMembers (props) {

    let members;

    if (props.members.length > 0) {
          members = props.members.map(member => {
            return (
            <div key={"member" + member.idusers} className="member-container" onClick={() => props.handleDelete(member)}>
                <div className="img-holder"><img src={`../uploads/profile_pics/${member.img}`} /></div>
                <div className="names-container">
                    <div className="username-container">{member.username}</div>
                    <div className="name-container">{member.first_name} {member.last_name}</div>
                </div>
                
                
            </div>
        )
    })

    }
  

    return(
        <div className="added-members-holder">
                    
            {members}
        </div>
    )
}