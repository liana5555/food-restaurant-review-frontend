import React from "react"
//import Reply from "../reply-1.svg"
import SingleComment from "./SingleComment"
import axios from "axios"

export default function Replies(props) {

    const [comments, setComment] = React.useState([])
    const [fetchFrom, setfrom] = React.useState(0)
    const dataFetchedRef = React.useRef(false);


    React.useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_ROUTE}/comments/${props.post_id}/reply/${props.comment_id}?low=${fetchFrom}`)
                setComment(prev => prev.concat(res.data))
                
            }
            catch (err) {
                console.log(err)
            }
        }
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        fetchData()
    }, [props.comment_id, props.post_id, fetchFrom])



    //Need a state for a fetch data
    const [show, setshow] = React.useState(false)


//Need to fetch the data with the id that comes in props. That is the id of the comment that the replies go for. where replied_for = id (this part will be done in the server)

function handleClick_Reply() {
    setshow(prev => !prev)

}

//console.log(comments)
/*
function handleShowMore() {
        
    dataFetchedRef.current = false;
    setfrom(comments[comments.length-1].idcomments)


}
*/

const replies = comments.map(reply => {
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
                    <SingleComment key={reply.idcomments} comment={{...reply, replied_for: props.comment_id}} level={2} />
       
    )
})

    return (
        <div>
            {replies.length > 0 && <p className="replies-read"  onClick={handleClick_Reply}>&#9660; {replies.length} {replies.length > 1 ? "replies" : "reply"}</p>}
            {show && replies}
            

        </div>
    )
}