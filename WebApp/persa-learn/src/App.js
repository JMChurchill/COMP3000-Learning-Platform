import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//import pages
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import Login from "./Pages/Login";
import Quiz from "./Pages/Activities/Quiz";
import CreateActivity from "./Pages/CreateActivity";

//components
import Navbar from "./Components/Navbar";
import Activities from "./Pages/Activities";
import QuizDesigner from "./Pages/QuizDesigner";
import FlashCards from "./Pages/Activities/FlashCards";

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
