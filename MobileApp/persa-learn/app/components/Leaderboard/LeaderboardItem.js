import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

import common from "../../config/common";
import fonts from "../../config/fonts";
import colors from "../../config/colors";

// import userIcon from "../../";
// import userIcon from "../../assets/UserIcons/001-man-1.png";

export default function LeaderboardItem({
  position,
  name,
  xp,
  level,
  userIcon,
}) {
  return (
    <View style={styles.studentContainer}>
      <View style={[styles.studentPostionContainer, common.shadow]}>
        <Text style={[fonts.h1, { transform: [{ scale: 1.3 }] }]}>
          {position}
        </Text>
      </View>
      <View style={[styles.studentDetailsContainer, common.shadow]}>
        <Image
          source={{
            uri: userIcon,
          }}
          // source={userIcon}
          style={styles.userIcon}
          resizeMode={"contain"}
        />
        <Text style={[fonts.h1, { marginVertical: 10 }]}>{name}</Text>
        <Text style={[fonts.h1, { marginVertical: 10 }]}>Lv{level}</Text>
        <Text style={[fonts.h1, { marginVertical: 10 }]}>{xp}xp</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  studentContainer: {
    flexDirection: "row",
    // borderWidth: 1,
    // borderColor: "pink",
    width: "100%",
    marginVertical: 10,
    justifyContent: "center",
    // overflow: "hidden",
  },
  studentPostionContainer: {
    // height: "80%",
    // borderWidth: 1,
    // borderColor: "green",
    borderRadius: 100,
    aspectRatio: 1,
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    justifyContent: "center",
    transform: [{ scale: 0.7 }],
  },
  studentDetailsContainer: {
    // borderWidth: 1,
    // borderColor: "orange",
    paddingVertical: 5,
    marginLeft: 5,
    flexDirection: "row",
    width: "85%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    borderRadius: common.containerBorderRadius,
  },
  userIcon: {
    height: "100%",
    width: 60,
  },
});
