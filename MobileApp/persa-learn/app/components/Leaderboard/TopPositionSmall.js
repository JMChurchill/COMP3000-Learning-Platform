import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

import colors from "../../config/colors";
import fonts from "../../config/fonts";

export default function TopPositionSmall({ position, image }) {
  return (
    <View
      style={[
        styles.topStudent,
        {
          borderColor: position === 2 ? "silver" : "#A15727",
          backgroundColor: position === 2 ? "silver" : "#A15727",
        },
      ]}
    >
      <Image
        source={{
          uri: image,
        }}
        style={styles.userIcon}
        resizeMode={"contain"}
      />
      <View style={styles.topPosition}>
        <View
          style={[
            styles.topPositionBox,
            { backgroundColor: position === 2 ? "silver" : "#A15727" },
          ]}
        >
          <Text style={[fonts.large, styles.topPositionText]}>{position}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topStudent: {
    borderWidth: 5,
    borderRadius: 100,
    width: "25%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userIcon: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  topPosition: {
    width: "100%",
    position: "absolute",
    alignItems: "center",
    bottom: 0,
    // right: 0,
    transform: [{ translateY: 20 }],
  },
  topPositionBox: {
    padding: 5,
    // paddingVertical: 10,
    borderRadius: 100,
    aspectRatio: 1,
    // minwidth: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  topPositionText: {
    fontWeight: "bold",
    color: colors.secondaryText,
  },
});
