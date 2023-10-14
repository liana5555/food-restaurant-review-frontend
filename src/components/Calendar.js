import React from "react";
import Month from "./Month";
import Days from "./Days";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";


export default function Calendar(props) {

    const [actualDateFull, setActualDateFull] = React.useState({})
    const [showDateFull, setShowDateFull] = React.useState({})
    const [showDateReservation, setShowReservation] = React.useState(false)


  // !!!!!!!!!!!!!!State for making a reservation !!!!!!!!!!!!!!!!!!!!!!! --move this to days
    const [reservation, setReservationForm] = React.useState({
      starting_time: "00:00",
      ending_time: "00:00", 
      number_of_people: 0,
      reserver: ""

    })

    const location = useLocation()
    const RestaurantId = location.pathname.split("/")[2]

  
  
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  
  
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
  
  
    function handleForwardClick ()  {
      setShowDateFull(prev => {
        if (prev.month === 'December') {
          return (
            {
              ...prev,
              year : prev.year +1,
              month: months[months.indexOf('January')]
              
            }
          )
        }
        else {
          return(
            {
              ...prev, 
              month: months[months.indexOf(prev.month)+1]
            }
          )
        }
      })
    }
  
    function handleBackwardClick ()  {
      setShowDateFull(prev => {
        if (prev.month === 'January') {
          return (
            {
              ...prev,
              year : prev.year -1,
              month: months[months.indexOf('December')]
              
            }
          )
        }
        else {
          return(
            {
              ...prev, 
              month: months[months.indexOf(prev.month)-1]
            }
          )
        }
      })
  }
  
  function handleDateClick (clickedday) {
    setShowDateFull(prev => {
      return ( {
        ...prev,
        day : clickedday
  
      })
     
  
    })
  
    setShowReservation(prev => true)
  }

  function handleTimeSlotChoosing(starting, ending) {
  
    setReservationForm(prev => ({
      ...prev, 
      starting_time: starting,
      ending_time: ending
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

async function handleSendReservation(e) {
  e.preventDefault() 

  const monthNumber = (months.indexOf(showDateFull.month)+1)

  const regform = {
    starting_date : showDateFull.year + "-" + (monthNumber < 10 ? ("0" + monthNumber.toString() ) : monthNumber.toString())+ "-"+ showDateFull.day +" " + reservation.starting_time,
    ending_date : showDateFull.year + "-" +( monthNumber < 10 ? ("0" + monthNumber.toString() ) : monthNumber.toString() )+"-"+ showDateFull.day +" " + reservation.ending_time ,
    number_of_people : reservation.number_of_people,
    reserver_name: reservation.reserver

}
  console.log(regform)

  try {
      await axios.post(`/restaurants/${RestaurantId}/reservation`,regform )
  }
  catch (err) {
    console.log(err)


} 

}  


console.log(reservation)
 


    return (
        <div className="calendar">
        <Month actualDateFull={actualDateFull} shownDateFull={showDateFull} handleForward={handleForwardClick} handleBackward = {handleBackwardClick} handleDateClick = {handleDateClick} show={showDateReservation}  />
        {showDateReservation && <div className=""><Days
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
     
      </div>
    )
}