import React, { useContext } from "react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AuthContext } from "../context/authContext";
import axios from "axios"
import SingleComment from "./SingleComment";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";



export default function Comments (props) {

    const [comments, setComment] = React.useState([])



    React.useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await axios.get(`/comments/${props.postid}`)
                setComment(res.data)
                
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [props.postid])

    const [value, setValue] = React.useState('');
    const {currentUser} = useContext(AuthContext)
    const navigate = useNavigate()


    async function handleSendComment (e) {
        e.preventDefault() 
        try {
            await axios.post(`/comments/${props.postid}`, {
                comment : value,
                date : moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                replied_for : null,
                postid: props.postid

            })
        }
    catch (err) {
        console.log(err)


    } 
    window.location.reload(false);
}    


    return (

        <div className="comment">
        <h2>Hozzászólások</h2>
        {!currentUser && <div className="info">Hozzászólás írásához be kell jelentkezni!</div>}

        {currentUser && <div className="editor-container">
        <label name="description">Please leave a comment</label>
        <ReactQuill theme="snow" value={value} onChange={setValue}/>
        <button onClick={handleSendComment}>Send comment</button>
            </div> }
        <div className="comment-container">

            {comments.map(comment => {
                console.log(comment)
                return (
                    <SingleComment key={comment.idcomments} comment={comment} />
                )
            })}

        </div>
      
         
     </div>

    )
}