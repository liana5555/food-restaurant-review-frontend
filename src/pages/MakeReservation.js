import React, { useContext } from "react"
import Days from "../components/Days";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";





export default function MakeReservation (props) {

    const [actualDateFull, setActualDateFull] = React.useState({})
    const [showDateFull, setShowDateFull] = React.useState({})
    const [dateReservation, setDateReservation] = React.useState("")
    const {currentUser} = useContext(AuthContext)
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  
    const [reservation, setReservationForm] = React.useState({
        starting_time: "00:00",
        ending_time: "00:00", 
        number_of_people: 0,
        reserver: ""
  
      })

      const location = useLocation()
    const RestaurantId = location.pathname.split("/")[2]

    React.useEffect(()=> {
  
        const date = new Date(Date.now())
  
  
        setActualDateFull(prev => ({
          ...prev, 
          year: date.getFullYear(),
          month: months[date.getMonth()],
          day: date.getDate()
  
        }))
  
        setShowDateFull(prev => ({
          ...prev, 
          year: date.getFullYear(),
          month: months[date.getMonth()],
          day: date.getDate()
  
        }))


      
    },
    [RestaurantId])

    function handleTimeSlotChoosing(starting, ending) {
  
        setReservationForm(prev => ({
          ...prev, 
          starting_time: starting,
          ending_time: ending
        }))
      }

      function handleChangeReservationDate (e) {
     
        setDateReservation(e.target.value)
        setShowDateFull((prev) => ({
            ...prev,
            year: e.target.value.split("-")[0],
            month: e.target.value.split("-")[1],
            day: e.target.value.split("-")[2],

        }))
        

      }

      function handleChange (e) {
        setReservationForm(prev => {
            return {
                ...prev, 
                [e.target.name] : e.target.value
            }
        })
    
    }

    console.log(showDateFull)
    console.log(actualDateFull)

    async function handleSendReservation(e) {
        e.preventDefault() 
      
        //const monthNumber = (months.indexOf(showDateFull.month)+1)

        if (reservation.starting_time === "00:00" || reservation.ending_time === "00:00" || reservation.number_of_people==0 ) {
            //setError()
            console.log("Error you haven't set starting time ending time or the number of people")
            return
        }

        if (showDateFull.year < actualDateFull.year) {
            //setError()
            console.log("Error you set a date before today.")
            return
        }
        else {
                if  (showDateFull.month < actualDateFull.month) {
                    //setError()
                    console.log("Error you set a date before today.")
                    return
            }
            else {
                if (showDateFull.day < actualDateFull.day) {
                    //setError()
                    console.log("Error you set a date before today.")
                    return
                }
            }
        }
      
    
        const regform = {
          //starting_date : showDateFull.year + "-" + (monthNumber < 10 ? ("0" + monthNumber.toString() ) : monthNumber.toString())+ "-"+ showDateFull.day +" " + reservation.starting_time,
          //ending_date : showDateFull.year + "-" +( monthNumber < 10 ? ("0" + monthNumber.toString() ) : monthNumber.toString() )+"-"+ showDateFull.day +" " + reservation.ending_time ,
          starting_date: dateReservation + " " + reservation.starting_time,
          ending_date: dateReservation + " " + reservation.ending_time,
          number_of_people : reservation.number_of_people,
          reserver_name: reservation.reserver
      
      }
        console.log(regform)
      
        try {
            const res = await axios.post(`/restaurants/${RestaurantId}/reservation`,regform )

            //setError

            
        }
        catch (err) {
          console.log(err)
          //setError
      
      
      } 

      
      
      }  
  
    return(
        <div className="reservation-container">
                <h2>Make a reservation</h2>
                {currentUser ? <div>
                <p className="reservation-description">
                    In order to make a reservation please choose the appropriate date and then the time slot you would
                    like to use. Please keep in mind that your reservation is only valid if the restaurants's workers accept it. Until getting accepted your trial of reservation will stay pending.
                    Please keep in mind pending reservations are not valid. 
                </p>
                <h3>Please choose a date and time</h3>
                {!currentUser && <div className="info">In order to make a reservation you need to log in.</div>}
            
                { props.openingTime && props.closingTime &&<div className="">
                    <input type="date" name="full-date"  min={actualDateFull.year + "-" + actualDateFull.month + "-" + actualDateFull.day} value={dateReservation} onChange={handleChangeReservationDate} />
                    <Days
                           shownDateFull={showDateFull}
                           openingTime={props.openingTime}
                            closingTime={props.closingTime}
                            handleTimeSlotChoosing={handleTimeSlotChoosing} />

        <h3>If you want to choose a more specific time. Please write down the starting time and possible ending of your reservation.</h3>
          <form>
            <label className="input-label" name="starting_time" >Starting Time:</label>
            <input type="time" name="starting_time" placeholder="starting time: hh:mm" value={reservation.starting_time} onChange={handleChange}  />
            <label className="input-label" name="ending_time" >Ending Time:</label>
            <input  type="time" name="ending_time" min={reservation.starting_time} placeholder="Ending time: hh:mm" value={reservation.ending_time} onChange={handleChange}  />
            <h3>Please add the number of people and the name the reservation would go with.</h3>
            <label className="input-label" name="number_of_people" >Number of people:</label>
            <input type="number" min='1' name="number_of_people" placeholder="1" value={reservation.number_of_people} onChange={handleChange}  />
            <label className="input-label" name="reserver" >The name of the reserver:</label>
            <input  type="text" name="reserver" placeholder="Someone Someone" value={reservation.reserver} onChange={handleChange}  />
        
            <button onClick={handleSendReservation}>Submit</button>
          </form>                          
                            
                            </div>}
                </div> :
                <div className="info warning">In order to make a reservation you need to log in.</div>
             
                }
            
            </div> 

    )
}