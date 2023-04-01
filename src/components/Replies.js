import React from "react"
import Reply from "../reply-1.svg"
import SingleComment from "./SingleComment"

export default function Replies(props) {


    //Need a state for a fetch data
    const [show, setshow] = React.useState(false)

    const dummy = [
        {
            id: 2,
            comment_date: "2023.03.12",
            comment:"et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est ",
            user_name: "test",
            replied_for: 1
        }, 
        {
            id: 4,
            comment_date: "2023.03.12",
            comment:"et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est ",
            user_name: "test",
            replied_for: 1
        }

    ]

//Need to fetch the data with the id that comes in props. That is the id of the comment that the replies go for. where replied_for = id (this part will be done in the server)

function handleClick_Reply() {
    setshow(prev => !prev)

}


const replies = dummy.map(reply => {
    return (
           /* <div key={reply.id} className="single-reply">
                           <div className="user">
                                <img src={reply.userImg} alt="" />
                                <div className="user-info">
                                    <p className="username">{reply.user_name}</p>
                                    <p className="post-date">Posted on: {reply.comment_date}</p>
                                </div>
                            </div>
                            <div className="comment-content">
                                {reply.comment}
                            </div>
                            <div className="comment-reply">
                                <img src={Reply}/>
                                <span>Reply</span>
                            </div>

                    </div>*/
                    <SingleComment key={reply.id} comment={{...reply, replied_for: props.id}} level={2} />
       
    )
})

    return (
        <div>
            {dummy && <p className="replies-read"  onClick={handleClick_Reply}>&#9660; {dummy.length} válasz</p>}
            {show && replies}
        </div>
    )
}