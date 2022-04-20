import React, { useState, useEffect } from "react";
import BannerOverlay from "../Components/Shop/Overlays/BannerOverlay";
import ProfilePictureOverlay from "../Components/Shop/Overlays/ProfilePictureOverlay";
import ThemeOverlay from "../Components/Shop/Overlays/ThemeOverlay";
import ShopItem from "../Components/Shop/ShopItem";
import ThemeItem from "../Components/Shop/ThemeItem";
import {
  getAllBanners,
  getAllProfilePics,
  getAllThemes,
  getUnpurchasedItems,
} from "../http_Requests/StudentRequests/ItemRequests";
import styles from "./Shop.module.css";

//icons from: https://www.flaticon.com/authors/roundicons/circle-flat

const Shop = () => {
  const [allBanners, setAllBanners] = useState([]);
  const [allThemes, setAllThemes] = useState([]);
  const [allProfilePics, setAllProfilePics] = useState([]);

  const [selectedItem, setSelectedItem] = useState();
  const [isProfilePicSelected, setIsProfilePicSelected] = useState(false);
  const [isBannerSelected, setIsBannerSelected] = useState(false);
  const [isThemeSelected, setIsThemeSelected] = useState(false);

  const [selectedTab, setSelectedTab] = useState(0);
  const [tabs, setTabs] = useState([
    "All",
    "Profile Pictures",
    "Banners",
    "Themes",
  ]);

  const profilePicSelected = (item) => {
    setSelectedItem(item);
    setIsProfilePicSelected(true);
  };
  const bannerSelected = (item) => {
    setSelectedItem(item);
    setIsBannerSelected(true);
  };
  const themeSelected = (item) => {
    setSelectedItem(item);
    setIsThemeSelected(true);
  };
  const itemSelected = (item) => {
    setSelectedItem(item);
    // setIsSelected(true);
  };
  const getItems = async () => {
    let data = await getAllBanners();
    setAllBanners(data.data);
    data = await getAllThemes();
    console.log(data.data);
    setAllThemes(data.data);
    data = await getAllProfilePics();
    setAllProfilePics(data.data);
  };
  useEffect(async () => {
    await getItems();
  }, []);
  return (
    <div className="content-box">
      {/* <div className="container wide-container center-container"> */}
      <h1>Shop</h1>
      <div className={styles.container}>
        <div className={styles.tabs}>
          {tabs.map((tab, i) => {
            // highlight selected tab
            let isSelected = false;
            if (i === selectedTab) {
              isSelected = true;
            }
            return (
              <h3
                key={i}
                aria-selected={isSelected}
                onClick={() => setSelectedTab(i)}
              >
                {tab}
              </h3>
            );
          })}
        </div>

        <div className={styles.items_container}>
          {allProfilePics.length + allBanners.length + allThemes.length == 0 ? (
            <p>
              Looks like where out of stock... <br />
              Come back another time
            </p>
          ) : (
            allProfilePics.map((item) => (
              <ShopItem
                key={item.ProfilePictureID}
                itemID={item.ProfilePictureID}
                type={"Profile Picture"}
                name={item.Name}
                image={item.Image}
                details={item.Details}
                cost={item.Cost}
                requiredLevel={item.RequiredLevel}
                itemSelected={profilePicSelected}
                isPurchased={item.Caption == "Purchased"}
              />
            ))
          )}
          {allBanners.map((item) => (
            <ShopItem
              key={item.BannerID}
              itemID={item.BannerID}
              type={"Banner"}
              name={item.Name}
              image={item.Image}
              details={item.Details}
              cost={item.Cost}
              requiredLevel={item.RequiredLevel}
              itemSelected={bannerSelected}
              isPurchased={item.Caption == "Purchased"}
            />
          ))}
          {allThemes.map((item) => (
            <ThemeItem
              key={item.ThemeID}
              itemID={item.ThemeID}
              type={"Theme"}
              name={item.Name}
              image={item.Image}
              details={item.Details}
              cost={item.Cost}
              requiredLevel={item.RequiredLevel}
              primary={item.PrimaryColor}
              background={item.BackgroundColor}
              isDark={item.IsDark}
              itemSelected={themeSelected}
              isPurchased={item.Caption == "Purchased"}
            />
          ))}
        </div>
      </div>

      {isProfilePicSelected ? (
        <ProfilePictureOverlay
          getItems={getItems}
          selectedItem={selectedItem}
          close={() => setIsProfilePicSelected(false)}
        />
      ) : (
        <></>
      )}
      {isBannerSelected ? (
        <BannerOverlay
          selectedItem={selectedItem}
          close={() => setIsBannerSelected(false)}
          getItems={getItems}
        />
      ) : (
        <></>
      )}
      {isThemeSelected ? (
        <ThemeOverlay
          close={() => setIsThemeSelected(false)}
          getItems={getItems}
          selectedItem={selectedItem}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Shop;
