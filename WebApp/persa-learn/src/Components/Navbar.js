import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

import { MdMenu } from "react-icons/md";

// import logo from "../assets/tempLogo.svg";
import logo from "../assets/logo.png";
// import logo from "../assets/logo.svg";

const Navbar = () => {
  const [navVisibility, setNavVisibility] = useState(false);
  const [isTeacher, setIsTeacher] = useState(
    sessionStorage.getItem("teacher") === "true"
  );
  const [isAdmin, setIsAdmin] = useState(
    sessionStorage.getItem("admin") === "true"
  );

  const navToggle = () => {
    setNavVisibility(!navVisibility);
  };
  // console.log(isTeacher);
  const logout = (e) => {
    // e.preventDefault();
    sessionStorage.clear();
    window.location.reload();
    // setToken("");
  };
  return (
    // <header className="primary-header flex">
    <header className={styles.primary_header}>
      <div className={styles.logo_container}>
        {/* <img src={logo} alt="logo" className="logo" /> */}
        <img src={logo} alt="logo" className={styles.logo} />
      </div>
      <button
        // className="mobile-nav-toggle"
        className={styles.mobile_nav_toggle}
        aria-controls="primary-navigation"
        aria-expanded={navVisibility}
        // aria-expanded="true"
        onClick={navToggle}
      >
        {/* <span className="sr-only">Menu</span> */}
        <MdMenu aria-label="menu" />
      </button>
      <nav>
        <ul
          id="primary-navigation"
          data-visable={navVisibility}
          // className="primary-navigation flex"
          className={styles.primary_navigation}
        >
          {isAdmin ? (
            <>
              <li>
                <Link aria-current="false" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link aria-current="false" to="/shop">
                  Shop
                </Link>
              </li>
              <li>
                <Link aria-current="false" to="/account">
                  Profile
                </Link>
              </li>
            </>
          ) : !isTeacher ? (
            <>
              <li>
                <Link aria-current="false" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link aria-current="false" to="/classes">
                  Classes
                </Link>
              </li>
              <li>
                <Link aria-current="false" to="/revision">
                  Revision
                </Link>
              </li>
              <li>
                <Link aria-current="false" to="/shop">
                  Shop
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link aria-current="false" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link aria-current="false" to="/classes">
                  Classes
                </Link>
              </li>
              <li>
                <Link aria-current="false" to="/details_teacher">
                  Profile
                </Link>
              </li>
            </>
          )}
          <li>
            <a aria-current="false" href="#" onClick={() => logout()}>
              Logout
            </a>
          </li>

          {/* <li>
            <Link aria-current="false" to="/profile_student">
              Profile
            </Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
