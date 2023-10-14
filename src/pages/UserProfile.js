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

    React.useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await axios.get("/users/reservations")
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
            const res= await axios.delete(`/users/reservations/${reservation_id}`);
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
            const res= await axios.delete(`/users`);
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
            currentUser.img === changeUserDetail.img ) {
                
                setResponseFromServer("You didn't change anything")
               

        }
        else {
                try {
                const res =  await axios.put("/users/", changeUserDetail)
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
  
console.log(responseFromServer)


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
    <ManageSingleReservation reservation={reservation} updateRoute={`/users/reservations/${reservation.idreservation}`} />
    )
})


    return(
        <main className="profile">  
         {responseFromServer  && <ErrorUp content={responseFromServer} statehandling={setResponseFromServer} />    }       
            <div className="user-information-contianer">
                <h1>It is my profile</h1>
                {currentUser && 
                <div className="user-data-container">
                    <span className="profile-pic"><img src={`../uploads/profile_pics/${currentUser.img}`} alt="profile"/></span>
                    <div className="profile-username">Username: <input type="text" className="profile-change" name="username" onChange={handleChange}  value={changeUserDetail.username} /></div>
                    <div className="profile-first-name profile-data"><p>First name: </p><input name="first_name" onChange={handleChange} type="text" value={changeUserDetail.first_name} /></div>
                    <div className="profile-last-name profile-data"><p>Last name: </p><input name="last_name" onChange={handleChange} type="text" value={changeUserDetail.last_name} /></div>
                    <div className="profile-email profile-data"><p>Email: </p><input name="email" onChange={handleChange} type="email" value={changeUserDetail.email} /></div>
                    <button onClick={handleUserDeatilUpdate}>Save changes</button>

                 
                </div>}
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