import { StyleSheet, Text } from "react-native";

import fonts from "../config/fonts";
import colors from "../config/colors";

import Header from "../components/Feed/Header";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AssignmentsScreen from "./AssignmentsScreen";
import FeedScreen from "./HomeScreens/FeedScreen";
import ClassesScreen from "./ClassesScreen";

const HomeTabs = createMaterialTopTabNavigator();

export default function HomeScreen() {
  return (
    <>
      <Header />
      <Text style={[fonts.title, { alignSelf: "center" }]}>Students Name</Text>
      <HomeTabs.Navigator>
        <HomeTabs.Screen name="Assignments" component={AssignmentsScreen} />
        <HomeTabs.Screen name="Feed" component={FeedScreen} />
        <HomeTabs.Screen name="Classes" component={ClassesScreen} />
      </HomeTabs.Navigator>
    </>
  );
}

const styles = StyleSheet.create({});
