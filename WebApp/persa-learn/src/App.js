import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//import pages
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import Login from "./Pages/Login";

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
