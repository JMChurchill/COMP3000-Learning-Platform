import React, { useState, useEffect } from "react";
import { getPurchasedProfilePictures } from "../../http_Requests/StudentRequests/ItemRequests";
import { updateProfilePicture } from "../../http_Requests/StudentRequests/StudentRequests";
import CustomButton from "../CustomButton";
import IconSelect from "./IconSelect";
import styles from "./ProfilePictureSelector.module.css";

//icons from: https://www.flaticon.com/authors/roundicons/circle-flat
const ProfilePictureSelector = ({ close, getDetails }) => {
  const images = [
    "https://www.kindpng.com/picc/m/33-338711_circle-user-icon-blue-hd-png-download.png",
    "https://cdn-icons-png.flaticon.com/512/219/219969.png",
    "https://cdn-icons-png.flaticon.com/512/219/219986.png",
    "https://www.clipartkey.com/mpngs/m/102-1029067_student-flat-icon-www-pixshark-com-images-galleries.png",
    "https://truesun.in/wp-content/uploads/2021/08/62681-flat-icons-face-computer-design-avatar-icon.png",
    "https://cdn-icons-png.flaticon.com/512/219/219982.png",
    "https://cdn-icons-png.flaticon.com/512/190/190627.png",
    "https://cdn-icons-png.flaticon.com/512/190/190634.png",
    "https://cdn-icons-png.flaticon.com/512/196/196683.png",
    "https://cdn-icons-png.flaticon.com/512/196/196680.png",
    "https://cdn-icons-png.flaticon.com/512/196/196679.png",
    "https://cdn-icons-png.flaticon.com/512/196/196681.png",
    "https://cdn-icons-png.flaticon.com/512/196/196687.png",
    "https://cdn-icons-png.flaticon.com/512/196/196693.png",
    "https://cdn-icons-png.flaticon.com/512/196/196682.png",
    "https://cdn-icons-png.flaticon.com/512/194/194929.png",
    "https://cdn-icons-png.flaticon.com/512/194/194930.png",
    "https://cdn-icons-png.flaticon.com/512/194/194916.png",
    "https://cdn-icons-png.flaticon.com/512/194/194915.png",
  ];
  const [selectedIcon, setSelectedIcon] = useState();
  const [profilePictures, setProfilePictures] = useState([]);

  const getProfilePictures = async () => {
    const data = await getPurchasedProfilePictures();
    console.log(data);
    if (data.status === "success") {
      setProfilePictures(data.data);
    }
  };

  useEffect(async () => {
    await getProfilePictures();
  }, []);

  const iconSelected = (image) => {
    setSelectedIcon(image);
  };
  const updatePicture = async () => {
    if (selectedIcon != null) {
      console.log("Profile picture changed to: ", selectedIcon);
      const data = await updateProfilePicture({ ProfilePicture: selectedIcon });
      console.log(data);
      await getDetails();
      close();
    } else alert("Select a profile picture");
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h2>Select a profile picture</h2>
        <div className={styles.all_picture_container}>
          {profilePictures.map((image, i) => {
            console.log(image);
            return (
              <IconSelect
                image={image.Image}
                iconSelected={iconSelected}
                selected={selectedIcon === image.Image ? true : false}
                key={i}
              />
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <CustomButton text={"Confirm"} onClick={updatePicture} />
          <CustomButton text={"Get more"} onClick={updatePicture} />
          <CustomButton text={"Back"} type={2} onClick={close} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureSelector;
