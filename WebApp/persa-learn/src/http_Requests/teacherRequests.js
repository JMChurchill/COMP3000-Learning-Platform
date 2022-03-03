import { checkTokenCorrect } from "./userRequests";

export const getTeachersClasses = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));

  const data = fetch("http://localhost:8080/teacher/classes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const searchStudents = (searchTerm) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch("http://localhost:8080/teacher/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify({ searchTerm: searchTerm }),
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const addStudentToClass = (details) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch("http://localhost:8080/teacher/classes/assign", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(details),
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const removeStudentFromClass = (details) => {
  console.log(details);
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch("http://localhost:8080/teacher/classes/remove", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(details),
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const createClass = (details) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch("http://localhost:8080/teacher/classes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(details),
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const updateClass = (details) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch("http://localhost:8080/teacher/classes", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(details),
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const deleteClass = (details) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch("http://localhost:8080/teacher/classes", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(details),
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const getStudentsInClass = (classID) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch("http://localhost:8080/teacher/class", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(classID),
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const createTheQuiz = (credentials) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch("http://localhost:8080/teacher/activity/quiz/create", {
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

export const deleteTheQuiz = (credentials) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch("http://localhost:8080/teacher/activity/quiz/delete", {
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

export const viewTeachersQuizzes = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch("http://localhost:8080/teacher/activity/quiz/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const viewTeachersQuizzesByClass = (credentials) => {
  console.log("aaa", credentials);
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch(
    `http://localhost:8080/teacher/activity/quiz/all/class/?classID=${credentials}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        autherization: token,
      },
      //body: JSON.stringify(credentials),
    }
  ).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const viewTeachersModules = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch("http://localhost:8080/teacher/activity/module/view", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const createModule = (credentials) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch("http://localhost:8080/teacher/activity/module/create", {
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

export const assignQuizToClass = (credentials) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch(
    "http://localhost:8080/teacher/activity/assignments/quiz/class",
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
