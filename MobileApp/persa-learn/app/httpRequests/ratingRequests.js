import * as SecureStore from "expo-secure-store";
import { checkTokenCorrect } from "./checkValidToken";

export const rateQuizRequest = async (credentials) => {
  try {
    let token = await SecureStore.getItemAsync("userToken");
    const data = fetch("http://10.0.2.2:8080/rating", {
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
