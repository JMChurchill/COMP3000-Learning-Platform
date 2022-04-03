import React from "react";
import { Link } from "react-router-dom";

import MakeActivity from "../Components/MakeActivity";

const CreateActivity = () => {
  return (
    <div className="content-box">
      <h1>Create activity</h1>
      <div className="container center-container flex-wrap">
        <Link to="/designer_quiz">
          <MakeActivity name="Quiz Designer" />
        </Link>
        <Link to="/designer_flashcard">
          <MakeActivity name="Flashcard Designer" />
        </Link>
        {/* <Link to="/quiz/all">
          <MakeActivity name="All Quizzes" />
        </Link> */}
      </div>
    </div>
  );
};

export default CreateActivity;
