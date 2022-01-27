import React from "react";

import Achievement from "../Components/Achievement";

const Achievements = () => {
  return (
    <div className="content-box">
      <h1>Achivements</h1>
      <div className="container wide-container center-container rows">
        <div className="achievement-box container flex-wrap">
          <Achievement />
          <Achievement />
          <Achievement />
          <Achievement />
          <Achievement />
          <Achievement />
          <Achievement />
          <Achievement /> <Achievement /> <Achievement /> <Achievement />{" "}
          <Achievement />
        </div>
      </div>
    </div>
  );
};

export default Achievements;
