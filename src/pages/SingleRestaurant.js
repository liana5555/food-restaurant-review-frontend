import React, { useContext } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Calendar from "../components/Calendar";

import { AuthContext } from "../context/authContext";


export default function SingleRestaurant() {

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
        fetchData()
    }, [RestaurantId])

console.log(restaurantData)

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

            <div className="reservation-container">
                <h2>Make a reservation</h2>
                <p className="reservation-description">
                    In order to make a reservation please choose the appropriate date and then the time slot you would
                    like to use. Please keep in mind that your reservation is only valid if the restaurants's workers accept it. Until getting accepted your trial of reservation will stay pending.
                    Please keep in mind pending reservations are not valid. 
                </p>
                <h3>Please choose a date and time</h3>
                {!currentUser && <div className="info">In order to make a reservation you need to log in.</div>}
            
                {currentUser && <Calendar 
                                    openingTime={resturantOpeningClosing.opening_time} 
                                    
                                    closingTime={resturantOpeningClosing.closing_time}
                                     />}
            
            </div>



        </main>
    )
}