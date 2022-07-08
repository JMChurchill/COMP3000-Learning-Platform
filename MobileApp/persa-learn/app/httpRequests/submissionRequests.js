import * as SecureStore from "expo-secure-store";
import { checkTokenCorrect } from "./checkValidToken";
import { hostAddress } from "./hostAddress";

export const shareSubmission = async (credentials) => {
  try {
    let token = await SecureStore.getItemAsync("userToken");

    const data = fetch(`${hostAddress()}/submission`, {
      method: "PUT",
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

export const unshareSubmission = async (credentials) => {
  try {
    let token = await SecureStore.getItemAsync("userToken");

    const data = fetch(`${hostAddress()}/submission`, {
      method: "DELETE",
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
