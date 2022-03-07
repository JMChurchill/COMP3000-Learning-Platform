import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../config/colors";

export default function ProgressBar({ numAns = 0, numQues = 1 }) {
  let bWidth = 0;
  if (numAns !== null && numQues !== null && numAns <= numQues) {
    // calculate bar width
    bWidth = (numAns / numQues) * 100;
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
