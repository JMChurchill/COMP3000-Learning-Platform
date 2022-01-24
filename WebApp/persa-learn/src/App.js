import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//import pages
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import Login from "./Pages/Login";
import Activities from "./Pages/Activities";
import CreateActivity from "./Pages/CreateActivity";
import Quiz from "./Pages/Activities/Quiz";
import FlashCards from "./Pages/Activities/FlashCards";
import QuizDesigner from "./Pages/ActivityDesigner/QuizDesigner";
import FlashCard from "./Pages/Activities/FlashCard";
import UserProfile from "./Pages/UserProfile";
import ClassLeaderboard from "./Pages/ClassLeaderboard";

//components
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/activity" element={<Activities />} />
          <Route exact path="/create" element={<CreateActivity />} />
          <Route exact path="/quiz" element={<Quiz />} />
          <Route exact path="/flash-cards" element={<FlashCards />} />
          <Route exact path="/quiz-designer" element={<QuizDesigner />} />
          <Route exact path="/flash-card" element={<FlashCard />} />
          <Route exact path="/profile" element={<UserProfile />} />
          <Route exact path="/leaderboard" element={<ClassLeaderboard />} />
          <Route path="*" element={<Error />} />
          {/* <Home /> */}
          {/* </Route> */}
          {/* <Router path="*" element={<Error />} /> */}
          {/* <Error /> */}
          {/* </Router> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
