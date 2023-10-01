import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import dateSimplify from "../functions/date_r.mjs";
import Delete from "../delete-delete.svg"
import More from "../more-icon.svg"


export default function ManageSingleReservation (props) {

    const [showMore, setShowMore] =  React.useState(false)
    const [editForm, setForm] = React.useState({
        status: props?.reservation?.status
  
        
    })

    const {currentUser} = useContext(AuthContext)

    function handleChange (e) {
        setForm(prev => {
            return {
                ...prev, 
                [e.target.name] : e.target.type ==="checkbox" ? e.target.checked : e.target.value
            }
        })

    }

    
    function handleClick () {
        setShowMore(prev => !prev)

    }

    
    async function handleUpdateCancelled () {
        try {
            const res= await axios.put(props.updateRoute, {status: "cancelled"});
            console.log(res.data)
            
            
        }
        catch (err) {
            console.log(err)
        }
    
    }


    async function handleSendUpdateReservationStatus (e) {
        e.preventDefault() 
        try {
            const res = await axios.put(props.updateRoute, editForm)
        }
    catch (err) {
        console.log(err)


    } 
    window.location.reload(true);
}  


    return (
        <div key={props.reservation.idreservation} className="reservation-handling-container">
            <div  className={props.reservation.status === "pending" ? "reserv-pending" : 
                                                                            props.reservation.status === "accepted" ? "reserv-accepted" :
                                                                                                            "reserv-cancelled" 
        }>
            <div>{dateSimplify(props.reservation.starting_date)}</div>
            <div>{dateSimplify(props.reservation.ending_date)}</div>
            <div>{props.reservation.number_of_people}</div>
            <div>{props.reservation.reserver_name}</div>
            <div>{props.reservation.status}</div>
            {(currentUser.type === "restaurant worker" && currentUser.restaurant_id ===props.reservation.restaurant_id) ? <div className="more-img" onClick={handleClick}><img src={More} alt="More options"/></div> 
            : <div className="more-img" onClick={handleUpdateCancelled}>Cancel</div>}
    
        </div>
        {showMore && <div className="change-reserv-status">
                <form className="form-modified">
                <fieldset className="fieldset-modified">
                <legend>Change the status of this reservation</legend>
                 <div className="input-label-matcher">
                <input 
                    type="radio"
                    id="accepted"
                    name="status"
                    value="accepted"
                    checked={editForm.status === "accepted"}
                    onChange={handleChange}
                />
                <label htmlFor="accepted">Accepted</label>
               </div> 
               <div className="input-label-matcher">
                <input 
                    type="radio"
                    id="pending"
                    name="status"
                    value="pending"
                    checked={editForm.status === "pending"}
                    onChange={handleChange}
                />
                <label htmlFor="pending">Pending</label>
                </div>
                
                <div className="input-label-matcher">
                <input 
                    type="radio"
                    id="cancelled"
                    name="status"
                    value="cancelled"
                    checked={editForm.status === "cancelled"}
                    onChange={handleChange}
                />
                <label htmlFor="cancelled">Cancelled</label>
                </div>
                
            </fieldset>
            <button onClick={handleSendUpdateReservationStatus} className="button-modified">Submit change to this reservation</button>
                </form>
            </div>}
        </div>
    )
}
