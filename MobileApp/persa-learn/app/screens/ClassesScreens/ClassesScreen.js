import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { getClassesByStudent } from "../../httpRequests/classRequests";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../../components/context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AllClassesScreen from "./AllClassesScreen";
import Requests from "../Classes/Requests";

const ClassTabs = createMaterialTopTabNavigator();

const ClassesScreen = () => {
  const { signOut } = useContext(AuthContext);

  const [classes, setClasses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(async () => {
    await getData();
    if ((await SecureStore.getItemAsync("userToken")) === null) {
      signOut();
    }
  }, []);

  const getData = async () => {
    try {
      setRefreshing(true);
      const data = await getClassesByStudent();
      if (data.status === "success") {
        setClasses(data.data);
      }
      setRefreshing(false);
    } catch (e) {}
  };

  const onRefresh = useCallback(async () => {
    await getData();
  }, []);

  return (
    <ClassTabs.Navigator>
      <ClassTabs.Screen name="Requests" component={Requests} />
      <ClassTabs.Screen name="Classes" component={AllClassesScreen} />
      {/* <HomeTabs.Screen name="Classes" component={ClassesScreen} /> */}
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
