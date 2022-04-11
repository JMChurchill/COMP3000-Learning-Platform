import React from "react";
import styles from "./ShopItem.module.css";

const ShopItem = ({
  type,
  image,
  name,
  coins = 0,
  primary = "black",
  secondary = "white",
  itemSelected,
}) => {
  return (
    <div
      className={styles.item}
      onClick={() => itemSelected({ type, image, name, coins })}
    >
      <p>{type}</p>
      <div
        className={styles.image}
        style={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {type === "Theme" ? (
          <div
            className={styles.outer_color}
            style={{ backgroundColor: secondary }}
          >
            <div
              className={styles.inner_color}
              style={{ backgroundColor: primary }}
            ></div>
          </div>
        ) : (
          <></>
        )}
        <p>Select</p>
      </div>
      <p>{name}</p>
      <p>{coins} coins</p>
    </div>
  );
};

export default ShopItem;
