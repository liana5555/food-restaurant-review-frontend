import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation } from "react-router-dom";
import Star from "../components/Star";
import moment from "moment";
import ErrorUp from "../components/ErrorUp"

import NeedLogin from "./NeedLogin";



export default function Write() {
    const state = useLocation().state

    const navigate = useNavigate()
    

  


    const [value, setValue] = React.useState(state?.desc || "");
    const [title, setTitle] = React.useState(state?.title || "");
    const [file, setFile] = React.useState(state?.img || null)
    const [nameOfFood, setNameOfFood] = React.useState(state?.name_of_food || "")
    const [nameOfRestaurant, setNameOfRestaurant] = React.useState(state?.name_of_restaurant || "")
    const [cityOfRestaurant, setCityOfRestaurant] = React.useState(state?.city || "")
    const [addressOfRestaurant, setAddressOfRestaurant] = React.useState(state?.address || "")
    
    const [response, setResponse] = React.useState("")

    const [writerating, setWriteRating] = React.useState( {
        restaurant: {
          rating: state?.rating_of_restaurant || 3,
        temporary_rating: state?.rating_of_restaurant || 2
        },
        food: {
          rating: state?.rating_of_food || 3,
          temporary_rating: state?.rating_of_food || 2
        }
        
           })

console.log(state)
console.log(file)

function handleMouseOver(id, type) {
    //console.log(id)
    //console.log(type)
    setWriteRating((prev => {
    //console.log(prev[type])
        return ({
            ...prev,
            [type]: {
            ...prev[type],
            temporary_rating: id
            }
            
    })
    }))
    // console.log(rating[type].temporary_rating)
    
    }
    
    function handleMouseOut (type) {
    
    setWriteRating((prev => {
    
    //console.log(prev[type])
        return ({
            ...prev,
            [type]: {
            ...prev[type],
            temporary_rating: prev[type].rating
            }
        
    })
    }))
    }
    
    function handleClick (id, type) {
    setWriteRating((prev => {
    
        return ({
            ...prev,
            [type]: {
            rating: id,
            temporary_rating: id
            }
            
        })
        }))
    
    }

async function upload() {
    try{
        const formData = new FormData();
        formData.append("file", file)
        const res = await axios.post("/uploads?type=post", formData)
        return res.data
    }   
    catch (err) {
        console.log(err)
    }
}


async function handlePublish(e) {
        e.preventDefault()
        let imgUrl

        if (state && file != state?.img) {
             imgUrl = await upload()
        }
        else if(!state) {
            imgUrl = await upload()
        }
        
       

        const img = file? (imgUrl? imgUrl :file) : "" 

        try {
            const res = state ? await axios.put(`/posts/${state.idposts}`, {
                title,
                desc: value,
                img:file? (imgUrl? imgUrl :file) : "" ,
                rating_of_food: writerating.food.rating,
                rating_of_restaurant: writerating.restaurant.rating,
                name_of_food: nameOfFood,
                name_of_restaurant: nameOfRestaurant,
                city: cityOfRestaurant,
                address: addressOfRestaurant

            }) 
            : await axios.post(`/posts/`, {
                title,
                desc: value,
                img:file? (imgUrl? imgUrl :file) : "",
                rating_of_food: writerating.food.rating,
                rating_of_restaurant: writerating.restaurant.rating,
                date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                name_of_food: nameOfFood,
                name_of_restaurant: nameOfRestaurant,
                city: cityOfRestaurant,
                address: addressOfRestaurant

        });
        console.log(res)
        setResponse(res.data)
      

        setTimeout(() => navigate("/"), 2000)
    }
        catch (err) {
            console.log(err)
            setResponse(err)
        }

        


    }


    return( 
        <main className="write">
            
            <div className="container">
                <h1>Add a post</h1>
                <div className="title-container">
                    <label name="title">Give a title to your post</label>
                    <input id="title" type="text" name="title" placeholder="title" onChange={e=>setTitle(e.target.value)} value={title} required/>
                </div>
                
                 <div className="editor-container">
                    <label name="description">Give a description to your post</label>
                    <ReactQuill className="editor" theme="snow" value={value} onChange={setValue}/>
                 </div>
                 <div className="rating-container">
                    <h2>Rating of food</h2>
                    <Star   
                            changable={true}
                            rating={writerating}
                            type="food"
                            handleMouseOver={handleMouseOver}
                            handleMouseOut={handleMouseOut}
                            handleClick={handleClick}
                                     />
                    <div className="rating-description">
                        <h2>Rating of restaurant</h2>
                        <p className="rest-rating-desc">Please when you rate the restaurant consider the quality of service and not the food. For rating the food there is the upper rating section.</p>
                    </div>
                           
                    <Star   changable={true}
                            rating={writerating}
                            type="restaurant"
                            handleMouseOver={handleMouseOver}
                            handleMouseOut={handleMouseOut}
                            handleClick={handleClick}
                                     />
                    
                 </div>
            </div>
            <div className="menu">
                <div className="publishing-details">
                    <h1 className="publish">Publish</h1>
                    <div className="post-writing-status">
                    {/* <span>
                        <b>Status: </b> Draft
                    </span>
                    <span>
                        <b>Visibility: </b> Public
    </span> */ }
                    <input id="img" type="file" name="image" style={{display: "none"}} onChange={e=>setFile(e.target.files[0])}/>
                    <label htmlFor="img" className="img-upload">Upload picture</label>
                
                    </div>

                    {/* Itt volt a button -holder eredetileg*/}
                </div>

                <div className="item">
                <div className="food-name">
                        <label name="food" htmlFor="food">Name of the food</label>
                        <input id="food" type="text" name="nameOfFood"  placeholder="Name of the food" onChange={e=>setNameOfFood(e.target.value)} value={nameOfFood} required />
                    </div>

                    <div className="restaurant-name">
                        <label name="restaurant" htmlFor="restaurant">Name of the restaurant</label>
                        <input id="restaurant" type="text" name="nameOfRestaurant"  placeholder="Name of the restaurant" onChange={e=>setNameOfRestaurant(e.target.value)} value={nameOfRestaurant} required />
                    </div>


                    <div className="restaurant-city">
                        <label name="restaurant-city" htmlFor="restaurant-city">City of the restaurant</label>
                        <input id="restaurant-city" type="text" name="cityOfRestaurant"  placeholder="City of the restaurant" onChange={e=>setCityOfRestaurant(e.target.value)} value={cityOfRestaurant} />
                    </div>

                    <div className="restaurant-address">
                        <label name="restaurant-address" htmlFor="restaurant-address">Address of the restaurant</label>
                        <input id="restaurant-address" type="text" name="addressOfRestaurant"  placeholder="Address of the restaurant" onChange={e=>setAddressOfRestaurant(e.target.value)} value={addressOfRestaurant} />
                    </div>
                    
                  
                </div>
                <div className="button-holder">

                        {/* <button>Save as a draft</button> */}
                        <button onClick={handlePublish}>Publish</button>
                    </div>
                    {response && <ErrorUp content={response} statehandling={setResponse} />}
            </div>
            
            
        </main>
    )
}