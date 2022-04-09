import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserSettings.module.css";

import studentIcon from "../assets/UserIcons/001-man-1.png";
import CustomButton from "../Components/CustomButton";
import { MdEdit } from "react-icons/md";

// import getUserDetails from "../"
import { getUserDetails } from "../http_Requests/userRequests";
import SelectProfilePicture from "../Components/UserSettings/SelectProfilePicture";
import SelectBanner from "../Components/UserSettings/SelectBanner";

const UserSettings = () => {
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [banner, setBanner] = useState();

  const [isSelectProfilePic, setIsSelectProfilePic] = useState(false);
  const [isSelectBanner, setIsSelectBanner] = useState(false);

  const navigate = useNavigate();

  const getDetails = async () => {
    const data = await getUserDetails();

    if (data.status === "success") {
      const { FirstName, LastName, Email, ProfilePicture, Banner } =
        data.data[0];
      setEmail(Email);
      setFirstName(FirstName);
      setLastName(LastName);
      setProfilePicture(ProfilePicture);
      setBanner(Banner);
    }
  };

  //get user details from api on load
  useEffect(async () => {
    await getDetails();
  }, []);
  const deleteAccount = () => {
    //TODO: Make delete user
    if (
      window.confirm(
        "Are you sure you want to save this thing into the database?"
      )
    ) {
      // Save it!
      console.log("Thing was saved to the database.");
    } else {
      // Do nothing!
      console.log("Thing was not saved to the database.");
    }
  };
  return (
    <div className="content-box">
      {/* <div className="container wide-container center-container"> */}
      {/* <div className={styles.container}> */}
      <h1>User settings</h1>
      <div className={styles.container}>
        <h2>Profile picture</h2>
        <div
          className={styles.profilePicture}
          style={{
            backgroundImage: `url(${profilePicture})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          title="Profile Picture"
        >
          <MdEdit
            className={styles.editIcon}
            onClick={() => setIsSelectProfilePic(true)}
          />
        </div>
        <h2>Banner</h2>
        <div
          className={styles.banner}
          style={{
            backgroundImage: `url(${banner})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          title="Banner"
        >
          <MdEdit
            className={styles.editIcon}
            onClick={() => setIsSelectBanner(true)}
          />
        </div>
        <h2>My details</h2>
        <p>Email:{email}</p>
        <p>First: {firstName}</p>
        <p>Last: {lastName}</p>

        <CustomButton
          type={1}
          text={"Update details"}
          onClick={() =>
            navigate("/user_settings/edit", {
              state: {
                firstName: firstName,
                lastName: lastName,
                email: email,
              },
            })
          }
        />
        <CustomButton
          type={2}
          text={"Delete my account"}
          onClick={deleteAccount}
        />
      </div>
      {isSelectProfilePic ? (
        <SelectProfilePicture
          close={() => setIsSelectProfilePic(false)}
          getDetails={getDetails}
        />
      ) : (
        <></>
      )}
      {isSelectBanner ? (
        <SelectBanner
          close={() => setIsSelectBanner(false)}
          getDetails={getDetails}
        />
      ) : (
        <></>
      )}
    </div>
    // //{" "}
    //</div>
  );
};

export default UserSettings;
