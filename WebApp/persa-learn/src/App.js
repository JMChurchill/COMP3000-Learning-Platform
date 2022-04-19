import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//import functions
import useToken from "./useToken";

//import pages
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import Login from "./Pages/Login";
import Activities from "./Pages/Activities";
import CreateActivity from "./Pages/CreateActivity";
import Quiz from "./Pages/Activities/Quiz";
import FlashCards from "./Pages/Activities/FlashCards";
import QuizDesigner from "./Pages/ActivityDesigner/Quiz/QuizDesigner";
// import QuizDesigner from "./Pages/ActivityDesigner/Quiz/QuizDesigner";
import FlashCard from "./Pages/Activities/FlashCard";
// import UserProfile from "./Pages/UserProfile";
import ClassLeaderboard from "./Pages/ClassLeaderboard";
// import Achievements from "./Pages/Achievements";
import FlashcardDesigner from "./Pages/ActivityDesigner/FlashcardDesigner";
import StudentProfile from "./Pages/StudentProfile";
import TeacherProfile from "./Pages/TeacherProfile";

//components
import Navbar from "./Components/Navbar";
import UserSettings from "./Pages/UserSettings";
import EditUserSettings from "./Pages/EditUserSettings";
// import AllQuizzes from "./Pages/ActivityDesigner/Quiz/AllQuizzes/AllQuizzes";
import AssignActivities from "./Pages/AssignActivities/AssignActivities";
import EditCardsInDeck from "./Pages/Activities/FlashCards/EditCardsInDeck";
import Shop from "./Pages/Shop";

// const setToken = (userToken) => {
//   sessionStorage.setItem("token", JSON.stringify(userToken));
// };

function App() {
  // const [token, setToken] = useState();
  const { token, setToken } = useToken();
  const { isTeacher, setIsTeacher } = useState();
  // console.log(window.location.href);
  // const url = window.location.href;
  // console.log(url.split("/").pop());
  // console.log(Route.props.location.pathname);

  useEffect(() => {
    //get theme from local storage
    let theme = JSON.parse(localStorage.getItem("theme"));

    //set themes
    if (theme) {
      try {
        // setTheme(theme);
        setTheme(
          theme.id,
          theme.backgroundColor,
          theme.primaryColor,
          theme.btnTextColor,
          theme.isDark
        );
      } catch (err) {}
    }
  });

  const setTheme = (
    id,
    backgroundColor = "white",
    primaryColor = "#201d95",
    btnTextColor = "white",
    isDark = false
  ) => {
    document.documentElement.style.setProperty(
      "--background-color",
      backgroundColor
    );
    document.documentElement.style.setProperty("--primary-color", primaryColor);
    document.documentElement.style.setProperty(
      "--btn-text-color",
      btnTextColor
    );
    document.documentElement.style.setProperty(
      "--text-color",
      isDark ? "#c9d1d9" : "black"
    );
    document.documentElement.style.setProperty(
      "--items-container",
      isDark ? "rgba(255, 255, 255, 0.1)" : "rgb(0, 0, 0, 0.05)"
    );
  };

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          {/* shared routes */}
          <Route exact path="/" element={<Home setToken={setToken} />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/leaderboard" element={<ClassLeaderboard />} />
          <Route path="*" element={<Error />} />
          {/* student routes */}
          <Route exact path="/profile_student" element={<StudentProfile />} />
          <Route exact path="/user_settings" element={<UserSettings />} />
          <Route
            exact
            path="/user_settings/edit"
            element={<EditUserSettings />}
          />
          <Route exact path="/quiz" element={<Quiz />} />
          <Route exact path="/flash-cards" element={<FlashCards />} />
          <Route exact path="/flash-card" element={<FlashCard />} />
          <Route exact path="/flash-card/edit" element={<EditCardsInDeck />} />
          <Route
            exact
            path="/designer_flashcard"
            element={<FlashcardDesigner />}
          />
          <Route exact path="/shop" element={<Shop />} />
          {/* teacher routes */}
          <Route exact path="/profile_teacher" element={<TeacherProfile />} />
          <Route exact path="/Assign" element={<AssignActivities />} />
          <Route exact path="/designer_quiz" element={<QuizDesigner />} />

          {/* temp routes */}
          <Route exact path="/activity" element={<Activities />} />
          <Route exact path="/create" element={<CreateActivity />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
