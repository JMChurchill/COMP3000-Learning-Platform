import React from "react";
import CustomButton from "../CustomButton";

import styles from "./OverlayItemDetails.module.css";

const OverlayItemDetails = ({
  selectedItem,
  type,
  image,
  name,
  coins,
  close,
}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.message_box}>
        <h2>{selectedItem.type}</h2>
        <div
          className={styles.image}
          style={{
            backgroundImage: `url(${selectedItem.image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* {selectedItem.image} */}
        </div>
        <p>{selectedItem.name}</p>
        <p>{selectedItem.Coins}</p>
        <CustomButton text={"Buy"} />
        <CustomButton text={"Back"} type={2} onClick={close} />
      </div>
    </div>
  );
};

export default OverlayItemDetails;
