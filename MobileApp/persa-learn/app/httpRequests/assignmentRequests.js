import * as SecureStore from "expo-secure-store";
import { checkTokenCorrect } from "./checkValidToken";

export const getAssignmentsByStudent = async () => {
  try {
    let token = await SecureStore.getItemAsync("userToken");

    const data = fetch("http://10.0.2.2:8080/assignments/quizzes", {
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
