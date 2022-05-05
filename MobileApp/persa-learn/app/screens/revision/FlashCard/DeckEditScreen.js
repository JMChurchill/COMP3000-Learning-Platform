import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import CustomButton from "../../../components/CustomButton/CustomButton";
import CustomInput from "../../../components/CustomInput/CustomInput";
import fonts from "../../../config/fonts";
import common from "../../../config/common";
import { useForm } from "react-hook-form";
import colors from "../../../config/colors";
import { updateDecksRequest } from "../../../httpRequests/flashcardRequests";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../../../components/context";

const DeckEditScreen = ({ route, navigation }) => {
  const { signOut } = useContext(AuthContext);

  const { control, handleSubmit, watch } = useForm();
  const { deckID, deckName } = route.params;

  const editDeck = async (credentials) => {
    // console.log(credentials);
    try {
      const data = await updateDecksRequest({
        DeckID: deckID,
        Name: credentials.deckName,
      });
      if (data.status === "success") {
        navigation.navigate("FlashCards");
      }
      if ((await SecureStore.getItemAsync("userToken")) === null) {
        signOut();
      }
    } catch (e) {}
  };

  return (
    <View style={styles.root}>
      <Text style={fonts.title}>Create Deck</Text>
      <View style={[styles.container, common.shadow]}>
        <CustomInput
          name="deckName"
          placeholder="Enter title"
          control={control}
          rules={{ required: "Title is required" }}
          fSize={30}
          fBold={true}
          value={deckName}
        />
      </View>
      <CustomButton text="Edit Deck" onPress={handleSubmit(editDeck)} />
      <CustomButton
        text="Back"
        type="SECONDARY"
        onPress={() => navigation.navigate("FlashCards")}
      />
    </View>
  );
};

export default DeckEditScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    padding: "5%",
  },
  container: {
    width: "100%",
    padding: "5%",
    backgroundColor: colors.cardBackground,
    borderRadius: common.containerBorderRadius,
  },
});
