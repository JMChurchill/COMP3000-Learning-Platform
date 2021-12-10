import React from "react";
import { Link } from "react-router-dom";

import MakeActivity from "../Components/MakeActivity";

const CreateActivity = () => {
  return (
    <div className="content-box">
      <h1>Create activity</h1>
      <div className="container center-container flex-wrap">
        <Link to="/quiz-designer">
          <MakeActivity name="Quiz Designer" />
        </Link>
      </div>
    </div>
  );
};

export default CreateActivity;
