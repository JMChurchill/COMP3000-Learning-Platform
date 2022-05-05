import { View, Text } from "react-native";
import React, { useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../../components/context";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ShopScreen from "../../screens/ShopScreen";

const ShopStack = createNativeStackNavigator();

const ShopStackScreen = () => {
  const { signOut } = useContext(AuthContext);

  // useEffect(async () => {
  //   // console.log(await SecureStore.getItemAsync("userToken"));
  //   if ((await SecureStore.getItemAsync("userToken")) === null) {
  //     signOut();
  //   }
  // });
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
