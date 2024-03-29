import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

import fonts from "../config/fonts";
import Item from "../components/Shop/Item";
import colors from "../config/colors";
import common from "../config/common";
// import AuthContext from "../components/context";

import UserIcon from "../assets/UserIcons/001-man-1.png";
import Banner from "../assets/Banners/banner-1.jpg";
import DetailsOverlay from "../components/Shop/DetailsOverlay";
import {
  getBanners,
  getProfilePics,
  getThemes,
} from "../httpRequests/shopRequests";
import ThemeItem from "../components/Shop/ThemeItem";
import { detailsStudentRequest } from "../httpRequests/studentRequests";
import Header from "../components/Feed/Header";
import { AuthContext } from "../components/context";

export default function ShopScreen() {
  const { signOut } = useContext(AuthContext);

  const [selectedItem, setSelectedItem] = useState();
  const [showDetails, setShowDetails] = useState(false);

  const [xp, setXp] = useState();
  const [level, setLevel] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [coins, setCoins] = useState();
  const [email, setEmail] = useState();
  const [banner, setBanner] = useState();
  const [userIcon, setUserIcon] = useState();
  const [requiredXp, setRequiredXp] = useState();

  const [allBanners, setAllBanners] = useState([]);
  const [allThemes, setAllThemes] = useState([]);
  const [allProfilePics, setAllProfilePics] = useState([]);

  const getDetails = async () => {
    try {
      const data = await detailsStudentRequest();
      if (data.status === "success") {
        setFirstname(data.data.FirstName);
        setLastname(data.data.LastName);
        setEmail(data.data.Email);
        setLevel(data.data.Level);
        setXp(data.data.Xp);
        setRequiredXp(data.data.RequiredXp);
        setUserIcon(data.data.ProfilePicture);
        setBanner(data.data.Banner);
        setCoins(data.data.Coins);
      } else {
      }
    } catch (e) {}
  };

  const getItems = async () => {
    try {
      let data = await getBanners();
      if (data.status === "success") setAllBanners(data.data);
      data = await getThemes();
      console.log(data.data);
      if (data.status === "success") setAllThemes(data.data);
      data = await getProfilePics();
      if (data.status === "success") setAllProfilePics(data.data);
    } catch (e) {}
  };

  useEffect(async () => {
    await getItems();
    await getDetails();
    if ((await SecureStore.getItemAsync("userToken")) === null) {
      signOut();
    }
  }, []);
  return (
    <>
      <View style={styles.root}>
        <Header
          icon={userIcon}
          banner={banner}
          level={level}
          xp={xp}
          name={`${firstname} ${lastname}`}
          coins={coins}
          requiredXp={requiredXp}
        />
        {/* <View style={styles.header}>
          <View style={styles.userIconContainer}>
            <Image
              source={UserIcon}
              style={styles.userIcon}
              resizeMode={"contain"}
            />
          </View>
          <View style={styles.nameContainer}>
            <Text style={[fonts.h1, { color: colors.secondaryText }]}>
              Name
            </Text>
          </View>
          <View style={styles.coinsContainer}>
            <FontAwesome5
              name="coins"
              size={fonts.h1.fontSize + 10}
              color="gold"
            />
            <Text style={[fonts.h1, { color: colors.secondaryText }]}>100</Text>
          </View>
        </View> */}
        <Text style={fonts.title}>Shop</Text>
        <ScrollView>
          <View style={styles.itemContainer}>
            {allProfilePics.map((profilePic) => (
              <Item
                key={profilePic.ProfilePictureID}
                setSelectedItem={setSelectedItem}
                setShowDetails={setShowDetails}
                id={profilePic.ProfilePictureID}
                name={profilePic.Name}
                cost={profilePic.Cost}
                reqLevel={profilePic.RequiredLevel}
                image={profilePic.Image}
                isPurchased={profilePic.Caption === "Purchased" ? true : false}
              />
            ))}
            {allBanners.map((banner) => (
              <Item
                key={banner.BannerID}
                setSelectedItem={setSelectedItem}
                setShowDetails={setShowDetails}
                type={"banner"}
                id={banner.BannerID}
                name={banner.Name}
                cost={banner.Cost}
                reqLevel={banner.RequiredLevel}
                image={banner.Image}
                isPurchased={banner.Caption === "Purchased" ? true : false}
              />
            ))}
            {allThemes.map((theme) => (
              <ThemeItem
                key={theme.ThemeID}
                setSelectedItem={setSelectedItem}
                setShowDetails={setShowDetails}
                id={theme.ThemeID}
                name={theme.Name}
                primaryColor={theme.PrimaryColor}
                backgroundColor={theme.BackgroundColor}
                isDark={theme.IsDark}
                cost={theme.Cost}
                reqLevel={theme.RequiredLevel}
                isPurchased={theme.Caption === "Purchased" ? true : false}
              />
            ))}
          </View>
        </ScrollView>
      </View>
      {showDetails ? (
        <DetailsOverlay
          selectedItem={selectedItem}
          setShowDetails={setShowDetails}
          getItems={getItems}
          getDetails={getDetails}
        />
      ) : (
        <></>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
  },
  userIconContainer: {
    // borderWidth: 1,
    // borderColor: "red",
    width: "20%",
    aspectRatio: 1,
    borderRadius: 100,
    margin: 10,
    overflow: "hidden",
  },
  userIcon: {
    height: "100%",
    width: "100%",
  },
  nameContainer: {
    borderWidth: 1,
    width: "40%",
  },
  coinsContainer: {
    flexDirection: "row",
    width: "30%",
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: common.containerBorderRadius,
    justifyContent: "center",
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  itemContainer: {
    borderWidth: 1,
    width: "100%",
    flexDirection: "row",
    paddingVertical: 10,
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
});
