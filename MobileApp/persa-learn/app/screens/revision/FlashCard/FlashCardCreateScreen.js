import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useContext } from "react";

import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import fonts from "../../../config/fonts";
import colors from "../../../config/colors";
import common from "../../../config/common";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { createFlashCardRequest } from "../../../httpRequests/flashcardRequests";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../../../components/context";

export default function FlashCardCreateScreen({ route, navigation }) {
  const { signOut } = useContext(AuthContext);

  const { control, handleSubmit, watch } = useForm();
  const { deckID, deckName } = route.params;

  // const navigation = useNavigation();

  const createCardPressed = async (credentials) => {
    try {
      const data = await createFlashCardRequest({
        DeckID: deckID,
        Question: credentials.front,
        Answer: credentials.back,
      });
      if (data.status === "success") {
        navigation.navigate("CardsEdit", { deckID, deckName });
      } else alert("Unable to add card, please try again");
    } catch (e) {}
    if ((await SecureStore.getItemAsync("userToken")) === null) {
      signOut();
    }
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={fonts.title}>Create flashcard</Text>
        <View style={[styles.container, common.shadow]}>
          <Text style={fonts.h1}>Front</Text>
          <CustomInput
            // value={username}
            // setValue={setUsername}
            name="front"
            placeholder="Add front text"
            control={control}
            rules={{ required: "Front text is required" }}
            large={true}
            fSize={20}
            // fBold={true}
          />
        </View>
        <View style={[styles.container, common.shadow]}>
          <Text style={fonts.h1}>Back</Text>
          <CustomInput
            name="back"
            placeholder="Add back text"
            control={control}
            rules={{ required: "Back text is required" }}
            large={true}
            fSize={20}
          />
        </View>
        <CustomButton
          // style={{ marginHorizontal: 10 }}
          text="Save Card"
          onPress={handleSubmit(createCardPressed)}
        />
        <CustomButton
          // style={{ marginHorizontal: 10 }}
          text="Back"
          type="SECONDARY"
          onPress={() => navigation.navigate("FlashCards")}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    padding: "5%",
    // borderWidth: 1,
    // borderColor: "orange",
  },
  container: {
    // borderWidth: 1,
    width: "100%",
    minHeight: 200,
    padding: "5%",
    backgroundColor: colors.cardBackground,
    borderRadius: common.containerBorderRadius,
    marginVertical: 10,
    alignItems: "center",
  },
});
