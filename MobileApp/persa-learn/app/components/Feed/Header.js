import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";

// import UserIcon from "../../assets/UserIcons/001-man-1.png";
// import Banner from "../../assets/Banners/banner-1.jpg";

import colors from "../../config/colors";
import common from "../../config/common";

// import UserIcon from "../assets/UserIcons/001-man-1.png";

export default function Header({ icon, banner, xp }) {
  const { height } = useWindowDimensions();

  return (
    <View style={[styles.container]}>
      <View style={[styles.userIconContainer]}>
        <Image
          source={icon}
          style={{ height: height * 0.15 }}
          resizeMode={"contain"}
        />
        <Text style={[styles.xp, common.shadow]}>Lv10</Text>
      </View>
      <Image
        source={banner}
        style={[styles.banner, { height: height * 0.2 }]}
        resizeMode={"contain"}
      />
      <View style={[styles.progressBar]}>
        <View style={[styles.barFill, { width: `20%` }]}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  userIconContainer: {
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
  },

  progressBar: {
    // borderColor: colors.lightGrey,
    // borderWidth: 1,
    width: "100%",
    // width: 500,
    backgroundColor: colors.cardBackground,
    height: 20,
    borderRadius: 10,
    marginTop: 10,
    position: "absolute",
    bottom: 15,
  },
  barFill: {
    height: "100%",
    // width: "20%",
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
});
