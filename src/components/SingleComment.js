import React, { useContext } from "react"
import { AuthContext } from "../context/authContext";
import Replies from "./Replies"
import Reply from "../reply-1.svg"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import moment from "moment"
import Delete from "../delete-delete.svg"
import dateSimplify from "../functions/date_r.mjs";
import Rep_icon from "../report-2.svg"
import CommentReport from "./CommentReport";


export default function SingleComment(props) {

    const [show, setShow] = React.useState(false);
    const [value, setValue] = React.useState('');
    const {currentUser} = useContext(AuthContext)

    const [showReport, setShowReport] = React.useState(false)

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html')
        return doc.body.textContent
    }

    function handleClickSingleCommentReply() {
        setShow(prev => !prev)
    }

    async function handleSendComment (e) {
        e.preventDefault() 
        try {
            await axios.post(`${process.env.REACT_APP_API_ROUTE}/comments/${props.comment.post_id}`, {
                comment : value,
                date : moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                replied_for : props.comment.idcomments,
                postid: props.comment.post_id

            })
        }
    catch (err) {
        console.log(err)


    } 
    window.location.reload(true);
}  

    async function handleDeleteComment (e) {
        e.preventDefault()
        try {
            await axios.delete(`${process.env.REACT_APP_API_ROUTE}/comments/${props.comment.idcomments}`)
        }
        catch (err) {
            console.log(err)
        }
        window.location.reload(true);
    }

    function handleShowReport () {
        setShowReport(prev => !prev)
        console.log(showReport)
    } 


let style;

    if (props.level === 2) style = "reply"
    else style = "comment"

    

    return(
        <div key={props.comment.idcomments} className={`single-${style}`}>
                           <div className="user">
                                <img src={`../uploads/profile_pics/${props.comment.img}`} alt="" />
                                <div className="user-info">
                                    <p className="username">{props.comment.username}</p>
                                    <p className="post-date">Posted on: {dateSimplify(props.comment.comment_date)}</p>
                                </div>
                            </div>
                            <div className="comment-content">
                                {getText(props.comment.comment)}
                            </div>
                            <div className="comment-reply-edit">
                                <div onClick={handleClickSingleCommentReply} className="comment-reply">
                                    <img src={Reply} alt="Reply button"/>
                                    <span >Reply</span>
                                </div>
                                <div className="icon-container">{currentUser && currentUser.username == props.comment.username && <div className="comment-delete" onClick={handleDeleteComment}>
                                    <img src={Delete} alt="the icon of deleting this comment"/>
                                    <span>Delete</span>
                                </div>}
                                {currentUser && <div className="comment-delete" onClick={handleShowReport}>
                                    <img src={Rep_icon} alt="Report this comment"/>
                                   
                                    
                                    </div>}
                                </div>
                            </div>
                            {showReport && currentUser && <CommentReport comment_id = {props.comment.idcomments} showReport = {handleShowReport} />}

                            {show && currentUser && <div className="editor-container">
                                    <ReactQuill className="quill" theme="snow" value={value} onChange={setValue}/>
                                    <button onClick={handleSendComment}>Send comment</button>
                                 </div> }
                            {show && !currentUser && <div className="error">Hozzászólás írásához be kell jelentkezni</div>}
                            {<Replies post_id={props.comment.post_id} comment_id={props.comment.idcomments} level={1} />}

                    </div>
    )

}