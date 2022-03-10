import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomButton from "../../../components/CustomButton/CustomButton";

import fonts from "../../../config/fonts";
import colors from "../../../config/colors";
import common from "../../../config/common";
import { useNavigation } from "@react-navigation/native";
import CreatedDeckOverlay from "../../../components/revision/FlashCards/CreatedDeckOverlay";
import DeleteDeckOverlay from "../../../components/revision/FlashCards/DeleteDeckOverlay";

export default function FlashCardCreateDeckScreen() {
  const [isComplete, setIsComplete] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [title, setTitle] = useState("");
  const [module, setModule] = useState("");

  const { control, handleSubmit, watch } = useForm();

  const navigation = useNavigation();

  const createDeckPressed = (data) => {
    setTitle(data.title);
    setModule(data.module);
    // console.log(data);
    setIsComplete(true);
    // navigation.navigate("FlashCardCreate");
  };
  const deleteDeckPressed = () => {
    setIsDelete(true);
  };
  return (
    <>
      <View style={styles.root}>
        <Text style={fonts.title}>Create Deck</Text>
        <View style={[styles.container, common.shadow]}>
          <CustomInput
            // value={username}
            // setValue={setUsername}
            name="title"
            placeholder="Enter title"
            control={control}
            rules={{ required: "Title is required" }}
            fSize={30}
            fBold={true}
          />
          <CustomInput
            // value={username}
            // setValue={setUsername}
            name="module"
            placeholder="Enter module name"
            control={control}
            rules={{ required: "Module is required" }}
            fSize={30}
            fBold={true}
          />
        </View>
        <CustomButton
          // style={{ marginHorizontal: 10 }}
          text="Create Deck"
          onPress={handleSubmit(createDeckPressed)}
        />
        <CustomButton
          // style={{ marginHorizontal: 10 }}
          text="Delete Deck"
          type="SECONDARY"
          onPress={deleteDeckPressed}
        />
      </View>
      {isComplete ? (
        <CreatedDeckOverlay title={title} module={module} />
      ) : (
        <></>
      )}
      {isDelete ? <DeleteDeckOverlay setIsDelete={setIsDelete} /> : <></>}
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    padding: "5%",
  },
  container: {
    // borderWidth: 1,
    width: "100%",
    padding: "5%",
    backgroundColor: colors.cardBackground,
    borderRadius: common.containerBorderRadius,
  },
});
