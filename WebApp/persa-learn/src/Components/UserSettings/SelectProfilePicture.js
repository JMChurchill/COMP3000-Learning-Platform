import React, { useState } from "react";
import { updateProfilePicture } from "../../http_Requests/StudentRequests/StudentRequests";
import CustomButton from "../CustomButton";
import IconSelect from "./IconSelect";
import styles from "./SelectProfilePicture.module.css";

//icons from: https://www.flaticon.com/authors/roundicons/circle-flat
const SelectProfilePicture = ({ close, getDetails }) => {
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
  const [profileImages, setProfileImages] = useState(images);

  const iconSelected = (image) => {
    setSelectedIcon(image);
    setProfileImages(images);
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
          {profileImages.map((image, i) => (
            <IconSelect
              image={image}
              iconSelected={iconSelected}
              selected={selectedIcon === image ? true : false}
              key={i}
            />
          ))}
        </div>
        <div>
          <CustomButton text={"Confirm"} onClick={updatePicture} />
          <CustomButton text={"Back"} type={2} onClick={close} />
        </div>
      </div>
    </div>
  );
};

export default SelectProfilePicture;
