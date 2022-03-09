import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ShopScreen from "../../screens/ShopScreen";

const ShopStack = createNativeStackNavigator();

const ShopStackScreen = () => {
  return (
    // <NavigationContainer>
    <ShopStack.Navigator screenOptions={{ headerShown: false }}>
      <ShopStack.Screen name="ShopPage" component={ShopScreen} />
    </ShopStack.Navigator>

    // {/* <Text>Navigation</Text> */}
    // </NavigationContainer>
  );
};

export default ShopStackScreen;
