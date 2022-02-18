import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/tempLogo.svg";

const Navbar = () => {
  const [navVisibility, setNavVisibility] = useState(false);
  const [isTeacher, setIsTeacher] = useState(
    sessionStorage.getItem("teacher") === "true"
  );

  const navToggle = () => {
    setNavVisibility(!navVisibility);
  };
  console.log(isTeacher);

  return (
    <header className="primary-header flex">
      <div>
        <img src={logo} alt="logo" className="logo" />
      </div>
      <button
        className="mobile-nav-toggle"
        aria-controls="primary-navigation"
        aria-expanded={navVisibility}
        // aria-expanded="true"
        onClick={navToggle}
      >
        {/* <span className="sr-only">Menu</span> */}
      </button>
      <nav>
        <ul
          id="primary-navigation"
          data-visable={navVisibility}
          className="primary-navigation flex"
        >
          <li>
            <Link aria-current="true" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link aria-current="false" to="/activity">
              Activities
            </Link>
          </li>
          <li>
            <Link aria-current="false" to="/create">
              Create
            </Link>
          </li>
          <li>
            {!isTeacher ? (
              <Link aria-current="false" to="/profile_student">
                Profile
              </Link>
            ) : (
              <Link aria-current="false" to="/profile_teacher">
                Teacher
              </Link>
            )}
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
