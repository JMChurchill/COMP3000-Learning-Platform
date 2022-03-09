import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import QuizScreen from "../../screens/QuizScreen";
import HomeScreen from "../../screens/HomeScreen";

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    // <NavigationContainer>
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="ProfilePage" component={HomeScreen} />
      <HomeStack.Screen name="Quiz" component={QuizScreen} />
    </HomeStack.Navigator>

    // {/* <Text>Navigation</Text> */}
    // </NavigationContainer>
  );
};

export default HomeStackScreen;
