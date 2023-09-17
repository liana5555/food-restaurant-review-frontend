import React from "react";
import axios from "axios";


export default function ManageSingleUser(props) {
    const [showDeatil, setShowDetail] = React.useState(false)
    const [showEdit, setShowEdit] = React.useState(false)
     const [editForm, setRegisterForm] = React.useState({
        username: props?.user?.username,
        firstName: props?.user?.first_name,
        lastName:props?.user?.last_name,
        email: props?.user?.email,
        type: props?.user?.type
        
    })

    const [error, setError] = React.useState(null)


    function handleDShowDetail () {
        setShowDetail(prev => !prev)
    }
    
    function handleShowEdit () {
        
        setShowEdit(prev=> !prev)
    }

    function handleChange (e) {
        setRegisterForm(prev => {
            return {
                ...prev, 
                [e.target.name] : e.target.type ==="checkbox" ? e.target.checked : e.target.value
            }
        })

    }

    async function handleSendUpdateUser (e) {
        e.preventDefault() 
        try {
            const res = await axios.put(`/users/admin/managed_user/${props.user.idusers}`, editForm)
        }
    catch (err) {
        console.log(err)


    } 
    window.location.reload(true);
}  


async function handleSendDeleteUser (e) {
    e.preventDefault() 
    try {
        const res = await axios.delete(`/users/admin/managed_user/${props.user.idusers}`)
    }
catch (err) {
    console.log(err)


} 
window.location.reload(true);
}  

   

console.log(editForm)

    return (
        <div key={props.user.idusers}  className="fetched-user-container">
            <div className="main-detail-holder">
                <div className="username">{props.user.username}</div>
                <div className="email">{props.user.email}</div>
                <div className="button-container">
                    <span className="button" onClick={handleDShowDetail}>Detail</span>
                    <span className="button" onClick={handleShowEdit}>Edit</span>
                    <span className="button" onClick={handleSendDeleteUser}>Delete</span>

                </div>
            </div>
                {
                    showDeatil && <div className="detail-container">
                        <div className="user-detail">{props.user.type}</div>
                        <div className="user-detail">{props.user.first_name}</div>
                        <div className="user-detail">{props.user.last_name}</div>
                    </div>
                }
                {
                   showEdit && <form className="login-register-form admin-manage">
                        <label className="input-label" name="username" >Username</label>
                        <input className="input" type="text" name="username" placeholder="username" value={editForm.username} onChange={handleChange}  />
                        <label className="input-label" name="firstName" >First name</label>
                        <input className="input" type="text" name="firstName" placeholder="First Name" value={editForm.firstName} onChange={handleChange}  />
                        <label className="input-label" name="lastName" >Last name</label>
                        <input className="input" type="text" name="lastName" placeholder="Last Name" value={editForm.lastName} onChange={handleChange}  />
                        <label className="input-label" name="email" >E-mail</label>
                        <input className="input" type="email" name="email" placeholder="email" value={editForm.email} onChange={handleChange}  />
                        <fieldset>
                <legend>Current user type</legend>
                <div className="input-label-matcher">
                <input 
                    type="radio"
                    id="admin"
                    name="type"
                    value="admin"
                    checked={editForm.type === "admin"}
                    onChange={handleChange}
                />
                <label htmlFor="admin">Admin</label>
               </div>
               <div className="input-label-matcher">
                <input 
                    type="radio"
                    id="normal user"
                    name="type"
                    value="normal user"
                    checked={editForm.type === "normal user"}
                    onChange={handleChange}
                />
                <label htmlFor="normal user">Normal user</label>
                </div>
                
                <div className="input-label-matcher">
                <input 
                    type="radio"
                    id="restaurant worker"
                    name="type"
                    value="restaurant worker"
                    checked={editForm.type === "restaurant worker"}
                    onChange={handleChange}
                />
                <label htmlFor="restaurant worker">Restaurant worker</label>
                </div>
                
            </fieldset>
                    <button onClick={handleSendUpdateUser}>Submit changes to this user</button>
           
                    </form>
                }

                
                


            </div>
    )
}