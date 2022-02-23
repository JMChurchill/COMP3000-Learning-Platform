import { checkTokenCorrect } from "./userRequests";

export const updateUserDetails = (credentials) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  let data = fetch("http://localhost:8080/student/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  checkTokenCorrect(data);

  return data;
};
