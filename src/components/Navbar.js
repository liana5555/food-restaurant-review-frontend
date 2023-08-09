import React, { useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function Navbar () {

    const [navbarState, setNavbarState] = React.useState(false)
    
    const {currentUser, logout} = useContext(AuthContext)

    const [profilemenu, setProfileMenu] = React.useState(false)


    function handleNavbarState () {
        setNavbarState(prev => !prev)

    }

    function handleProfileMenu () {
        setProfileMenu(prev => ! prev)
    }

    console.log(currentUser)

    return (
        <nav>
             <div onClick={handleNavbarState} className={navbarState ? "hamburger-menu" : "hamburger-menu-change"}>
                <span className="hamburger-top-line"></span>
                <span className="hamburger-middle-line"></span>
                <span className="hamburger-bottom-line"></span>
            </div>
            <ul className={navbarState ? "ul_none" : "ul_visible"}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/write">Write</Link></li>
                <li><Link to="/restaurants">Restaurants</Link></li>
                <li>{currentUser? (<span className="link" onClick={logout}>Logout</span>) : <Link to="/login">Login/Sign up</Link>}</li>
                {currentUser && <div className="nav-profile-container">
                    <div className="user-img-name-container" onClick={handleProfileMenu}>
                        <img src={`../uploads/profile_pics/${currentUser?.img}`}/>
                        <span className="link">{currentUser?.username}</span>
                    
                    </div>
                    {profilemenu && <div className={profilemenu ? "user-menu-container": "user-menu-container-hidden"}>
                        <ul className="profile-sub-menu">
                            <li className="link">Profile</li>
                            <li className="link">Settings</li>
                            <li className="link">Delete account</li>
                        </ul>

                    </div>}
                    

                    </div> }
            </ul>

           
        </nav>

    )


}