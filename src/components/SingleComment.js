import React, { useContext } from "react"
import { AuthContext } from "../context/authContext";
import Replies from "./Replies"
import Reply from "../reply-1.svg"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function SingleComment(props) {

    const [show, setShow] = React.useState(false);
    const [value, setValue] = React.useState('');
    const {currentUser} = useContext(AuthContext)

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html')
        return doc.body.textContent
    }

    function handleClickSingleCommentReply() {
        setShow(prev => !prev)
    }

    function handleSendComment (e) {
        e.preventDefault()
        console.log("Küldés")

    }

let style;

    if (props.level === 2) style = "reply"
    else style = "comment"

    

    return(
        <div key={props.comment.idcomments} className={`single-${style}`}>
                           <div className="user">
                                <img src={props.comment.userImg} alt="" />
                                <div className="user-info">
                                    <p className="username">{props.comment.user_name}</p>
                                    <p className="post-date">Posted on: {props.comment.comment_date}</p>
                                </div>
                            </div>
                            <div className="comment-content">
                                {getText(props.comment.comment)}
                            </div>
                            <div onClick={handleClickSingleCommentReply} className="comment-reply">
                                <img src={Reply}/>
                                <span >Reply</span>
                            </div>
                            {show && currentUser && <div className="editor-container">
                                    <ReactQuill className="quill" theme="snow" value={value} onChange={setValue}/>
                                    <button onClick={handleSendComment}>Send comment</button>
                                 </div> }
                            {show && !currentUser && <div className="error">Hozzászólás írásához be kell jelentkezni</div>}
                            {<Replies post_id={props.comment.post_id} comment_id={props.comment.idcomments} level={1} />}

                    </div>
    )

}