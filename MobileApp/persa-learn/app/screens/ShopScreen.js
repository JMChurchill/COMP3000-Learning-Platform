import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

import fonts from "../config/fonts";
import Item from "../components/Shop/Item";
import colors from "../config/colors";
import common from "../config/common";

import UserIcon from "../assets/UserIcons/001-man-1.png";
import Banner from "../assets/Banners/banner-1.jpg";

export default function ShopScreen() {
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.userIconContainer}>
          <Image
            source={UserIcon}
            style={styles.userIcon}
            resizeMode={"contain"}
          />
        </View>
        <View style={styles.nameContainer}>
          <Text style={[fonts.h1, { color: colors.secondaryText }]}>Name</Text>
        </View>
        <View style={styles.coinsContainer}>
          {/* icon goes here */}
          <FontAwesome5
            name="coins"
            size={fonts.h1.fontSize + 10}
            color="gold"
          />
          <Text style={[fonts.h1, { color: colors.secondaryText }]}>100</Text>
        </View>
      </View>
      <Text style={fonts.title}>Shop</Text>
      <View style={styles.itemContainer}>
        <Item />
        <Item />
        <Item />
        <Item />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    backgroundColor: "orange",
    width: "100%",
    minHeight: "10%",
    flexDirection: "row",
    alignItems: "baseline",
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
