import React from "react";
import { Link } from "react-router-dom";

import hero from "../assets/undraw_education_f8ru.svg";
// import userIcon from "../assets/tempLogo.svg";

// components
import LoginBox from "../Components/LoginBox";

const Home = () => {
  return (
    <div className="content-box">
      {/* <h1>Home</h1> */}
      <div className="container">
        <div className="left-box">
          <img src={hero} alt="woman stood on book" />
          <h1>Welcome</h1>
          <h2>The new way to learn</h2>
          <Link to="/profile">
            <button id="joinBtn" className="btn">
              Join the Community
            </button>
          </Link>
          <Link to="/leaderboard">
            <button id="joinBtn" className="btn">
              Class leaderboard
            </button>
          </Link>
          <Link to="/achievements">
            <button id="joinBtn" className="btn">
              Achievements
            </button>
          </Link>
        </div>
        {/* <div className="right-box"> */}
        <LoginBox />
        {/* </div> */}
      </div>
    </div>
  );
};

export default Home;
