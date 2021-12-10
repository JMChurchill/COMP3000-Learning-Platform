import React, { useState, useEffect } from "react";

const Progressbar = ({ progress = 4, numQuestions = 10 }) => {
  const [widthPer, setWidthPer] = useState();
  useEffect(() => {
    const perc = `${(progress / numQuestions) * 100}%`;
    setWidthPer(perc);
    // alert(perc);
    //   return () => {
    //       cleanup
    //   }
  }, [progress]);

  return (
    <div className="progressbar">
      <div className="top">
        <h2>
          Progress: {progress}/{numQuestions}
        </h2>
        <div className="help-box">
          <p>Need help?</p>
          <button className="go-lesson-btn btn">Go to less</button>
          <button className="walk-through-btn btn">Walk through</button>
        </div>
      </div>
      <div className="bar">
        <div class="barFill" style={{ width: widthPer }}></div>
      </div>
      {/* <p>50%</p> */}
    </div>
  );
};

export default Progressbar;
