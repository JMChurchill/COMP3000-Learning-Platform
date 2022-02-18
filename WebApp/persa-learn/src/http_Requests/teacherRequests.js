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
