import { View, Text } from "react-native";
import React, { useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../../components/context";

// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../../screens/ProfileScreen";
import UpdateDetails from "../../screens/ProfileScreens/UpdateDetails";
import ChangePasswordScreen from "../../screens/ProfileScreens/ChangePasswordScreen";
import ChangeProfilePicture from "../../screens/ProfileScreens/ChangeProfilePicture";
import ChangeBanner from "../../screens/ProfileScreens/ChangeBanner";

// import QuizScreen from "../../screens/QuizScreen";
// import HomeScreen from "../../screens/HomeScreen";
// import ClassLeaderboardScreen from "../../screens/ClassLeaderboardScreen";

const ProfileStack = createNativeStackNavigator();

const ProfileStackScreen = () => {
  const { signOut } = useContext(AuthContext);

  // useEffect(async () => {
  //   // console.log(await SecureStore.getItemAsync("userToken"));
  //   if ((await SecureStore.getItemAsync("userToken")) === null) {
  //     signOut();
  //   }
  // });
  return (
    // <NavigationContainer>
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileStack.Screen name="Update" component={UpdateDetails} />
      <ProfileStack.Screen name="UpdateProf" component={ChangeProfilePicture} />
      <ProfileStack.Screen name="UpdateBanner" component={ChangeBanner} />
      <ProfileStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
      />
      {/* <HomeStack.Screen name="Leaderboard" component={ClassLeaderboardScreen} /> */}
    </ProfileStack.Navigator>

    // {/* <Text>Navigation</Text> */}
    // </NavigationContainer>
  );
};

export default ProfileStackScreen;
