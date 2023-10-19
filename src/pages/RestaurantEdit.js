import React from "react";
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useNavigate } from "react-router-dom";


import { useLocation } from "react-router-dom";

export default function RestaurantEdit () {

    const state = useLocation().state
    const navigate = useNavigate()


    const [value, setValue] = React.useState(state[0]?.description || "");
 

    const [restaurantForm, setrestaurantForm] = React.useState(
        state[0] ? state[0] : {
            restaurant_name: "",
            city: "",
            adress: "",
            opening_time: "",
            closing_time: ""
        }
    )




    function handleChange (e) {
        setrestaurantForm(prev => {
            return {
                ...prev, 
                [e.target.name] : e.target.value
            }
        })

    }

    async function handleSubmit(e) {
        e.preventDefault()
        console.log("Sending changes")

        try {
            const res= axios.put(`/users/restaurant/${state[0].idrestaurants}`, 
            
            {...restaurantForm,
                 description: value })

            
            

             navigate(`/restaurants/${state[0].idrestaurants}`)
                 
        }
        catch(err) {
            console.log(err)
        }

    }

  
  console.log(restaurantForm)
    return(
        <main className="food-restaurants restaurant-edit">
            <h1>Edit details of restaurant</h1>
            
        <form onSubmit={handleSubmit}>
            <label htmlFor="restaurant_name">Restaurant Name:</label>
            <input id="restaurant_name" 
                    name="restaurant_name"
                     type="text"
                      value={restaurantForm.restaurant_name}
                      onChange={handleChange}/>
             <div className="editor-container">
                    <label name="description">Change description of the restaurant</label>
                    <ReactQuill id="description" className="editor" theme="snow" value={value} onChange={setValue}/>
                </div>
            <label htmlFor="city">City</label>
            <input id="city" 
                    name="city"
                     type="text"
                      value={restaurantForm.city}
                      onChange={handleChange }/>
            <label htmlFor="city">Address</label>
            <input id="adress" 
                    name="adress"
                     type="text"
                      value={restaurantForm.adress}
                      onChange={handleChange }/>
                        <label htmlFor="opening_time">Opening time</label>
            <input id="opening_time" 
                    name="opening_time"
                     type="time"
                      value={restaurantForm.opening_time}
                      onChange={handleChange }/>
                      <label htmlFor="closing_time">Closing time</label>
            <input id="closing_time" 
                    name="closing_time"
                     type="time"
                      value={restaurantForm.closing_time}
                      onChange={handleChange }/>

                      <button>Save changes</button>

        </form>

        </main>
    )
}