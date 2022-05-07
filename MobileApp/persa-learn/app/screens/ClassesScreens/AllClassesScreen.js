import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  ActivityIndicator,
  FlatList,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useCallback, useContext } from "react";

import colors from "../../config/colors";
import ClassesItem from "../../components/Classes/ClassesItem";
import { getClassesByStudent } from "../../httpRequests/classRequests";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../../components/context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Requests from "../Classes/Requests";
import MyClasses from "./MyClasses";

const AllClassesScreen = () => {
  const ClassTabs = createMaterialTopTabNavigator();

  return (
    <ClassTabs.Navigator>
      <ClassTabs.Screen name="Requests" component={Requests} />
      <ClassTabs.Screen name="My Classes" component={MyClasses} />
    </ClassTabs.Navigator>
  );
};

export default AllClassesScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    borderColor: "red",
    borderWidth: 1,
    // backgroundColor: "orange",
    // justifyContent: "center",
  },
  content: {
    flex: 1,
    width: "100%",
    padding: 10,
  },
});
