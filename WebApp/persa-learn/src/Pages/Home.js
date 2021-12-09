import React from "react";

import userIcon from "../assets/tempUserIcon.svg";
import hero from "../assets/undraw_education_f8ru.svg";
// import userIcon from "../assets/tempLogo.svg";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <div className="container">
        <div className="left-box">
          <img src={hero} alt="woman stood on book" />
          <h1>Welcome</h1>
          <h2>The new way to learn</h2>
          <button id="joinBtn" className="btn">
            Join the Community
          </button>
        </div>
        <div className="right-box">
          <img src={userIcon} alt="User icon" />
          <h1>Login</h1>
          <form action="">
            <label htmlFor="usermame">User name</label>
            <input type="text" name="username" />{" "}
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
            <input type="submit" className="btn" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
