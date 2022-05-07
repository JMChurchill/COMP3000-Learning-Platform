import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllClassesScreen from "../../screens/ClassesScreens/AllClassesScreen";
import ClassLeaderboardScreen from "../../screens/ClassLeaderboardScreen";

const ClassStack = createNativeStackNavigator();

const ClassesStackScreen = () => {
  return (
    <ClassStack.Navigator screenOptions={{ headerShown: false }}>
      <ClassStack.Screen name="Classes" component={AllClassesScreen} />
      <ClassStack.Screen
        name="Leaderboard"
        component={ClassLeaderboardScreen}
      />
    </ClassStack.Navigator>
  );
};

export default ClassesStackScreen;

const styles = StyleSheet.create({});
