import { Text, StyleSheet, View, Alert } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import CustomButton from "../components/CustomButton/CustomButton";

import { AuthContext } from "../components/context";
import * as SecureStore from "expo-secure-store";

import UserIcon from "../assets/UserIcons/001-man-1.png";
import Banner from "../assets/Banners/banner-1.jpg";
import Header from "../components/Feed/Header";
import fonts from "../config/fonts";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  deleteStudentRequest,
  detailsStudentRequest,
} from "../httpRequests/studentRequests";
import { set } from "react-hook-form";

export default function ProfileScreen() {
  const { signOut } = useContext(AuthContext);

  const [xp, setXp] = useState();
  const [level, setLevel] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [coins, setCoins] = useState();
  const [email, setEmail] = useState();
  const [banner, setBanner] = useState();
  const [userIcon, setUserIcon] = useState();
  const [requiredXp, setRequiredXp] = useState();

  const isFocused = useIsFocused();

  const navigation = useNavigation();

  const getDetails = async () => {
    try {
      const data = await detailsStudentRequest();
      if (data.status === "success") {
        setFirstname(data.data.FirstName);
        setLastname(data.data.LastName);
        setEmail(data.data.Email);
        setLevel(data.data.Level);
        setXp(data.data.Xp);
        setRequiredXp(data.data.RequiredXp);
        setUserIcon(data.data.ProfilePicture);
        setBanner(data.data.Banner);
        setCoins(data.data.Coins);
      } else {
      }
    } catch (e) {}
  };

  const deleteAccount = async () => {
    console.log("deleting");
    try {
      const data = await deleteStudentRequest();
      console.log(data);
      if (data.status === "success") {
        signOut();
      } else {
        alert("Unable to delete account");
      }
    } catch (e) {}
  };

  useEffect(async () => {
    await getDetails();
    if ((await SecureStore.getItemAsync("userToken")) === null) {
      signOut();
    }
  }, [isFocused]);
  return (
    <View style={styles.root}>
      <Header
        icon={userIcon}
        banner={banner}
        level={level}
        xp={xp}
        name={`${firstname} ${lastname}`}
        coins={coins}
        requiredXp={requiredXp}
      />
      <View style={styles.container}>
        <Text style={fonts.h2}>Email: {email}</Text>

        <CustomButton
          text={"Update Details"}
          onPress={() =>
            navigation.navigate("Update", { email, firstname, lastname })
          }
        />
        <CustomButton
          text={"Change Profile Picture"}
          type={"SECONDARY"}
          onPress={() => navigation.navigate("UpdateProf")}
        />
        <CustomButton
          text={"Change Banner"}
          type={"SECONDARY"}
          onPress={() => navigation.navigate("UpdateBanner")}
        />
        <CustomButton
          text={"Change Password"}
          type={"SECONDARY"}
          onPress={() => navigation.navigate("ChangePassword")}
        />
        <CustomButton text={"Logout"} onPress={signOut} />
        <CustomButton
          text={"Delete account"}
          type={"SECONDARY"}
          onPress={() =>
            Alert.alert(
              "Warning",
              "Are You sure you want to delete your account",
              [
                {
                  text: "No",
                  style: "cancel",
                },
                { text: "Yes", onPress: deleteAccount },
              ]
            )
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    // alignItems: "center",
  },
  container: {
    alignItems: "center",
    paddingHorizontal: 40,
    width: "100%",
    // padding: 40,
  },
});
