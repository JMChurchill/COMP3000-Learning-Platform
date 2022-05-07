import { StyleSheet, Text } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Header from "../components/Feed/Header";
import AssignmentsScreen from "./AssignmentsScreen";
import FeedScreen from "./HomeScreens/FeedScreen";
import * as SecureStore from "expo-secure-store";

import fonts from "../config/fonts";
import colors from "../config/colors";

import UserIcon from "../assets/UserIcons/001-man-1.png";
import Banner from "../assets/Banners/banner-1.jpg";
import { detailsStudentRequest } from "../httpRequests/studentRequests";
import { useIsFocused } from "@react-navigation/native";
import { AuthContext } from "../components/context";
import AllClassesScreen from "./ClassesScreens/AllClassesScreen";

const HomeTabs = createMaterialTopTabNavigator();

export default function HomeScreen() {
  // const { signOut } = useContext(AuthContext);

  const [xp, setXp] = useState();
  const [level, setLevel] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [coins, setCoins] = useState();
  const [email, setEmail] = useState();
  const [banner, setBanner] = useState();
  const [userIcon, setUserIcon] = useState();
  const [requiredXp, setRequiredXp] = useState();
  // useEffect(async () => {
  //   setName("john smith");
  //   setXp("3000");
  //   setCoins(200);
  // }, []);
  const isFocused = useIsFocused();

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
        // alert("Unable to get details");
      }
    } catch (e) {}
  };
  useEffect(async () => {
    await getDetails();
    // if ((await SecureStore.getItemAsync("userToken")) === null) {
    //   signOut();
    // }
  }, [isFocused]);
  return (
    <>
      <Header
        icon={userIcon}
        banner={banner}
        level={level}
        xp={xp}
        name={`${firstname} ${lastname}`}
        coins={coins}
        requiredXp={requiredXp}
      />
      {/* <Text style={[fonts.title, { alignSelf: "center" }]}>{name}</Text> */}
      <HomeTabs.Navigator>
        <HomeTabs.Screen name="Assignments" component={AssignmentsScreen} />
        <HomeTabs.Screen name="Feed" component={FeedScreen} />
        {/* <HomeTabs.Screen name="Classes" component={AllClassesScreen} /> */}
        {/* <HomeTabs.Screen name="Classes" component={ClassesScreen} /> */}
      </HomeTabs.Navigator>
    </>
  );
}

const styles = StyleSheet.create({});
