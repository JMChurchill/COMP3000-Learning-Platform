import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ShopScreen from "../../screens/ShopScreen";
import RevisionScreen from "../../screens/RevisionScreen";

const RevisionStack = createNativeStackNavigator();

const RevisionStackScreen = () => {
  return (
    // <NavigationContainer>
    <RevisionStack.Navigator screenOptions={{ headerShown: false }}>
      <RevisionStack.Screen name="Revision" component={RevisionScreen} />
    </RevisionStack.Navigator>

    // {/* <Text>Navigation</Text> */}
    // </NavigationContainer>
  );
};

export default RevisionStackScreen;
