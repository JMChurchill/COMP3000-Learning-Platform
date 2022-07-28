import * as SecureStore from "expo-secure-store";
import { checkTokenCorrect } from "./checkValidToken";
import { hostAddress } from "./hostAddress";

export const rateQuizRequest = async (credentials) => {
  try {
    let token = await SecureStore.getItemAsync("userToken");
    const data = fetch(`${hostAddress()}/rating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        autherization: token,
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
    checkTokenCorrect(data);

    return data;
  } catch (e) {}
};
