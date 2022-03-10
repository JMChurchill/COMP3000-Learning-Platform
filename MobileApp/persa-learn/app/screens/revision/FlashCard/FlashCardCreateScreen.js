import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";

import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import fonts from "../../../config/fonts";
import colors from "../../../config/colors";
import common from "../../../config/common";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomButton from "../../../components/CustomButton/CustomButton";

export default function FlashCardCreateScreen() {
  const { control, handleSubmit, watch } = useForm();
  const navigation = useNavigation();

  const createCardPressed = () => {
    console.warn("Card created");
    navigation.navigate("FlashCards");
  };
  const createAnotherPressed = () => {
    navigation.navigate("FlashCardCreate");
  };
  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={fonts.title}>FlashCardCreate</Text>
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
            // value={username}
            // setValue={setUsername}
            name="back"
            placeholder="Add back text"
            control={control}
            rules={{ required: "Back text is required" }}
            large={true}
            fSize={20}
            // fBold={true}
          />
        </View>
        <CustomButton
          // style={{ marginHorizontal: 10 }}
          text="Save Card"
          onPress={createCardPressed}
        />
        <CustomButton
          // style={{ marginHorizontal: 10 }}
          text="Create Another"
          type="SECONDARY"
          onPress={createAnotherPressed}
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
