import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function Navbar() {
  const [navBarStateClosed, setNavBarStateClosed] = React.useState(true);

  const { currentUser, logout } = useContext(AuthContext);

  const [profileMenuIsOpen, setProfileMenu] = React.useState(false);

  const path = useLocation();

  function handlenavBarStateClosed() {
    setNavBarStateClosed((prev) => !prev);
    setProfileMenu(false);
  }

  function handleProfileMenu() {
    setProfileMenu((prev) => !prev);
  }

  return (
    <div>
      <nav className={navBarStateClosed ? "" : "mobile-open fade-in"}>
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
          <Link
            onClick={() => setNavBarStateClosed(true)}
            className={`link ${path.pathname === "/" ? "onPath" : ""}`}
            to="/"
          >
            <li>Home</li>
          </Link>
          {currentUser && (
            <Link
              onClick={() => setNavBarStateClosed(true)}
              className={`link ${path.pathname === "/write" ? "onPath" : ""}`}
              to="/write"
            >
              <li>Write</li>
            </Link>
          )}
          {currentUser && (
            <Link
              onClick={() => setNavBarStateClosed(true)}
              className={`link ${path.pathname === "/chat" ? "onPath" : ""}`}
              to="/chat"
            >
              <li>Chat</li>
            </Link>
          )}
          <Link
            onClick={() => setNavBarStateClosed(true)}
            className={`link ${
              path.pathname === "/restaurants/" ? "onPath" : ""
            }`}
            to="/restaurants/"
          >
            <li>Restaurants</li>
          </Link>
          <li className={`link ${path.pathname === "/login" ? "onPath" : ""}`}>
            {currentUser ? (
              <span className="" onClick={logout}>
                Logout
              </span>
            ) : (
              <Link
                onClick={() => setNavBarStateClosed(true)}
                to="/login"
                className={``}
              >
                Login/Sign up
              </Link>
            )}
          </li>

          {currentUser && (
            <li className="link">
              <div
                className="profile-img-name-container"
                onClick={handleProfileMenu}
              >
                <img src={`../uploads/profile_pics/${currentUser?.img}`} />
                <span className="">{currentUser?.username}</span>
              </div>
            </li>
          )}
        </ul>
      </nav>
      {profileMenuIsOpen && (
        <ul
          className={`profile-menu ${
            profileMenuIsOpen ? "fade-in" : "fade-out"
          }`}
          onMouseLeave={() => setProfileMenu(false)}
        >
          <Link
            className="link"
            onClick={() => {
              setNavBarStateClosed(true);
              setProfileMenu(false);
            }}
            to={`/user/${currentUser.idusers}`}
          >
            <li>Profile</li>{" "}
          </Link>
          {currentUser.type === "admin" && (
            <Link
              className="link"
              onClick={() => {
                setNavBarStateClosed(true);
                setProfileMenu(false);
              }}
              to="/admin/manage_users"
            >
              <li>Manage users</li>
            </Link>
          )}
          {currentUser.type === "admin" && (
            <Link
              className="link"
              onClick={() => {
                setNavBarStateClosed(true);
                setProfileMenu(false);
              }}
              to="/admin/manage_reports"
            >
              {" "}
              <li>Manage reported posts</li>
            </Link>
          )}
          {currentUser.type === "restaurant worker" && (
            <Link
              className="link"
              onClick={() => {
                setNavBarStateClosed(true);
                setProfileMenu(false);
              }}
              to="/restaurant_worker/manage_reservations"
            >
              <li>Manage reservations</li>
            </Link>
          )}
          {currentUser.type === "restaurant worker" && (
            <Link
              className="link"
              onClick={() => {
                setNavBarStateClosed(true);
                setProfileMenu(false);
              }}
              to="/write/advertisement"
            >
              {" "}
              <li>Write Advertisement</li>
            </Link>
          )}
        </ul>
      )}
    </div>
  );
}
