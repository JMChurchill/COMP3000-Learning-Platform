import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import QuizScreen from "../screens/QuizScreen";
import HomeScreen from "../screens/HomeScreen";
import HomeStackScreen from "./stacks/HomeStackScreen";
import TabScreen from "./tabs/TabScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="HomeTab" component={TabScreen} />
        {/* <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} /> */}
      </Stack.Navigator>
      {/* <Text>Navigation</Text> */}
    </NavigationContainer>
  );
};

export default Navigation;
