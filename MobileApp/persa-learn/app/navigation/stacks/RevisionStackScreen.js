import { View, Text } from "react-native";
import React, { useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../../components/context";

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
import DeckEditScreen from "../../screens/revision/FlashCard/DeckEditScreen";
import EditCardsScreen from "../../screens/revision/FlashCard/EditCardsScreen";

const RevisionStack = createNativeStackNavigator();

const RevisionStackScreen = () => {
  const { signOut } = useContext(AuthContext);

  // useEffect(async () => {
  //   // console.log(await SecureStore.getItemAsync("userToken"));
  //   if ((await SecureStore.getItemAsync("userToken")) === null) {
  //     signOut();
  //   }
  // });
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
      <RevisionStack.Screen name="DeckEdit" component={DeckEditScreen} />
      <RevisionStack.Screen name="CardsEdit" component={EditCardsScreen} />
      <RevisionStack.Screen name="Notebook" component={NotebookScreen} />
    </RevisionStack.Navigator>

    // {/* <Text>Navigation</Text> */}
    // </NavigationContainer>
  );
};

export default RevisionStackScreen;
