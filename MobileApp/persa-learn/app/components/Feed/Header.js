import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

// import UserIcon from "../../assets/UserIcons/001-man-1.png";
// import Banner from "../../assets/Banners/banner-1.jpg";

import colors from "../../config/colors";
import common from "../../config/common";
import fonts from "../../config/fonts";

// import UserIcon from "../assets/UserIcons/001-man-1.png";

export default function Header({
  icon,
  banner,
  xp,
  requiredXp,
  level,
  name,
  coins,
}) {
  const { height } = useWindowDimensions();

  const calcWidth = () => {
    if (xp == null || requiredXp == null || requiredXp == 0) return 100;

    const width = (xp / requiredXp) * 100;

    if (width > 100) return 100;

    return (xp / requiredXp) * 100;
  };

  // return <></>;
  // alert(icon);
  return (
    <>
      <View style={[styles.container]}>
        <View style={[styles.userIconContainer]}>
          <Image
            // source={icon}
            source={{
              uri: icon,
            }}
            style={{ height: height * 0.15, width: 100 }}
            resizeMode={"contain"}
          />
          <Text style={[styles.xp, common.shadow]}>Lv{level}</Text>
        </View>
        <Image
          // source={banner}
          source={{
            uri: banner,
          }}
          style={[styles.banner, { height: height * 0.2, width: "100%" }]}
          resizeMode={"cover"}
        />
        <View style={styles.coinsContainer}>
          <FontAwesome5 name="coins" size={fonts.h3.fontSize} color="gold" />
          <Text style={styles.coinsText}>{coins}</Text>
        </View>
        <View style={[styles.progressBar]}>
          <View style={[styles.barFill, { width: `${calcWidth()}%` }]}></View>
        </View>
      </View>
      <Text style={[fonts.title, { alignSelf: "center", margin: 0 }]}>
        {name}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    // position: "relative",
    width: "100%",
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
  coinsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 0,
    bottom: 40,
    padding: 10,
    margin: 5,
    borderRadius: common.borderRadius,
    backgroundColor: colors.primary,
  },
  coinsText: {
    color: "white",
    marginLeft: 5,
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
