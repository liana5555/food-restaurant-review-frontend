import React from "react";
import Month from "./Month";
import Days from "./Days"


export default function Calendar(props) {

    const [actualDateFull, setActualDateFull] = React.useState({})
    const [showDateFull, setShowDateFull] = React.useState({})
    const [showDateReservation, setShowReservation] = React.useState(false)

  
  
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
    [])
  
  
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
  

 


    return (
        <div className="calendar">
        <Month actualDateFull={actualDateFull} shownDateFull={showDateFull} handleForward={handleForwardClick} handleBackward = {handleBackwardClick} handleDateClick = {handleDateClick} show={showDateReservation}  />
        {showDateReservation && <Days shownDateFull={showDateFull} openingTime={props.openingTime} closingTime={props.closingTime} />}
      </div>
    )
}