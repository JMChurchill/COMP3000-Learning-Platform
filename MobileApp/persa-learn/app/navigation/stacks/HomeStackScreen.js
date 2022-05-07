import { View, Text } from "react-native";
import React, { useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import QuizScreen from "../../screens/QuizScreen";
import HomeScreen from "../../screens/HomeScreen";
// import ClassLeaderboardScreen from "../../screens/ClassLeaderboardScreen";
import { AuthContext } from "../../components/context";

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  const { signOut } = useContext(AuthContext);

  // useEffect(async () => {
  //   // console.log(await SecureStore.getItemAsync("userToken"));
  //   if ((await SecureStore.getItemAsync("userToken")) === null) {
  //     signOut();
  //   }
  // });
  return (
    // <NavigationContainer>
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="ProfilePage" component={HomeScreen} />
      <HomeStack.Screen name="Quiz" component={QuizScreen} />
      {/* <HomeStack.Screen name="Leaderboard" component={ClassLeaderboardScreen} /> */}
    </HomeStack.Navigator>

    // {/* <Text>Navigation</Text> */}
    // </NavigationContainer>
  );
};

export default HomeStackScreen;
