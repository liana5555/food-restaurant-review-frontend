import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function Navbar() {
  const [navBarStateClosed, setNavBarStateClosed] = React.useState(true);

  const { currentUser, logout } = useContext(AuthContext);

  const [profileMenuIsOpen, setProfileMenu] = React.useState(false);

  const path = useLocation();

  console.log(path);

  function handlenavBarStateClosed() {
    setNavBarStateClosed((prev) => !prev);
  }

  function handleProfileMenu() {
    setProfileMenu((prev) => !prev);
  }

  console.log(currentUser);

  return (
    <div>
      <nav className={navBarStateClosed ? "" : "mobile-open"}>
        <div
          onClick={handlenavBarStateClosed}
          className={
            navBarStateClosed ? "hamburger-menu" : "hamburger-menu-change"
          }
        >
          <span className="hamburger-top-line"></span>
          <span className="hamburger-middle-line"></span>
          <span className="hamburger-bottom-line"></span>
        </div>

        <ul className={navBarStateClosed ? "mobile-hidden" : ""}>
          <li className={path.pathname === "/" ? "onPath" : ""}>
            <Link to="/">Home</Link>
          </li>
          {currentUser && (
            <li className={path.pathname === "/write" ? "onPath" : ""}>
              <Link to="/write">Write</Link>
            </li>
          )}
          {currentUser && (
            <li className={path.pathname === "/chat" ? "onPath" : ""}>
              <Link to="/chat">Chat</Link>
            </li>
          )}
          <li className={path.pathname === "/restaurants/" ? "onPath" : ""}>
            <Link to="/restaurants/">Restaurants</Link>
          </li>
          <li>
            {currentUser ? (
              <span className="link" onClick={logout}>
                Logout
              </span>
            ) : (
              <Link to="/login">Login/Sign up</Link>
            )}
          </li>

          {currentUser && (
            <li>
              <div
                className="profile-img-name-container"
                onClick={handleProfileMenu}
              >
                <img src={`../uploads/profile_pics/${currentUser?.img}`} />
                <span className="link">{currentUser?.username}</span>
              </div>
            </li>
          )}
        </ul>
      </nav>
      {profileMenuIsOpen && (
        <ul className="profile-menu" onMouseLeave={() => setProfileMenu(false)}>
          <li>
            <Link to={`/user/${currentUser.idusers}`}>Profile</Link>
          </li>
          {currentUser.type === "admin" && (
            <li>
              <Link to="/admin/manage_users">Manage users</Link>
            </li>
          )}
          {currentUser.type === "admin" && (
            <li>
              <Link to="/admin/manage_reports">Manage reported posts</Link>
            </li>
          )}
          {currentUser.type === "restaurant worker" && (
            <li>
              <Link to="/restaurant_worker/manage_reservations">
                Manage reservations
              </Link>
            </li>
          )}
          {currentUser.type === "restaurant worker" && (
            <li>
              <Link to="/write/advertisement">Write Advertisement</Link>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
