import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeStackScreen from "../stacks/HomeStackScreen";
import RevisionStackScreen from "../stacks/RevisionStackScreen";
import ShopStackScreen from "../stacks/ShopStackScreen";
import colors from "../../config/colors";

const Tab = createBottomTabNavigator();

const TabScreen = () => {
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
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Shop" component={ShopStackScreen} />
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Revision" component={RevisionStackScreen} />
    </Tab.Navigator>
    // {/* <Text>Navigation</Text> */}
    // </NavigationContainer>
  );
};

export default TabScreen;
