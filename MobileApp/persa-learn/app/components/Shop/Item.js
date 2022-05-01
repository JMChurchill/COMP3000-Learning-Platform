import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../../config/colors";
import common from "../../config/common";
import fonts from "../../config/fonts";

export default function Item({
  setSelectedItem,
  setShowDetails,
  id,
  name = "temp",
  cost = 0,
  reqLevel,
  image = "https://reactnative.dev/img/tiny_logo.png",
  isPurchased,
  type = "ProfilePic",
}) {
  const showItemDetails = () => {
    setSelectedItem({ type, id, name, cost, image, reqLevel });
    setShowDetails(true);
  };
  return (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        common.shadow,
        isPurchased ? { opacity: 0.5 } : {},
      ]}
      onPress={!isPurchased ? () => showItemDetails() : () => {}}
    >
      <Image
        style={styles.tinyLogo}
        source={{
          uri: image,
        }}
      />
      <Text style={[fonts.h2, { color: colors.mainText }]}>{name}</Text>
      <Text style={fonts.h3}>{cost} coins</Text>
      <Text style={fonts.h3}>Level {reqLevel}</Text>
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
