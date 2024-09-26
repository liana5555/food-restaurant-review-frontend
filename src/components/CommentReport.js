import React from "react";
import axios from "axios";
import moment from "moment";

export default function CommentReport(props) {
    const [editReport, setEditReport] = React.useState({
        type: "",
        other: ""
    })

function handleChange (e) {
    
    setEditReport(prev => ({
        ...prev,
        [e.target.name] : e.target.value

    }))

}

async function handleSendReport (e) {
    e.preventDefault() 
    if (editReport.type === null) 
        console.log("You have to choose something to make a report")
    else {

        try {
            await axios.post(`${process.env.REACT_APP_API_ROUTE}/reports/comments/`, {
                type : editReport.type,
                date : moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                comment_id : props.comment_id,
                other: editReport.other
    
            })
        }
        catch (err) {
        console.log(err)
    

    }
    

} 
//window.location.reload(true);
    props.showReport()
}  

    return (
        <div className="comment-report-container">
        <div className="reporting-form-container">
            <h2>Hozzászólás bejelntése</h2>
            <form>
            <fieldset>
        <legend>Válaszd ki hogy mi a probléma ezzel a hozzászólással</legend>
        <div className="input-label-matcher">
        <input 
            type="radio"
            id="troll"
            name="type"
            value="troll"
            checked={editReport.type === "troll"}
            onChange={handleChange}
        />
        <label htmlFor="troll">Ez egy "troll" hozzászólás, nem értelmes a szöveg.</label>
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
        <label htmlFor="offensive language">Ez a hozzászólás bántó, sértő szavakat tartalmaz.</label>
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
        <label htmlFor="disturbing content">A hozzászólás mások számára zavaró, nem megfelelő tartalommal rendelkezik. </label>
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
        <label htmlFor="other">Más</label>
        </div>
        
    </fieldset>
<label className="input-label" name="other" >Más (Nem kötelező mező)</label>
                

    <input className="input" type="text" name="other"  placeholder="Please shortly say why you're reporting this post. " value={editReport.other} onChange={handleChange}  />
                

    <button onClick={handleSendReport}>Hozzászólás bejelentése</button>
            </form>
            




        </div>
        

        
        </div>
    )
}