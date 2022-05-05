import { View, Text } from "react-native";
import React, { useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import * as SecureStore from "expo-secure-store";

import HomeStackScreen from "../stacks/HomeStackScreen";
import RevisionStackScreen from "../stacks/RevisionStackScreen";
import ShopStackScreen from "../stacks/ShopStackScreen";
import colors from "../../config/colors";
import TabTestScreen from "../../screens/TabTestScreen";
import ShopScreen from "../../screens/ShopScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import ProfileStackScreen from "../stacks/ProfileStackScreen";
import { AuthContext } from "../../components/context";

const Tab = createBottomTabNavigator();

const TabScreen = () => {
  const { signOut } = useContext(AuthContext);

  // useEffect(async () => {
  //   // console.log(await SecureStore.getItemAsync("userToken"));
  //   if ((await SecureStore.getItemAsync("userToken")) === null) {
  //     // console.log("no token");
  //     signOut();
  //   }
  // });
  return (
    // <NavigationContainer>
    // <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Revision") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Shop") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Test" component={TabTestScreen} />
      <Tab.Screen name="Shop" component={ShopStackScreen} />
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Revision" component={RevisionStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
    // {/* <Text>Navigation</Text> */}
    // </NavigationContainer>
  );
};

export default TabScreen;
