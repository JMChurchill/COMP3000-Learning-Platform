export const getTeachersClasses = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));

  return fetch("http://localhost:8080/teacher/classes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
  }).then((data) => data.json());
};

export const searchStudents = (searchTerm) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  return fetch("http://localhost:8080/teacher/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify({ searchTerm: searchTerm }),
  }).then((data) => data.json());
};

export const addStudentToClass = (studentID, classID) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  return fetch("http://localhost:8080/teacher/classes/assign", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify({ studentID, classID }),
  }).then((data) => data.json());
};

export const createClass = (details) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  return fetch("http://localhost:8080/teacher/classes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(details),
  }).then((data) => data.json());
};

export const updateClass = (details) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  return fetch("http://localhost:8080/teacher/classes", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(details),
  }).then((data) => data.json());
};

export const deleteClass = (details) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  return fetch("http://localhost:8080/teacher/classes", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(details),
  }).then((data) => data.json());
};
