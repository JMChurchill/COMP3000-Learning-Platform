import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "./HomeScreen";
import ShopScreen from "./ShopScreen";

import fonts from "../config/fonts";
import colors from "../config/colors";

import UserIcon from "../assets/UserIcons/001-man-1.png";
import Banner from "../assets/Banners/banner-1.jpg";
import ClassesScreen from "./ClassesScreen";

const HomeTabs = createMaterialTopTabNavigator();

export default function TabTestScreen() {
  const { height } = useWindowDimensions();

  return (
    <>
      <View style={[styles.container]}>
        <View style={[styles.userIconContainer]}>
          <Image
            source={UserIcon}
            style={{ height: height * 0.15 }}
            resizeMode={"contain"}
          />
          <Text style={styles.xp}>Lv10</Text>
        </View>
        <Image
          source={Banner}
          style={[styles.banner, { height: height * 0.2 }]}
          resizeMode={"contain"}
        />
      </View>
      <Text style={[fonts.title, { alignSelf: "center" }]}>Students Name</Text>
      <HomeTabs.Navigator>
        <HomeTabs.Screen name="Homes" component={HomeScreen} />
        <HomeTabs.Screen name="Classes" component={ClassesScreen} />
      </HomeTabs.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderColor: "red",
    borderWidth: 1,
    // backgroundColor: "orange",
    // justifyContent: "center",
  },
  userIconContainer: {
    // alignSelf: "flex-start",
    // position: "absolute",
    // width: 100,
    // height: 100,
    // borderColor: "blue",
    // borderWidth: 1,
    alignItems: "center",
    zIndex: 1,
    marginTop: 40,
  },
  banner: {
    position: "absolute",
    zIndex: 0,
  },
  xp: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 18,
    fontWeight: "bold",
    transform: [{ translateY: -10 }],
    //shadow
    //android
    elevation: 5,
    //ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});
