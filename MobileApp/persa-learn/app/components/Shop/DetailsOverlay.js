import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import common from "../../config/common";
import fonts from "../../config/fonts";

import { FontAwesome5 } from "@expo/vector-icons";

import CustomButton from "../CustomButton/CustomButton";

export default function DetailsOverlay({ selectedItem, setShowDetails }) {
  const buyPressed = () => {
    console.warn(`bought: ${selectedItem.name}`);
    setShowDetails(false);
  };
  const backPressed = () => {
    setShowDetails(false);
  };
  return (
    <View style={styles.overlay}>
      <View style={[styles.overlayWindow, common.shadow]}>
        <Text style={fonts.title}>{selectedItem.name}</Text>
        <Image
          style={styles.image}
          source={{
            uri: selectedItem.image,
          }}
          resizeMode="contain"
        />
        <Text style={[fonts.h1, { padding: 20 }]}>
          <FontAwesome5
            name="coins"
            size={fonts.h1.fontSize + 10}
            color="gold"
          />{" "}
          {selectedItem.cost}
        </Text>

        <CustomButton
          // style={{ marginHorizontal: 10 }}
          text="Buy"
          onPress={buyPressed}
        />
        <CustomButton
          // style={{ marginHorizontal: 10 }}
          text="Go Back"
          type="SECONDARY"
          onPress={backPressed}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    flex: 1,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999999999,
    elevation: 5,
  },
  overlayWindow: {
    width: "90%",
    minHeight: "20%",
    padding: 20,
    backgroundColor: "#fff",
    opacity: 1.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: common.containerBorderRadius,
  },
  image: {
    // height: "40%",
    width: "50%",
    aspectRatio: 1,
  },
});
