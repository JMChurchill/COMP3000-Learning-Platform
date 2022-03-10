import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ShopScreen from "../../screens/ShopScreen";
import RevisionScreen from "../../screens/RevisionScreen";
import NotebookScreen from "../../screens/revision/NotebookScreen";
import FlashCardsScreen from "../../screens/revision/FlashCard/FlashCardsScreen";
import FlashCardCreateScreen from "../../screens/revision/FlashCard/FlashCardCreateScreen";
import FlashCardPlayScreen from "../../screens/revision/FlashCard/FlashCardPlayScreen";
import FlashCardCreateDeckScreen from "../../screens/revision/FlashCard/FlashCardCreateDeckScreen";

const RevisionStack = createNativeStackNavigator();

const RevisionStackScreen = () => {
  return (
    // <NavigationContainer>
    <RevisionStack.Navigator screenOptions={{ headerShown: false }}>
      <RevisionStack.Screen name="RevisionPage" component={RevisionScreen} />
      <RevisionStack.Screen name="FlashCards" component={FlashCardsScreen} />
      <RevisionStack.Screen
        name="FlashCardPlay"
        component={FlashCardPlayScreen}
      />
      <RevisionStack.Screen
        name="FlashCardCreate"
        component={FlashCardCreateScreen}
      />
      <RevisionStack.Screen
        name="FlashCardCreateDeck"
        component={FlashCardCreateDeckScreen}
      />
      <RevisionStack.Screen name="Notebook" component={NotebookScreen} />
    </RevisionStack.Navigator>

    // {/* <Text>Navigation</Text> */}
    // </NavigationContainer>
  );
};

export default RevisionStackScreen;
