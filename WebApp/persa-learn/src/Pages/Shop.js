import React from "react";
import ShopItem from "../Components/Shop/ShopItem";
import styles from "./Shop.module.css";

const Shop = () => {
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
          <ShopItem type={"Profile picture"} name={"alien"} />
          <ShopItem type={"Profile picture"} name={"Doctor"} />
          <ShopItem type={"Profile picture"} name={"Police"} />
          <ShopItem type={"Banner"} name={"Red/Black"} />
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Shop;
