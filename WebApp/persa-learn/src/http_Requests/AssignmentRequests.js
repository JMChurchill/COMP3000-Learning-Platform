import { checkTokenCorrect } from "./userRequests";

export const assignQuizToClass = (credentials) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch(
    // "http://localhost:8080/teacher/activity/assignments/quiz/class",
    "http://localhost:8080/assignments/quiz/class",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        autherization: token,
      },
      body: JSON.stringify(credentials),
    }
  ).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const unassignQuizFromClass = (credentials) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch("http://localhost:8080/assignments/quiz/class/", {
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

export const getAssignmentProgress = (credentials) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch(
    `http://localhost:8080/assignments/progress?questionID=${credentials.qID}&classID=${credentials.cID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        autherization: token,
      },
    }
  ).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};
