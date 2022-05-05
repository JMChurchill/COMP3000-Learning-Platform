import { StyleSheet, View, Text } from "react-native";
import React, { useContext } from "react";
import fonts from "../../config/fonts";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";

import { useForm } from "react-hook-form";
import { AuthContext } from "../../components/context";
import { changePasswordRequest } from "../../httpRequests/studentRequests";
import * as SecureStore from "expo-secure-store";

const ChangePasswordScreen = () => {
  const { control, handleSubmit, watch } = useForm();

  const { signOut } = useContext(AuthContext);

  const changePassword = async (credentials) => {
    try {
      const data = await changePasswordRequest({
        oPassword: credentials.oPassword,
        nPassword: credentials.nPassword,
      });
      console.log(data);
      if (data.status === "success") {
        signOut();
      } else if (data.status == "Password incorrect") {
        alert("Password Incorrect");
      } else {
        alert("Unable to change password");
      }
      if ((await SecureStore.getItemAsync("userToken")) === null) {
        signOut();
      }
    } catch (e) {}
  };

  const pwd = watch("nPassword");

  return (
    <View style={styles.container}>
      <Text style={fonts.title}>Change Password</Text>
      <Text style={fonts.h1}>Current Password</Text>
      <CustomInput
        // value={password}
        // setValue={setPassword}
        name="oPassword"
        placeholder="Current Password"
        control={control}
        rules={{
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password should be atleast 8 characters long",
          },
        }}
        secureTextEntry={true}
      />
      <Text style={fonts.h1}>New Password</Text>
      <CustomInput
        // value={password}
        // setValue={setPassword}
        name="nPassword"
        placeholder="New Password"
        control={control}
        rules={{
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password should be atleast 8 characters long",
          },
        }}
        secureTextEntry={true}
      />
      <CustomInput
        // value={passwordRepeat}
        // setValue={setPasswordRepeate}
        name="passwordRepeat"
        placeholder="Repeat New Password"
        control={control}
        rules={{
          required: "Password is required",
          validate: (value) => value == pwd || "Passwords do not match",
        }}
        secureTextEntry={true}
      />
      <CustomButton
        text={"Update Details"}
        onPress={handleSubmit(changePassword)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: { alignItems: "center", paddingHorizontal: 40, width: "100%" },
});

export default ChangePasswordScreen;
