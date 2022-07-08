import * as SecureStore from "expo-secure-store";
import { checkTokenCorrect } from "./checkValidToken";
import { hostAddress } from "./hostAddress";

export const getAssignmentsByStudent = async () => {
  try {
    let token = await SecureStore.getItemAsync("userToken");

    const data = fetch(`${hostAddress()}/assignments/quizzes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        autherization: token,
      },
    }).then((data) => data.json());
    checkTokenCorrect(data);
    return data;
  } catch (e) {}
};
