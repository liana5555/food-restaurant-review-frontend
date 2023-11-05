import React, { useContext } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Calendar from "../components/Calendar";
import dateSimplify from "../functions/date_r.mjs";

import { AuthContext } from "../context/authContext";
import MakeReservation from "./MakeReservation";
import Edit from "../edit-246.svg"
import getText from "../functions/getText.mjs";


export default function SingleRestaurant() {

    const [reservationsFetch, setReservationsFetch] = React.useState([])
    const [restaurantData, setRestaurantData] = React.useState([])
    const {currentUser} = useContext(AuthContext)
    const [resturantOpeningClosing, setRestaurantOpeningClosing] = React.useState({
                                                                                    opening_time: " ",
                                                                                    closing_time: " "

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
    }, [RestaurantId, currentUser])

console.log(restaurantData)
console.log(reservationsFetch)

const restaurant = restaurantData.map((rest) => {
    return (
        <div key={rest.idrestaurants} className="single-restaurant-container">
            <div className="restaurant-name-holder"><h1>{rest.restaurant_name}</h1>{currentUser !== null && currentUser.type ==="restaurant worker" && currentUser.restaurant_id == RestaurantId &&<Link to={`/restaurantdata?edit=${RestaurantId}`} state={restaurantData}><img src={Edit} /></Link>}</div>
            <div className="address-container">
                <div className="city">{rest.city}</div>
                <div className="address">{rest.adress}</div>
            </div>
            <div className="description" dangerouslySetInnerHTML={{ __html: rest.description }}></div>
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
    console.log(resturantOpeningClosing.opening_time)
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

           {(resturantOpeningClosing.opening_time != null && resturantOpeningClosing.closing_time != null)
           
           && <MakeReservation openingTime = {resturantOpeningClosing.opening_time} closingTime={resturantOpeningClosing.closing_time} /> }





        </main>
    )
}