import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Menu(props) {

    const [fetchedPost, setPosts] = React.useState([])

    React.useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_ROUTE}/posts/menu/${props.postID}`)
                setPosts(res.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])




        const posts = fetchedPost.map((post) => {
            return (
                <div className="post" key={post.idposts}>
                    <img src={`../uploads/${post.img}`} alt=""/>
                    <h2>{post.title}</h2>
                    <Link to={`/posts/${post.idposts}`}><button className="read-more">Read More</button></Link>

                </div>
            )
        })

    return (
        <div className="menu">
           <h1>Other posts you may like</h1>
            {posts}
        </div>
    )

}