import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeStackScreen from "../stacks/HomeStackScreen";
import RevisionStackScreen from "../stacks/RevisionStackScreen";
import ShopStackScreen from "../stacks/ShopStackScreen";

const Tab = createBottomTabNavigator();

const TabScreen = () => {
  return (
    // <NavigationContainer>
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeStack" component={HomeStackScreen} />
      <Tab.Screen name="ShopStack" component={ShopStackScreen} />
      <Tab.Screen name="RevisionStack" component={RevisionStackScreen} />
    </Tab.Navigator>
    // {/* <Text>Navigation</Text> */}
    // </NavigationContainer>
  );
};

export default TabScreen;
