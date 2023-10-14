import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import dateSimplify from "../functions/date_r.mjs";
import Delete from "../delete-delete.svg"
import More from "../more-icon.svg"
import ManageSingleReservation from "../components/ManageSingleReservation";


export default function ManageReservations () {

    const {currentUser, logout} = useContext(AuthContext)
    const [reservationByRestaurant, setReservationByRestaurant] = React.useState([])
   



    React.useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await axios.get(`/users/restaurant/${currentUser.restaurant_id}/reservations`)
                setReservationByRestaurant(res.data)
                
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])


    const prevreservation = reservationByRestaurant.map((reservation) => {
        return (
/*            <div>
            <div key={reservation.idreservation} className={reservation.status === "pending" ? "reserv-pending" : 
                                                                            reservation.status === "accepted" ? "reserv-accepted" :
                                                                                                            "reserv-cancelled" 
        }>
            <div>{dateSimplify(reservation.starting_date)}</div>
            <div>{dateSimplify(reservation.ending_date)}</div>
            <div>{reservation.number_of_people}</div>
            <div>{reservation.reserver_name}</div>
            <div>{reservation.status}</div>
            <div className="more-img" onClick={handleClick}><img src={More} alt="More options"/></div>
    
        </div>
        {showMore && <div className="change-reserv-status">
                Change reservation status
            </div>}
        </div>  */
        <ManageSingleReservation key={reservation.idreservation} reservation = {reservation}  updateRoute={`/users/restaurant_worker/restaurant/${currentUser.restaurant_id}/managed_reservation/${reservation.idreservation}`}/>
        )
    })
    


    return (
        <main className="profile">
            <h1>MANAGE RESERVATIONS</h1>
            <div className="previous-reservations-cotnainer">
                <div className="prev-reserv-header">
                    <div>Starting date</div>
                    <div>Ending date</div>
                    {
                        /*
                        <div>Num</div>
                        <div>Reserver</div>
                        <div>Status</div>
                        
                        */
                    }
                    
                    

                </div>

                {currentUser && currentUser.type === "restaurant worker" && prevreservation}
            </div>
        </main>
    ) 
}