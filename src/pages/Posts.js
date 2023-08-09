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

export default function Posts () {

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html')
        return doc.body.textContent
    }

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
                    <p className="post-date">Posted on: {post.date}</p>
                </div>
            {currentUser && currentUser.username === post.username && <div className="edit">
                                <Link to={`/write?edit=${postId}`} state={post}><img src={Edit} alt="edit"/></Link>
                                <img onClick={handleDelete} src={Delete} alt="delete"/>

                            </div> }

            </div>
            <h1>{post.title}</h1>
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