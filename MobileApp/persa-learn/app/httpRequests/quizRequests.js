import * as SecureStore from "expo-secure-store";

export const getQuizRequest = async (quizID) => {
  let token = await SecureStore.getItemAsync("userToken");
  const data = fetch(`http://10.0.2.2:8080/quiz/view?quizID=${quizID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
  }).then((data) => data.json());
  return data;
};

export const checkAnswers = async (credentials) => {
  let token = await SecureStore.getItemAsync("userToken");
  const data = fetch(`http://10.0.2.2:8080/quiz/checkAnswers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  return data;
};
