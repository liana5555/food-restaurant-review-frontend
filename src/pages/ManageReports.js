import React from "react";
import ManageSingleReport from "../components/ManageSingleReport";
import axios from "axios";



export default function ManageReports () {

    const [fetchReports, setReports] = React.useState([])

    React.useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await axios.get("/users/admin/managed_reports")
                setReports(res.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    console.log(fetchReports)
    //WORK ON THIS CUZ THE STYLE OF THIS DON'T LOOK GOOD ON MOBILE VIEW
    const allReports = fetchReports.map((report, index) => {
        return (
            <ManageSingleReport key={index} report={report} />
        )
    })

   




    return (
        <main className="profile">
            <h1>MANAGE REPORTS</h1>
            <div>
            <div className="fetched-report-container-header fetched-report-container ">
        <div className="report-container">
            <div className="count-of-report">Sum of reports</div>
            <div className="title-of-reported-post">Title of the post</div>
            <div className="button-container">
                    Editing options


            </div>

        </div>
        
        </div>
                {allReports}
            </div>
        </main>
    )
}