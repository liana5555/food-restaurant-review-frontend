import React from "react";
import axios from "axios";
import ManageSingleUser from "../components/ManageSingleUser";



export default function ManageUsers() {

    const [fetchAllUsers, setAllUsers] = React.useState([])

    React.useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await axios.get("/users/admin/managed_user")
                setAllUsers(res.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    console.log(fetchAllUsers)
    //WORK ON THIS CUZ THE STYLE OF THIS DON'T LOOK GOOD ON MOBILE VIEW
    const allUsers = fetchAllUsers.map(user => {
        return (
            <ManageSingleUser key={user.idusers} user={user} />
        )
    })




    return (
        <main className="profile">
            <h1>MANAGE USERS</h1>
            <div>
                {allUsers}
            </div>
        </main>
    )
}