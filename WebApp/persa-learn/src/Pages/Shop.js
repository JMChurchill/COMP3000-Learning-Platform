import React, { useState } from "react";
import OverlayItemDetails from "../Components/Shop/OverlayItemDetails";
import ShopItem from "../Components/Shop/ShopItem";
import styles from "./Shop.module.css";

const Shop = () => {
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
  const [isSelected, setIsSelected] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const itemSelected = (item) => {
    setSelectedItem(item);
    setIsSelected(true);
  };
  return (
    <div className="content-box">
      {/* <div className="container wide-container center-container"> */}
      <h1>Shop</h1>
      <div className={styles.container}>
        <div className={styles.items_container}>
          {/* <div className={styles.item}>
            <p>Type</p>
            <div className={styles.image}>
              <p>image</p>
            </div>
            <p>Item</p>
          </div> */}
          <ShopItem
            type={"Profile picture"}
            name={"alien"}
            image={images[9]}
            itemSelected={itemSelected}
          />
          <ShopItem
            type={"Profile picture"}
            name={"Doctor"}
            image={images[17]}
            itemSelected={itemSelected}
          />
          <ShopItem
            type={"Profile picture"}
            name={"Police"}
            image={images[6]}
            itemSelected={itemSelected}
          />
          <ShopItem
            type={"Banner"}
            name={"Red/Black"}
            itemSelected={itemSelected}
          />
          <ShopItem
            type={"Theme"}
            name={"Black/Blue"}
            primary={"black"}
            secondary={"#201d95"}
            itemSelected={itemSelected}
          />
          <ShopItem
            type={"Banner"}
            name={"Space"}
            itemSelected={itemSelected}
          />
          <ShopItem
            type={"Theme"}
            name={"Pink/White"}
            primary={"Pink"}
            secondary={"white"}
            itemSelected={itemSelected}
          />
        </div>
      </div>
      {isSelected ? (
        <OverlayItemDetails
          selectedItem={selectedItem}
          close={() => setIsSelected(false)}
        />
      ) : (
        <></>
      )}
    </div>
    // </div>
  );
};

export default Shop;
