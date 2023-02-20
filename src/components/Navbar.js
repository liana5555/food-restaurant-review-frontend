import React from "react"
import { Link, useNavigate } from "react-router-dom";

export default function Navbar () {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login/Sign up</Link></li>
                <span></span>
            </ul>
        </nav>
    )


}