import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";

import fonts from "../../config/fonts";
import colors from "../../config/colors";
import common from "../../config/common";

export default function ClassesItem({ id, name, teacher }) {
  const navigation = useNavigation();

  const listItemOnPress = (id) => {
    navigation.navigate("Leaderboard", { classID: id });
  };
  return (
    <TouchableOpacity
      style={[styles.listItem, common.shadow]}
      onPress={() => listItemOnPress(id)}
    >
      {/* <Text style={fonts.large}>{id}.</Text> */}
      <View style={styles.col}>
        <Text style={fonts.large}>{name}</Text>
      </View>
      <View style={[styles.col, { paddingLeft: "2%" }]}>
        <Text style={fonts.large}>{teacher}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: colors.cardBackground,
    marginVertical: 5,
    flexDirection: "row",
    // justifyContent: "space-evenly",
    paddingVertical: 10,
    paddingHorizontal: "5%",
    borderRadius: common.containerBorderRadius,
  },
  col: {
    width: "45%",
  },
});
