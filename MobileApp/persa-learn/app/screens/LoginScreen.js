import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  useWindowDimensions,
} from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import CustomInput from "../components/CustomInput/CustomInput";
import { useForm } from "react-hook-form";

import { AuthContext } from "../components/context";

import Logo from "../assets/tempLogo.png";
import CustomButton from "../components/CustomButton/CustomButton";
import fonts from "../config/fonts";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen() {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const { control, handleSubmit, watch } = useForm();

  const { signIn } = useContext(AuthContext);

  const onSignInPressed = (data) => {
    // alert(data.email);
    // alert(data.password);
    signIn(data.email, data.password);
    // navigation.navigate("HomeTab");
  };

  const onForgotPasswordPressed = () => {
    console.warn("Forgot password");
    navigation.navigate("ForgotPassword");
  };
  const onSignUpPressed = () => {
    navigation.navigate("SignUp");
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.2 }]}
          resizeMode="contain"
        />
        <Text style={styles.title}>Start Your Journey</Text>
        <CustomInput
          name="email"
          placeholder="Email"
          control={control}
          rules={{
            required: "Username is required",
            pattern: { value: EMAIL_REGEX, message: "Invalid email" },
          }}
        />
        <CustomInput
          // value={password}
          // setValue={setPassword}
          name="password"
          placeholder="Password"
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
        {/* <CustomButton text="Sign In" onPress={handleSubmit(()=>signIn())} /> */}
        <CustomButton text="Sign In" onPress={handleSubmit(onSignInPressed)} />
        {/* <CustomButton
          text="Forgot Password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        /> */}
        <CustomButton
          text="Dont have an account? Create one"
          onPress={onSignUpPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 40,
  },
  title: fonts.title,
  // title: {
  //   fontSize: 24,
  //   fontWeight: "bold",
  //   color: "#051C60",
  //   margin: 10,
  // },
  text: {
    color: "grey",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
});
