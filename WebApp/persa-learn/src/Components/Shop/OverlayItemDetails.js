import React, { useState } from "react";
import { purchaseItem } from "../../http_Requests/StudentRequests/ItemPurchaseRequests";
import CustomButton from "../CustomButton";
import OverlayConfirm from "../OverlayConfirm";

import styles from "./OverlayItemDetails.module.css";

const OverlayItemDetails = ({ getItems, selectedItem, close }) => {
  const [isPoor, setIsPoor] = useState();
  const buyItem = async () => {
    // attempt to buy item
    const data = await purchaseItem({ ItemID: selectedItem.itemID });
    // console.log(data.results[0][0].Error);
    //not successful

    //not enough money
    if (data.results[0][0].Error == 400) {
      // console.log("Youre too poor");
      setIsPoor(true);
    }
    if (data.status === "success" && data.results[0][0].Error != 400) {
      //error

      // successful
      getItems();
      close();
    }
  };
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
        <p>{selectedItem.details}</p>
        <p>{selectedItem.cost} Coins</p>
        <CustomButton text={"Buy"} onClick={buyItem} />
        <CustomButton text={"Back"} type={2} onClick={close} />
      </div>
      {isPoor ? (
        <OverlayConfirm //TODO: fix
          message={"Sorry you don't have enough coins"}
          yes={() => setIsPoor(false)}
          type={2}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default OverlayItemDetails;
