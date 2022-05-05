import * as SecureStore from "expo-secure-store";

export const checkTokenCorrect = async (status) => {
  status.then(async (value) => {
    if (
      value.hasOwnProperty("errors") &&
      value.errors[0].message === "Invalid Token" &&
      (await SecureStore.getItemAsync("userToken")) != null
    ) {
      await SecureStore.deleteItemAsync("userToken");
    }
  });
};
