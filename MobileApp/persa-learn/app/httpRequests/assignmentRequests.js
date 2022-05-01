import * as SecureStore from "expo-secure-store";

export const getAssignmentsByStudent = async () => {
  let token = await SecureStore.getItemAsync("userToken");

  const data = fetch("http://10.0.2.2:8080/assignments/quizzes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
  }).then((data) => data.json());
  return data;
};
