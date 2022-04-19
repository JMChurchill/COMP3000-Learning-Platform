import React, { useState, useEffect } from "react";
import { getPurchasedBanners } from "../../http_Requests/StudentRequests/ItemRequests";
import { updateBanner } from "../../http_Requests/StudentRequests/StudentRequests";
import CustomButton from "../CustomButton";
import BannerSelect from "./BannerSelect";
import styles from "./BannerSelector.module.css";

const BannerSelector = ({ close, getDetails }) => {
  const images = [
    "https://cdn.pixabay.com/photo/2021/09/12/07/58/banner-6617553__340.jpg",
    "https://cdn.pixabay.com/photo/2017/03/31/16/11/banner-2191712_960_720.jpg",
    "https://cdn.pixabay.com/photo/2017/03/19/12/42/banner-2156395_960_720.jpg",
    "https://img.freepik.com/free-vector/space-banner-with-purple-planet-landscape_107791-6230.jpg?w=2000",
    "https://images.wallpaperscraft.com/image/single/stars_space_galaxy_117958_2560x1024.jpg",
  ];
  const [selectedBanner, setSelectedBanner] = useState();
  const [banners, setBanners] = useState([]);

  const getBanners = async () => {
    const data = await getPurchasedBanners();
    if (data.status === "success") {
      setBanners(data.data);
    }
  };
  useEffect(async () => {
    await getBanners();
  }, []);
  const updatePicture = async () => {
    if (selectedBanner != null) {
      const data = await updateBanner({ Banner: selectedBanner });
      await getDetails();
      close();
    } else alert("Select a banner");
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h2>Select a banner</h2>
        <div className={styles.all_picture_container}>
          {banners.map((banner, i) => (
            <BannerSelect
              image={banner.Image}
              bannerSelected={setSelectedBanner}
              selected={selectedBanner === banner.Image ? true : false}
              key={i}
            />
          ))}
        </div>
        <div className={styles.button_container}>
          <CustomButton text={"Confirm"} onClick={updatePicture} />
          <CustomButton text={"Back"} type={2} onClick={close} />
        </div>
      </div>
    </div>
  );
};

export default BannerSelector;
