import React, { useContext } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Menu from "../components/Menu"
import Edit from "../edit-246.svg"
import Delete from "../delete-delete.svg"
import Star from "../components/Star"
import 'react-quill/dist/quill.snow.css';
import { AuthContext } from "../context/authContext";
import axios from "axios"
import Comments from "../components/Comments"
import dateSimplify from "../functions/date_r.mjs";
import Rep_icon from "../report-2.svg"
import moment from "moment"

export default function Posts () {

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html')
        return doc.body.textContent
    }

    const [showReport, setShowReport] = React.useState(false)
    const [editReport, setReport] = React.useState({
        type: null,
        other: ""

    })

    const navigate = useNavigate()

    const [post, setPost] = React.useState([])
    const [rating, setRating] = React.useState({
        restaurant: {
          rating: 3,
        temporary_rating: 2
        },
        food: {
          rating: 3,
          temporary_rating: 2
        }
        
           })


    const location = useLocation()

    const postId = location.pathname.split("/")[2]

    React.useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await axios.get(`/posts/${postId}`)
                setPost(res.data)
                console.log(res.data)
                setRating({restaurant: {
                    rating: res.data.rating_of_restaurant,
                  temporary_rating: res.data.rating_of_restaurant
                  },
                  food: {
                    rating: res.data.rating_of_food,
                    temporary_rating: res.data.rating_of_food
                  }})
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [postId])

    //const [value, setValue] = React.useState('');
    const {currentUser} = useContext(AuthContext)
 
    
/*

###################################################
First I will need to fetch the data from the database to set the state
The rating state here is not changable since it is connected to this post.
So they can't change it later. 
But they can change their opinion of the restaurant later and change their rating but it won't affect this post. 
####################################################

*/


function handleMouseOver(id, type) {
//console.log(id)
//console.log(type)
    setRating((prev => {
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

    setRating((prev => {

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
    setRating((prev => {

        return ({
        ...prev,
        [type]: {
        rating: id,
        temporary_rating: id
        }

    })
    }))

}

async function handleDelete () {
    try {
        const res= await axios.delete(`/posts/${postId}`);
        navigate("/")
    }
    catch (err) {
        console.log(err)
    }

}





//Functions for reportinhg
//show reporting div

function handleShowReporting() {
    setShowReport(prev => !prev)
}

function handleChange (e) {
    setReport(prev => {
        return {
            ...prev, 
            [e.target.name] : e.target.type ==="checkbox" ? e.target.checked : e.target.value
        }
    })

}

async function handleSendReport (e) {
    e.preventDefault() 
    if (editReport.type === null) 
        console.log("You have to choose something to make a report")
    else {

        try {
            await axios.post(`/reports/`, {
                type : editReport.type,
                date : moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                post_id : postId,
                other: editReport.other
    
            })
        }
        catch (err) {
        console.log(err)
    

    }
    

} 
window.location.reload(true);
}  

console.log(currentUser)


    return (
       <main className="single-post">
        
        <div className="container">
            
            <div className="img-container">
                <img src={`../uploads/${post.img}`} alt=""/>
            </div>
            
            <div className="user">
                <img src={`../uploads/profile_pics/${post.userImg}`} alt="" />
                <div className="user-info">
                    <p className="username">{post.username}</p>
                    <p className="post-date">Posted on: {dateSimplify(post.date)}</p>
                </div>
            {currentUser && (currentUser.username === post.username || currentUser.type ==="admin")  && <div className="edit">
                                <Link to={`/write?edit=${postId}`} state={post}><img src={Edit} alt="edit"/></Link>
                                <img onClick={handleDelete} src={Delete} alt="delete"/>
                                

                            </div> }

            </div>
            <div className="post-title-container">
                <h1>{post.title}</h1>
                { currentUser && <img src={Rep_icon} alt="Report this post" onMouseEnter={handleShowReporting} />}
            
            </div>
            {currentUser && showReport && <div className="reporting-container" onMouseLeave={handleShowReporting}>
                <div className="reporting-form-container">
                    <h2>Report this post</h2>
                    <form>
                    <fieldset>
                <legend>Choose the problem with the post</legend>
                <div className="input-label-matcher">
                <input 
                    type="radio"
                    id="troll"
                    name="type"
                    value="troll"
                    checked={editReport.type === "troll"}
                    onChange={handleChange}
                />
                <label htmlFor="troll">This is a troll post. The content is all giberish.</label>
               </div>
               <div className="input-label-matcher">
                <input 
                    type="radio"
                    id="offensive language"
                    name="type"
                    value="offensive language"
                    checked={editReport.type === "offensive language"}
                    onChange={handleChange}
                />
                <label htmlFor="offensive language">This post contains offensive language, mainly cuss words. </label>
                </div>
                
                <div className="input-label-matcher">
                <input 
                    type="radio"
                    id="disturbing content"
                    name="type"
                    value="disturbing content"
                    checked={editReport.type === "disturbing content"}
                    onChange={handleChange}
                />
                <label htmlFor="disturbing content">The post contains disturbing things that migh not be suitable for some poeple. </label>
                </div>
                <div className="input-label-matcher">
                <input 
                    type="radio"
                    id="other"
                    name="type"
                    value="other"
                    checked={editReport.type === "other"}
                    onChange={handleChange}
                />
                <label htmlFor="other">Other</label>
                </div>
                
            </fieldset>
<label className="input-label" name="other" >Other reasons (Not required field)</label>
                        

            <input className="input" type="text" name="other"  placeholder="Please shortly say why you're reporting this post. " value={editReport.other} onChange={handleChange}  />
                        

            <button onClick={handleSendReport}>Report the post</button>
                    </form>
                    




                </div>
                

                
                </div>}
            <div className="food-and-restaurant-name">
                <h2>Name of food: {post.name_of_food}</h2>
                <h2>Name of restaurant: {post.name_of_restaurant}</h2>
            </div>
            <div className="post-content">
                <div className="post-content-text">
                   {getText(post.desc)}
                </div>

                <div className="post-content-rating">
                    <h3>Rating of the food</h3>
                    <Star   rating={rating}
                            changable={false}
                            type="food"
                            handleMouseOver={handleMouseOver}
                            handleMouseOut={handleMouseOut}
                            handleClick={handleClick} />
                            <h3>Rating of the restaurant</h3>
                     <Star   rating={rating}
                                    changable={false}
                                    type="restaurant"
                                    handleMouseOver={handleMouseOver}
                                    handleMouseOut={handleMouseOut}
                                    handleClick={handleClick} />
                </div>

             </div>

        <Comments postid={postId}/>
            
            
        </div>

        <Menu />
  
        </main>
    )


}