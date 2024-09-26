import React from "react";
import { Link } from "react-router-dom";
import SingleReportDetail from "./SingleReportDetail";
import axios from "axios";


export default function ManageSingleReport (props) {

    const [showDeatil, setShowDetail] = React.useState(false)

    function handleChangeShowDeatil () {
        setShowDetail(prev => !prev)
    }

    async function handleDeleteReportByPost (e) {
        e.preventDefault() 
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_ROUTE}/users/admin/managed_reports/${props.report.post_id}`)
        }
    catch (err) {
        console.log(err)
    
    
    } 
    window.location.reload(true);


    }

    return (
        <div className="fetched-report-container">
        <div className="report-container">
            <div className="count-of-report">{props.report.sumreports}</div>
            <div className="title-of-reported-post"><Link to={`/posts/${props.report.post_id}`}>{props.report.title}</Link></div>
            <div className="button-container">
                    <span className="button" onClick={handleChangeShowDeatil}>Detail</span>
                    <span className="button" onClick={handleDeleteReportByPost}>Delete</span>


            </div>

        </div>

        {showDeatil && <SingleReportDetail postID = {props.report.post_id}/>}

        
        </div>

    )

}