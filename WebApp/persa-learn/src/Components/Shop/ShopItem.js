import React from "react";
import styles from "./ShopItem.module.css";

const ShopItem = ({ type, image, name }) => {
  return (
    <div className={styles.item}>
      <p>{type}</p>
      <div className={styles.image}>
        <p>image</p>
      </div>
      <p>{name}</p>
    </div>
  );
};

export default ShopItem;
