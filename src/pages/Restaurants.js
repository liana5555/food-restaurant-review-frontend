import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Restaurants () {

    const [fetchedRestaurants, setRestaurants] = React.useState([])

    React.useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await axios.get("/restaurants")
                setRestaurants(res.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    console.log(fetchedRestaurants)

    const restaurants = fetchedRestaurants.map((restaurant) => {
        return (
            <Link key={restaurant.idrestaurants} to={`/restaurants/${restaurant.idrestaurants}`}>
            <div key={restaurant.idrestaurants} id={restaurant.idrestaurants} className="single-rw-container">
                <div className="single-rw-name single-rw">{restaurant.restaurant_name}</div>
                <div className="single-rw-city single-rw">{restaurant.city? `${restaurant.city}` : "Not available" }</div>
                <div className="single-rw-address single-rw">{restaurant.adress? `${restaurant.adress}` : "Not available" }</div>
                
            </div>
            </Link>
        )

    })



    return ( 
        
        <main className="food-restaurants">
            <h1>Restaurants</h1>
            <div className="rw-container">
                <div className="single-rw-container single-rw-header">
                    <div className="single-rw-name-header single-rw">Name of the restaurant</div>
                    <div className="single-rw-city-hedaer single-rw">City</div>
                    <div className="single-rw-address-header single-rw">Address</div>
                    

                </div>
                {restaurants}
            </div>
        </main>
    )
}