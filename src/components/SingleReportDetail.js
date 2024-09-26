import React from "react";
import axios from "axios";
import dateSimplify from "../functions/date_r.mjs";


export default function SingleReportDetail(props) {

    const [fetchReports, setReports] = React.useState([])

    React.useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_ROUTE}/users/admin/managed_reports/${props.postID}`)
                setReports(res.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])


    console.log(fetchReports)

    const reportDetail = fetchReports.map(report => {
        return (
              <div key={report.idreports} className="report-container report-container-detail">
            <div>type: {report.type}</div>
            <div>other: {report.other}</div>
            <div>date: {dateSimplify(report.date)}</div>
            

        </div>
        )
      
    })



    return (
        <div className="detail-container">
            {reportDetail}

        </div>
    )
}