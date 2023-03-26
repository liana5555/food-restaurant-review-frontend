import React, { useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function Navbar () {
    
    const {currentUser, logout} = useContext(AuthContext)

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/write">Write</Link></li>
                <li>{currentUser? (<span className="link" onClick={logout}>Logout</span>) : <Link to="/login">Login/Sign up</Link>}</li>
                {currentUser && <span className="link">{currentUser?.username}</span> }
            </ul>
        </nav>
    )


}