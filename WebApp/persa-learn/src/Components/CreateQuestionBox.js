import React, { useState } from "react";

// component
// import AddOptionBtn from "./AddOptionBtn";
import NewOption from "./NewOption";
// import { useState } from "react/cjs/react.development";

const CreateQuestionBox = () => {
  const [options, setOptions] = useState([]);
  // const [option, setOption] = useState({ value: "", isTrue: false });
  const addOption = (e) => {
    e.preventDefault();
    console.log(e);
    setOptions([...options, ""]);
    console.log(options);
    if (options.length > 0) {
      let recentOption = document.getElementById("options-box").lastChild;
      // recentOption.children.lastChild.value = 10;
      recentOption.lastChild.value = 10;
      console.log(recentOption.lastChild);
    }
  };
  return (
    <div className="create-question">
      <form action="">
        <div className="question-box">
          <input placeholder="Enter Question"></input>
          <input placeholder="More details"></input>
        </div>
        <p>Correct answer</p>
        <div id="options-box">
          {/* <NewOption />
          <NewOption />
          <NewOption /> */}
          {options.map((option, index) => {
            return <NewOption key={index} />;
          })}
        </div>
        <button className="btn" onClick={addOption}>
          add question
        </button>
      </form>
    </div>
  );
};

export default CreateQuestionBox;
