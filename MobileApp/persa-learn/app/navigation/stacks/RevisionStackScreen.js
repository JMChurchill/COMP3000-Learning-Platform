import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ShopScreen from "../../screens/ShopScreen";
import RevisionScreen from "../../screens/RevisionScreen";
import NotebookScreen from "../../screens/revision/NotebookScreen";
import FlashCardsScreen from "../../screens/revision/FlashCard/FlashCardsScreen";
import FlashCardPlay from "../../screens/revision/FlashCard/FlashCardPlay";
import FlashCardCreate from "../../screens/revision/FlashCard/FlashCardCreate";

const RevisionStack = createNativeStackNavigator();

const RevisionStackScreen = () => {
  return (
    // <NavigationContainer>
    <RevisionStack.Navigator screenOptions={{ headerShown: false }}>
      <RevisionStack.Screen name="RevisionPage" component={RevisionScreen} />
      <RevisionStack.Screen name="FlashCards" component={FlashCardsScreen} />
      <RevisionStack.Screen name="FlashCardPlay" component={FlashCardPlay} />
      <RevisionStack.Screen
        name="FlashCardCreate"
        component={FlashCardCreate}
      />
      <RevisionStack.Screen name="Notebook" component={NotebookScreen} />
    </RevisionStack.Navigator>

    // {/* <Text>Navigation</Text> */}
    // </NavigationContainer>
  );
};

export default RevisionStackScreen;
