import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import dateSimplify from "../functions/date_r.mjs";
import Delete from "../delete-delete.svg"
import ManageSingleReservation from "../components/ManageSingleReservation";
import ErrorUp from "../components/ErrorUp";
import {Link, useNavigate} from "react-router-dom"
//import handleClosingError from "../functions/handleClosingError.mjs";




export default function UserProfile () {

//Fetching is not neccessary since I have the same info in currentUser if I
//import AuthContext
    const navigate = useNavigate()
    const [ responseFromServer, setResponseFromServer] = React.useState(null)  
    const [userReservations, setUserReservations] = React.useState([])
    const {currentUser, logout, setCurrentUser} = useContext(AuthContext)
    const [changeUserDetail, setNewUserDetail] = React.useState({
        username: currentUser?.username ,
        first_name: currentUser?.first_name ,
        last_name: currentUser?.last_name ,
        email: currentUser?.email,
        img: currentUser?.img

    })
    const [file, setFile] = React.useState("")

    const [showPasswordChange , setShowPasswordChange] = React.useState(false)

    const [error, setError] = React.useState("")

    const [pswchange, setPswChange] = React.useState({
        oldpassword: "",
        password: "",
        repassword:""
    })

    React.useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_ROUTE}/users/reservations`)
                setUserReservations(res.data)
                


                
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])


    async function handleDelete (reservation_id) {
        try {
            const res= await axios.delete(`${process.env.REACT_APP_API_ROUTE}/users/reservations/${reservation_id}`);
            console.log(res.data)
            
            
            
        }
        catch (err) {
            console.log(err)
        }
    
    }

    //I need an onclick event for deleting the profile. =)
    //With the user I want to delete the posts and comments by the user as well. 


    async function handleDeleteUser () {
        try {
            const res= await axios.delete(`${process.env.REACT_APP_API_ROUTE}/users`);
            console.log(res.data)
            setResponseFromServer(res.data)
            logout(currentUser)
            navigate("/")


            
        }
        catch (err) {
            console.log(err)
        }
    
    }

   
    function handleChange (e) {
        setNewUserDetail(prev => {
            return {
                ...prev, 
                [e.target.name] : e.target.value
            }
        })

    }


   async function handleUserDeatilUpdate (e) {
    e.preventDefault()

        if(currentUser.username === changeUserDetail.username && 
            currentUser.first_name === changeUserDetail.first_name &&
            currentUser.last_name === changeUserDetail.last_name &&
            currentUser.email === changeUserDetail.email &&
            currentUser.img === file.name ) {
                
                setResponseFromServer("You didn't change anything")
               

        }
        else {

                  
                let imgUrl

                if (currentUser && (file !== currentUser?.img)) {
                    imgUrl = await upload()
                }
                
       

                try {
                const res =  await axios.put(`${process.env.REACT_APP_API_ROUTE}/users/`, {...changeUserDetail, img: file? (imgUrl? imgUrl :file) : currentUser?.img })
                setResponseFromServer(res.data)
                setCurrentUser(changeUserDetail)
                
                console.log(res.data)
                
                }
                catch (err) {
                    console.log(err)
                }
        }
}

/*

function handleCloseing () {
    setResponseFromServer(null)

}
        
*/

function handleShowPasswordChange () {
    setShowPasswordChange(prev => !prev)
}

function checkingPaassword (psw, repsw) {
    if (psw !== repsw){
        return true
    }
    else return false       
}

function handlePasswordChange(e) {
    e.preventDefault()

    setPswChange(prev => ({
        ...prev, 
        [e.target.name] : e.target.value
    }))

}

async function handleSubmitPswChange (e) {
    e.preventDefault()

    try {
        const res= await axios.put(`${process.env.REACT_APP_API_ROUTE}/users/psw/`, pswchange)
        setResponseFromServer(res.data)

    }
    catch(err) {
        setResponseFromServer(err.respose.data)

    }

}
  
console.log(responseFromServer)

console.log(file)
//console.log(currentUser.img)


const prevreservation = userReservations.map((reservation) => {
    return (/*
        <div key={reservation.idreservation} className={reservation.status === "pending" ? "reserv-pending" : 
                                                                        reservation.status === "accepted" ? "reserv-accepted" :
                                                                                                        "reserv-cancelled" 
    }>
        <div>{dateSimplify(reservation.starting_date)}</div>
        <div>{dateSimplify(reservation.ending_date)}</div>
        <div>{reservation.number_of_people}</div>
        <div>{reservation.reserver_name}</div>
        <div>{reservation.status}</div>
        <div className="delete-img" onClick={() => handleDelete(reservation.idreservation)}><img src={Delete} alt="Delete reservation"/></div>

    </div>*/
    <ManageSingleReservation key={reservation.idreservation} reservation={reservation} updateRoute={`${process.env.REACT_APP_API_ROUTE}/users/reservations/${reservation.idreservation}`} />
    )
})

async function upload() {
    try{
        const formData = new FormData();
        formData.append("file", file)
        const res = await axios.post(`${process.env.REACT_APP_API_ROUTE}/uploads?type=profile`, formData)
        return res.data
    }   
    catch (err) {
        console.log(err)
    }
}




    return(
        <main className="profile">  
         {responseFromServer  && <ErrorUp content={responseFromServer} statehandling={setResponseFromServer} />    }       
            <div className="user-information-contianer">
                <h1>It is my profile</h1>
                {currentUser && 
                <div className="user-data-container">
                    <span className="profile-pic">
                        <img src={`../uploads/profile_pics/${currentUser.img}`} alt="profile"/>
                        <div className="on-picture">                           
                        </div>
                        <p className="on-pic-text">
                            {/*Make a pop up like window put the image uploading inside and a cancel button and a save changes button*/}
                        <input id="img" type="file" name="img" style={{display: "none"}} onChange={e=>setFile(e.target.files[0])}/>
                        <label htmlFor="img" className="img-upload">Change</label>
                        
                        </p>
                    </span>
                    <div className="profile-username"><label htmlFor="username">Username: </label><input id="username" type="text" className="profile-change" name="username" onChange={handleChange}  value={changeUserDetail.username} /></div>
                    <div className="profile-first-name profile-data"><label htmlFor="first_name">First name: </label><input id="first_name" name="first_name" onChange={handleChange} type="text" value={changeUserDetail.first_name} /></div>
                    <div className="profile-last-name profile-data"><label htmlFor="last_name">Last name: </label><input id="last_name" name="last_name" onChange={handleChange} type="text" value={changeUserDetail.last_name} /></div>
                    <div className="profile-email profile-data"><label htmlFor="email">Email: </label><input id="email" name="email" onChange={handleChange} type="email" value={changeUserDetail.email} /></div>

                    <button className="profile-button" onClick={handleUserDeatilUpdate}>Save changes</button>

                    
                </div>}
                <div>
                    <h2>Password change</h2>
                    <div>In order to change your password click the switch</div>
                        <label className="switch">
                        <input type="checkbox" onChange={handleShowPasswordChange} checked={showPasswordChange}/>
                        <span className="slider round"></span>
                        </label>

                        {
                            showPasswordChange &&
                            <div>
                                <label className="input-label" name="oldpassword" >Old Password</label>
                                <input className={error && pswchange.oldpassword == "" ? "input-error" : "input"} type="password" name="oldpassword" placeholder="password" value={pswchange.oldpassword} onChange={handlePasswordChange}  />
          
                                <label className="input-label" name="password" >Password</label>
                                <input className={error && pswchange.password == "" ? "input-error" : "input"} type="password" name="password" placeholder="password" value={pswchange.password} onChange={handlePasswordChange}  />
                                
                                <label className="input-label" name="repassword" >Re-Password</label>
                                <input className={error && pswchange.repassword == "" ? "input-error" : "input"} type="password" name="repassword" placeholder="password" value={pswchange.repassword} onChange={handlePasswordChange}  />
                                {checkingPaassword(pswchange.password, pswchange.repassword)&&<div className="not-matching-psw">Not matching Password</div>}
       
                            <button onClick={handleSubmitPswChange}>Change Password</button>
                        </div>
                        }
                </div>
                    <h2>All made reservations</h2>
                    <div className="previous-reservations-cotnainer">
                <div className="prev-reserv-header">
                    <div>Starting date</div>
                    <div>Ending date</div>
                    {/*
                     <div>Num</div>
                    <div>Reserver</div>
                    <div>Status</div>
                    */}
                   
                    

                </div>

                {currentUser && prevreservation}
            </div>
            </div>

            <div className="user-account-delete">
                <h1 id="delete-account">You can delete your profile here</h1>
                <div className="delete-profile-information-container">
                    <p className="delete-description">If you want to delete your account you can do it by clicking on the icon below. In case of deletion all your infromation including your posts and comments will be removed and permanently deleted from the database. </p>
                    <div className="delete-button" onClick={handleDeleteUser}><img src={Delete} alt="Delete your profile with this icon" /></div>
                </div>
            </div>
            

           
        </main> 
    )
}