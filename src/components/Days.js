import React from "react";

export default function Days (props) {

    console.log(props?.openingTime)
    const opening_split = props.openingTime.split(":")
    const closing_split = props.closingTime.split(":")
    console.log(parseInt(opening_split[0]))
    console.log(parseInt(closing_split[0]))

    function rendering_divs_for_hour_blocks (opening, closing) {

        let return_array = []
        for (let i=opening; i<closing; i=i+2) {
            
            let starting = i > 9 ?i.toString() + ":00:00" : "0" + i.toString() + ":00:00"
            let ending = i+1 > 9 ? (i+2-1).toString() + ":59:59" : "0" + (i+2-1).toString() + ":59:59" 
            return_array.push(
            <div className="hours-single" key={i} onClick={() => props.handleTimeSlotChoosing(starting, ending)}>
                {starting + " - " + ending}
            </div>)

        }
        console.log(return_array)
        return return_array
    }

    

    const rendered_opening_closing = rendering_divs_for_hour_blocks(parseInt(opening_split[0]),parseInt(closing_split[0]))

    return (
        <div className="days-container">
            <h3>Choose the time slot you would like</h3>
            <p>{props.shownDateFull.year}.{props.shownDateFull.month}.{props.shownDateFull.day}</p>
            <p>Opening hours: {props.openingTime}</p>
            <p>Closing hours: {props.closingTime}</p>
            <div className="hours-container">
                
                {rendered_opening_closing}
            </div>

            
            
        </div>
    )
}