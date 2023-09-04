import React, { useContext } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Calendar from "../components/Calendar";
import dateSimplify from "../functions/date_r.mjs";

import { AuthContext } from "../context/authContext";


export default function SingleRestaurant() {

    const [reservationsFetch, setReservationsFetch] = React.useState([])
    const [restaurantData, setRestaurantData] = React.useState([])
    const {currentUser} = useContext(AuthContext)
    const [resturantOpeningClosing, setRestaurantOpeningClosing] = React.useState({
                                                                                    opening_time: "",
                                                                                    closing_time: ""

                                                                                        })

    const location = useLocation()

    const RestaurantId = location.pathname.split("/")[2]
    console.log(RestaurantId)

    React.useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await axios.get(`/restaurants/${RestaurantId}`)
                setRestaurantData(res.data)
                setRestaurantOpeningClosing(prev => ({
                    ...prev, 
                    opening_time: res.data[0].opening_time,
                    closing_time: res.data[0].closing_time
                }))
            }
            catch (err) {
                console.log(err)
            }
        }

        const fetchReservation = async() => {
            try {
                const res = await axios.get(`/restaurants/${RestaurantId}/reservation`)
                setReservationsFetch(res.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        if (currentUser) fetchReservation()
  
        fetchData()
    }, [RestaurantId])

console.log(restaurantData)
console.log(reservationsFetch)

const restaurant = restaurantData.map((rest) => {
    return (
        <div key={rest.idrestaurants} className="single-restaurant-container">
            <h1>{rest.restaurant_name}</h1>
            <div className="address-container">
                <div className="city">{rest.city}</div>
                <div className="address">{rest.adress}</div>
            </div>
            <div className="description">{rest.description}</div>
        </div>

    )
})

const prevreservation = reservationsFetch.map((reservation) => {
    return (
        <div key={reservation.idreservation} className={reservation.status === "pending" ? "reserv-pending" :
                                                                        reservation.status === "accepted" ? "reserv-accepted" :
                                                                                                        "reserv-cancelled"
    }>
        <div>{dateSimplify(reservation.starting_date)}</div>
        <div>{dateSimplify(reservation.ending_date)}</div>
        <div>{reservation.number_of_people}</div>
        <div>{reservation.reserver_name}</div>
        <div>{reservation.status}</div>

    </div>
    )
})
    //Make Calendar only show when the user is logged in. And put some text on top of it. --tick
    //Like Make reservation --tick
    //For making reservation click on the month and day you'd like to make your reservation on. --tick
    //Then click on the hours and fill out all the other neccessary iformation. --make all the information and sending inside the calendar component
    //Then click on the send button
    //Keep in mind that this is not a valid reservation yet. The restaurant's wokers need to 
    //accept your reservation. 
    //If it is accepted it will be in green colour.
    //It it is cancelled it will be in red colour. 
    //While it is pending it will be yellow. 
    return (
        <main className="food-restaurants">
            {restaurant}
            { currentUser && <div>
            <h2>Previously made reservations at this restaurant</h2>
            <div className="previous-reservations-cotnainer">
                <div className="prev-reserv-header">
                    <div>Starting date</div>
                    <div>Ending date</div>
                    <div>No. people</div>
                    <div>Reserver</div>
                    <div>Status</div>

                </div>


                {prevreservation}
            </div>
            </div> }

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
            
                 <Calendar 
                                    openingTime={resturantOpeningClosing.opening_time} 
                                    
                                    closingTime={resturantOpeningClosing.closing_time}
                                     />
                </div> :
                <div className="info warning">In order to make a reservation you need to log in.</div>
             
                }
            
            </div>



        </main>
    )
}