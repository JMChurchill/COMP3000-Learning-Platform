import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../config/colors";

export default function ProgressBar({ numerator = 0, denominator = 1 }) {
  let bWidth = 0;
  if (numerator !== null && denominator !== null && numerator <= denominator) {
    // calculate bar width
    bWidth = (numerator / denominator) * 100;
  }
  return (
    <View style={[styles.progressBar, styles.shadow]}>
      <View style={[styles.barFill, { width: `${bWidth}%` }]}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    // borderColor: colors.lightGrey,
    // borderWidth: 1,
    width: "100%",
    backgroundColor: colors.cardBackground,
    height: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  barFill: {
    height: "100%",
    // width: "20%",
    backgroundColor: colors.selectColor,
    borderRadius: 10,
  },
  shadow: {
    //android
    elevation: 5,
    //ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});
