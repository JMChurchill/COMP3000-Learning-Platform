import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import colors from "../../../config/colors";
import common from "../../../config/common";

const Item = ({ id, name, image, isSelected, setSelectedPic }) => {
  return (
    <TouchableOpacity
      style={[styles.container, isSelected ? { borderColor: "green" } : {}]}
      onPress={() => {
        setSelectedPic({ id: id, image: image });
      }}
    >
      <Image source={{ uri: image }} style={styles.image} />
      <Text>{name}</Text>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.cardBackground,
    borderColor: colors.cardBackground,
    borderWidth: 1,
    width: "100%",
    margin: 5,
    padding: 10,
    // marginVertical: 10,
    borderRadius: common.borderRadius,
  },
  image: {
    width: "100%",
    aspectRatio: 3 / 1,
  },
});
