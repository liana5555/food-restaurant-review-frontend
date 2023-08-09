import React from "react";



export default function Month (props) {

    function decideNumberOfDays (month) {
        switch (month) {
            case 'January' :
                return 31;
            case 'February' :
                return 28;
            case 'March':
                return 31;
            case 'April':
                return 30;
            case 'May':
                return 31;
            case 'June':
                return 30;
            case 'July':
                return 31;
            case 'August':
                return 31;
            case 'September':
                return 30;
            case 'October':
                return 31;
            case 'November':
                return 31;
            case 'December':
                return 31;
                
        }

    }

    function daysOfMonth (actualmonth, actualday, shownmonth, shownday, actualyear, shownyear) {

        const actual_day = actualday
       // console.log(actual_day)

        const return_array = []
        const days = decideNumberOfDays(shownmonth)

        for (let i=1; i<= days; i++) {
            return_array.push(<div key={i} onClick={() => props.handleDateClick(i)} className={
                                                                                    actualyear == shownyear
                                                                                     &&actualmonth == shownmonth
                                                                                      &&i === actual_day ? actual_day === shownday && props.show ? "days-container-actual-clicked" : "days-container-actual" :
                                                                                      
                                                                                      i == shownday && props.show ? "days-container-clicked" :  "days-container"}>
                                    <h1 className="days-number">{i}</h1>
            
                                </div>)
            
        }

        return return_array

    }

    const days = daysOfMonth(props.actualDateFull.month, props.actualDateFull.day, props.shownDateFull.month, props.shownDateFull.day, props.actualDateFull.year, props.shownDateFull.year)

   // console.log(days)

    return (
        <div className="view-container">
            <div className="controller-calendar">
                <span className="arrow-back" onClick={() => props.handleBackward()}>&#60;
               </span>
                <h1>{props.shownDateFull.month} {props.shownDateFull.year}</h1>
                <span className="arrow-forward" onClick={() => props.handleForward()}>
                &#62;
                </span>
            </div>
            <div className="month-view">
            
                {days}
            
            </div>

        </div>
    )
}