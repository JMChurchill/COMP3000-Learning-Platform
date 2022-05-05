import { View, Text, ActivityIndicator } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

import React, { useState, useEffect, useMemo, useReducer } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import QuizScreen from "../screens/QuizScreen";
import HomeScreen from "../screens/HomeScreen";
import HomeStackScreen from "./stacks/HomeStackScreen";
import TabScreen from "./tabs/TabScreen";
import ShopScreen from "../screens/ShopScreen";
import colors from "../config/colors";
import { AuthContext } from "../components/context";
import { loginRequest } from "../httpRequests/loginRequests";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState("null");

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };

      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };

      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };

      case "REGISTER":
        return {
          ...prevState,
          userName: null,
          userToken: null,

          isLoading: false,
        };
    }
  };

  const authContext = useMemo(
    () => ({
      signIn: async (email, password) => {
        // setUserToken("gds");
        // setIsLoading(false);
        let userToken;
        userToken = null;
        try {
          const data = await loginRequest({ email, password });
          console.log(data);
          if (data !== null && data !== undefined) {
            const token = data.token;
            if (!token) {
              if (
                data.reason === "ENOTFOUND" ||
                data.reason === "ECONNREFUSED"
              ) {
                alert("could not connect to db");
                return;
              } else {
                alert("Email or Password incorrect");
                return;
              }
            }

            userToken = data.token;
            try {
              await SecureStore.setItemAsync("userToken", userToken);
            } catch (e) {
              console.log(e);
            }
          } else {
            console.log("No data returned");
          }
        } catch (e) {}
        dispatch({ type: "LOGIN", id: email, token: userToken });
      },
      signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
          // await AsyncStorage.removeItem("userToken");
          await SecureStore.deleteItemAsync("userToken");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: () => {
        setUserToken("gds");
        setIsLoading(false);
      },
    }),
    []
  );

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  useEffect(async () => {
    // setTimeout(async () => {
    let userToken;
    userToken = null;
    try {
      // userToken = await AsyncStorage.getItem("userToken");
      userToken = await SecureStore.getItemAsync("userToken");

      // alert(userToken);
    } catch (e) {
      console.log(e);
    }
    //setIsLoading(false);
    dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    // }, 5000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeTab" component={TabScreen} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </Stack.Navigator>
        )}
        {/* <Text>Navigation</Text> */}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default Navigation;
