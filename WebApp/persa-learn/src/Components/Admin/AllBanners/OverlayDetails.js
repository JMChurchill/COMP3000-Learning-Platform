import React, { useState } from "react";
import { deleteBannerAdmin } from "../../../http_Requests/StudentRequests/ItemRequests";
import CustomButton from "../../CustomButton";
import styles from "./OverlayDetails.module.css";
import OverlayEdit from "./OverlayEdit";

const OverlayDetails = ({ selectedBanner, getAllBanners, close }) => {
  const [showEdit, setShowEdit] = useState();
  const deleteBanner = async () => {
    const data = await deleteBannerAdmin();
    console.log(data);
    getAllBanners();
    close();
  };
  //   console.log(selectedBanner);
  return (
    <div className={styles.overlay}>
      <div className={styles.message_box}>
        <div
          className={styles.image}
          style={{
            backgroundImage: `url(${selectedBanner.image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <h1>{selectedBanner.name}</h1>
        <p>{selectedBanner.details}</p>
        <p>cost: {selectedBanner.cost}</p>
        <p>Required Level: {selectedBanner.requiredLevel}</p>
        <CustomButton text={"Edit"} onClick={() => setShowEdit(true)} />
        <CustomButton text={"Delete"} onClick={deleteBanner} />
        <CustomButton text={"Back"} type={2} onClick={close} />
      </div>
      {showEdit ? (
        <OverlayEdit
          ThemeID={selectedBanner.id}
          getAllBanners={() => {
            getAllBanners();
            setShowEdit(false);
            close();
          }}
          close={() => setShowEdit(false)}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default OverlayDetails;
