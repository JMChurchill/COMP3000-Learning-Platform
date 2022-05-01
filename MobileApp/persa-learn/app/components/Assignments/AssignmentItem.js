import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import fonts from "../../config/fonts";
import colors from "../../config/colors";
import common from "../../config/common";

export default function AssignmentItem({ id, title, cName, dueDate }) {
  const navigation = useNavigation();

  const listItemOnPress = (id) => {
    // console.log("pressed ", id);
    navigation.navigate("Quiz", { quizID: id });
  };
  return (
    <TouchableOpacity
      style={[styles.listItem, common.shadow]}
      onPress={() => listItemOnPress(id)}
    >
      <View style={styles.largeCol}>
        <Text style={fonts.large} ellipsizeMode="tail" numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View style={styles.col}>
        <Text style={fonts.large} ellipsizeMode="tail" numberOfLines={1}>
          {cName}
        </Text>
      </View>
      <View style={styles.col}>
        <Text style={fonts.large} ellipsizeMode="tail" numberOfLines={1}>
          {dueDate ? new Date(dueDate).toLocaleDateString("en-GB") : ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: colors.cardBackground,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingHorizontal: "5%",
    borderRadius: common.containerBorderRadius,
  },
  largeCol: {
    width: "40%",
  },
  col: {
    width: "30%",
    paddingLeft: "2%",
  },
});
