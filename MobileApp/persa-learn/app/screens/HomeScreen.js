import { StyleSheet, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Header from "../components/Feed/Header";
import AssignmentsScreen from "./AssignmentsScreen";
import FeedScreen from "./HomeScreens/FeedScreen";
import ClassesScreen from "./ClassesScreen";

import fonts from "../config/fonts";
import colors from "../config/colors";

import UserIcon from "../assets/UserIcons/001-man-1.png";
import Banner from "../assets/Banners/banner-1.jpg";

const HomeTabs = createMaterialTopTabNavigator();

export default function HomeScreen() {
  const [name, setName] = useState();
  const [xp, setXp] = useState();
  useEffect(async () => {
    setName("john smith");
    setXp("3000");
  }, []);
  return (
    <>
      <Header icon={UserIcon} banner={Banner} xp={xp} />
      <Text style={[fonts.title, { alignSelf: "center" }]}>{name}</Text>
      <HomeTabs.Navigator>
        <HomeTabs.Screen name="Assignments" component={AssignmentsScreen} />
        <HomeTabs.Screen name="Feed" component={FeedScreen} />
        <HomeTabs.Screen name="Classes" component={ClassesScreen} />
      </HomeTabs.Navigator>
    </>
  );
}

const styles = StyleSheet.create({});
