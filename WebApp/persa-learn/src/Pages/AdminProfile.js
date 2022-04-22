import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../Components/CustomButton";
import styles from "./AdminProfile.module.css";

const AdminProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="content-box">
      <h1>Admin Profile</h1>
      <div className={styles.container}>
        <h2>Stats</h2>
        <div className={styles.statistics}>
          <div className={styles.sign_ups}>
            <h3>Monthly Sign Ups</h3>
          </div>
          <div className={styles.users}>
            <h3>Number of Users</h3>
          </div>
          <div className={styles.quizzes}>
            <h3>Number of Quizzes</h3>
          </div>
        </div>
        <h2>Schools Actions</h2>

        <h2>Item Actions</h2>
        <CustomButton
          text={"Banners"}
          onClick={() => navigate("/banners", {})}
        />
        <CustomButton
          text={"Profile Pictures"}
          onClick={() => navigate("/profilePictures", {})}
        />
        <CustomButton text={"Themes"} onClick={() => navigate("/themes", {})} />
      </div>
    </div>
  );
};

export default AdminProfile;
