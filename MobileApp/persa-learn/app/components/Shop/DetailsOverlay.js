import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import common from "../../config/common";
import fonts from "../../config/fonts";

import { FontAwesome5 } from "@expo/vector-icons";

import CustomButton from "../CustomButton/CustomButton";
import {
  purchaseBanner,
  purchaseProfilePic,
  purchaseTheme,
} from "../../httpRequests/shopRequests";

export default function DetailsOverlay({
  selectedItem,
  setShowDetails,
  getItems,
  getDetails,
}) {
  // console.log(selectedItem.id);
  const buyPressed = async () => {
    if (selectedItem.type === "theme") {
      await purchaseT();
    } else if (selectedItem.type === "banner") {
      await puchaseB();
    } else if (selectedItem.type === "ProfilePic") {
      await purchaseProfPic();
    } else {
    }
    // setShowDetails(false);
  };
  const backPressed = () => {
    setShowDetails(false);
  };
  const purchaseProfPic = async () => {
    const data = await purchaseProfilePic({
      ProfilePictureID: selectedItem.id,
    });
    console.log(data);
    //not successful
    // console.log(Array.isArray(data.results));
    if (Array.isArray(data.results)) {
      //not enough money
      if (data.results[0][0].hasOwnProperty("Error")) {
        alert("Not enough coins or too low Level");
      }
    } else if (data.status === "success") {
      // successful
      getItems();
      getDetails();
      setShowDetails(false);
    }
  };

  const puchaseB = async () => {
    // attempt to buy item
    const data = await purchaseBanner({
      BannerID: selectedItem.id,
    });
    // const data = {};
    console.log(data);
    //not successful
    console.log(Array.isArray(data.results));
    if (Array.isArray(data.results)) {
      //not enough money
      if (data.results[0][0].hasOwnProperty("Error")) {
        // console.log("Youre too poor");
        alert("Not enough coins or too low Level");
      }
    } else if (data.status === "success") {
      // successful
      getItems();
      getDetails();
      setShowDetails(false);
    }
  };
  const purchaseT = async () => {
    // attempt to buy item
    const data = await purchaseTheme({
      ThemeID: selectedItem.id,
    });
    // const data = {};
    console.log(data);
    //not successful
    if (Array.isArray(data.results)) {
      //not enough money
      if (data.results[0][0].hasOwnProperty("Error")) {
        // console.log("Youre too poor");
        alert("Not enough coins or too low Level");
      }
    } else if (data.status === "success") {
      // successful
      getItems();
      getDetails();
      setShowDetails(false);
    }
  };
  return (
    <View style={styles.overlay}>
      <View style={[styles.overlayWindow, common.shadow]}>
        <Text style={fonts.title}>{selectedItem.type}</Text>
        <Text style={fonts.h1}>{selectedItem.name}</Text>
        {selectedItem.type != "theme" ? (
          <Image
            style={styles.image}
            source={{
              uri: selectedItem.image,
            }}
            resizeMode="contain"
          />
        ) : (
          <View
            style={[
              styles.primaryColor,
              { backgroundColor: selectedItem.primaryColor },
            ]}
          >
            <View
              style={[
                styles.backgroundColor,
                { backgroundColor: selectedItem.backgroundColor },
              ]}
            >
              <Text
                style={[
                  fonts.h2,
                  selectedItem.isDark == "true" || selectedItem.isDark == true
                    ? { color: "white" }
                    : { color: "black" },
                ]}
              >
                abc
              </Text>
            </View>
          </View>
        )}

        <Text style={[fonts.h1, { padding: 10 }]}>
          Required Level: {selectedItem.reqLevel}
        </Text>
        <Text style={[fonts.h1, { padding: 10 }]}>
          <FontAwesome5
            name="coins"
            size={fonts.h1.fontSize + 10}
            color="gold"
          />
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
  primaryColor: {
    width: "50%",
    // height: 120,
    aspectRatio: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 1000,
  },
  backgroundColor: {
    width: "80%",
    height: "80%",
    borderRadius: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
