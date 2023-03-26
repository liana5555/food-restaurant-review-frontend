import React, { useContext } from "react"
import Reply from "../reply-1.svg"
import Reply2 from "../reply-2.svg"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AuthContext } from "../context/authContext";
import axios from "axios"


export default function Comments () {

    const [value, setValue] = React.useState('');
    const {currentUser} = useContext(AuthContext)


    
const dummy_comments = [
    {
        id: 1,
        comment_date: "2023.01.12",
        comment:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores",
        user_name: "ildi96",
        replied_for: null

    },
    {
        id: 2,
        comment_date: "2023.03.12",
        comment:"et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est ",
        user_name: "test",
        replied_for: 1
    },
    {
        id: 3,
        comment_date: "2023.03.12",
        comment:"et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est ",
        user_name: "ildi96",
        replied_for: null
    }
]



    return (

        <div className="comment">
        <h2>Hozzászólások</h2>
        <div className="comment-container">

            {dummy_comments.map(comment => {
                return (
                    <div key={comment.id} className="single-comment">
                           <div className="user">
                                <img src={comment.userImg} alt="" />
                                <div className="user-info">
                                    <p className="username">{comment.user_name}</p>
                                    <p className="post-date">Posted on: {comment.comment_date}</p>
                                </div>
                            </div>
                            <div className="comment-content">
                                {comment.comment}
                            </div>
                            <div className="comment-reply">
                                <img src={Reply}/>
                                <span>Reply</span>
                            </div>

                    </div>
                )
            })}

        </div>
        {!currentUser && <div className="info">Hozzászólás írásához be kell jelentkezni!</div>}

       {currentUser && <div className="editor-container">
            <label name="description">Please leave a comment</label>
            <ReactQuill theme="snow" value={value} onChange={setValue}/>
            <button>Send comment</button>
         </div> }
         
     </div>

    )
}