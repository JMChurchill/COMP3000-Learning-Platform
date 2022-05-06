import { checkTokenCorrect } from "../userRequests";

export const getClassRequests = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch("http://localhost:8080/classRequests/student", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const acceptClassRequests = (credentials) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch("http://localhost:8080/classRequests/student", {
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

export const declineClassRequests = (credentials) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch("http://localhost:8080/classRequests/student", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};
