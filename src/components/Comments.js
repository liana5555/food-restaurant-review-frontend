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
    const [fetchFrom, setfrom] = React.useState(0)
    const dataFetchedRef = React.useRef(false);



    React.useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_ROUTE}/comments/${props.postid}?low=${fetchFrom}`)
                setComment(prev => prev.concat(res.data))
                
            }
            catch (err) {
                console.log(err)
            }
        }
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        fetchData()
    }, [props.postid, fetchFrom])

    const [value, setValue] = React.useState('');
    const {currentUser} = useContext(AuthContext)
    const navigate = useNavigate()


    async function handleSendComment (e) {
        e.preventDefault() 
        try {
            await axios.post(`${process.env.REACT_APP_API_ROUTE}/comments/${props.postid}`, {
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


function handleShowMore() {
        
    dataFetchedRef.current = false;
    setfrom(comments[comments.length-1].idcomments)


}


    return (

        <div className="comment">
        <h2>Comments</h2>
        {!currentUser && <div className="info">In order to write a comment you need to log in!</div>}

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
            {comments.length % 10 === 0 && comments.length !==0 ? <button className="show-more" onClick={handleShowMore}>Show more ...</button> : <div className="show-more"></div>}

        </div>
      
         
     </div>

    )
}