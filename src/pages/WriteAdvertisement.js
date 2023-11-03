import React, { useContext } from "react"
import axios from "axios";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useLocation } from "react-router-dom";
import moment from "moment"
import { AuthContext } from "../context/authContext";
import ErrorUp from "../components/ErrorUp";
import { Link, useNavigate } from "react-router-dom";


export default function WriteAdvertisement() {

    const navigate = useNavigate()

    const state = useLocation().state
    const [response, setResponse] = React.useState("")

    //fetch the deatils of the restaurant connected to the current user
    const [deatilsOfRestaurant, setDetailsOfRestaurant] = React.useState([])  ///USeffetc

    const [value, setValue] = React.useState(state?.desc || ""); //for react-quill
    const [file, setFile] = React.useState(state?.img || null); //for image
    const [advertisement, setAdvertisement] = React.useState({
        title: state?.title || "",
        name_of_food: state?.name_of_food || "",
    });

    const {currentUser} = useContext(AuthContext)


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
    

    function handleChange (e) {
        setAdvertisement(prev=> ({
            ...prev, 
            [e.target.name] : e.target.value
        }))
    }

    async function handlePublish (e) {
        e.preventDefault()
        let imgUrl
        
        if (state && file != state?.img) {
            imgUrl = await upload()
       }
       else if(!state) {
           imgUrl = await upload()
       }
       
        
   
        try {
           const res = state ? await axios.put(`/posts/advertisements/${state.idposts}`, {
            title: advertisement.title,
            desc: value ,
            img:file? (imgUrl? imgUrl :file) : "",
            rating_of_food: -1,
            rating_of_restaurant: -1,
            name_of_food: advertisement.name_of_food,
            restaurant_id: currentUser.restaurant_id



           }):
           await axios.post(`/posts/advertisements/`, {
            title: advertisement.title,
            desc: value ,
            img:file? (imgUrl? imgUrl :file) : "",
            rating_of_food: -1,
            rating_of_restaurant: -1,
            name_of_food: advertisement.name_of_food,
            restaurant_id: currentUser.restaurant_id,
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")



           })

           setResponse(res.data)
      

            setTimeout(() => navigate("/"), 2000)
            
        }
        catch(err) {
            console.log(err)
            setResponse(err)

        }

        
    }



    return (
        <main className="write">
            
            <div className="container">
                {/*error && <ErrorUp content={error} statehandling={setError} />*/}
                <h1>Add an advertisement</h1>
                
                <div className="title-container">
                    <label name="title">Give a title to your advertisement</label>
                    <input id="title" type="text" name="title" placeholder="title" onChange={handleChange} value={advertisement.title} required/>
                </div>
                
                 <div className="editor-container">
                    <label name="description">Give a description to your advertisement</label>
                    <ReactQuill className="editor" theme="snow" value={value} onChange={setValue}/>
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
                    <label htmlFor="img" className="img-upload">Kép feltöltése</label>
                
                    </div>

                    {/* Itt volt a button -holder eredetileg*/}
                </div>

                <div className="item">
                <div className="food-name">
                        <label name="name_of_food" htmlFor="food">Name of the food</label>
                        <input id="name_of_food" type="text" name="name_of_food"  placeholder="Name of the food" onChange={handleChange} value={advertisement.name_of_food} required />
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