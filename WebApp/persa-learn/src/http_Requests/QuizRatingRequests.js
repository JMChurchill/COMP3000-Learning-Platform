import { checkTokenCorrect } from "./userRequests";

export const rateQuiz = (credentials) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch("http://localhost:8080/rating", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};
