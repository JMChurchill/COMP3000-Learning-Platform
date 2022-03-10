import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../../config/colors";
import common from "../../config/common";
import fonts from "../../config/fonts";

export default function Item({
  setSelectedItem,
  setShowDetails,
  name = "temp",
  cost = 0,
  image = "https://reactnative.dev/img/tiny_logo.png",
}) {
  const showItemDetails = () => {
    setSelectedItem({ name, cost, image });
    setShowDetails(true);
  };
  return (
    <TouchableOpacity
      style={[styles.itemContainer, common.shadow]}
      onPress={() => showItemDetails()}
    >
      <Image
        style={styles.tinyLogo}
        source={{
          uri: image,
        }}
      />
      <Text style={[fonts.h2, { color: colors.mainText }]}>{name}</Text>
      <Text style={fonts.h3}>{cost} coins</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    margin: 10,
    width: "40%",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    borderRadius: common.containerBorderRadius,
  },
  tinyLogo: {
    width: 120,
    height: 120,
  },
});
