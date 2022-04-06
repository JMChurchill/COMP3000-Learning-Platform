import React, { useEffect, useState } from "react";
import CustomButton from "../CustomButton";
import styles from "./CreateQuestionBox.module.css";

// component
// import AddOptionBtn from "./AddOptionBtn";
import NewOption from "./NewOption";

const CreateQuestionBox = ({ qID, updateQuestion, thisQuestion }) => {
  const [questionName, setQuestionName] = useState("");
  const [questionDetails, setQuestionDetails] = useState("");

  const [options, setOptions] = useState([]);
  const [correctAns, setCorrectAns] = useState(0);
  // const [option, setOption] = useState({ value: "", isTrue: false });
  useEffect(() => {
    updateThisQuestion();
    setOptions([...options]); //to trigger component update
  }, [correctAns]);

  const addOption = () => {
    // e.preventDefault();
    setOptions([...options, ""]);
    console.log("option array: ", options);
    updateThisQuestion();
  };

  const updateThisQuestion = async () => {
    thisQuestion.name = questionName;
    thisQuestion.details = questionDetails;
    thisQuestion.options = options;
    thisQuestion.correct = correctAns;

    updateQuestion(thisQuestion);
  };

  const updateOption = (opID, opValue) => {
    options[opID] = opValue;
    updateThisQuestion();
  };
  const updateCorrectAns = (opID) => {
    setCorrectAns(opID);
  };
  return (
    // <div className="create-question">
    <div className={styles.create_question}>
      {/* <form action=""> */}
      {/* <div className="question-box"> */}
      <div className={styles.question_box}>
        <input
          placeholder="Enter Question"
          onChange={(e) => {
            setQuestionName(e.target.value);
            updateThisQuestion();
          }}
        />
        <input
          placeholder="More details"
          onChange={(e) => {
            setQuestionDetails(e.target.value);
            updateThisQuestion();
          }}
        />
      </div>
      {/* <div className="correct-ans"> */}
      <div className={styles.correct_ans}>
        <div></div>
        <p>Correct answer</p>
      </div>
      <div className={styles.options_box}>
        {options.map((option, index) => {
          let correctAnsw = false;
          if (thisQuestion.correct == index) {
            correctAnsw = true;
          }
          return (
            <NewOption
              key={index}
              opID={index}
              updateOption={updateOption}
              correctAns={correctAnsw}
              updateCorrectAns={updateCorrectAns}
            />
          );
        })}
      </div>
      <CustomButton text={"add option"} onClick={addOption} type={3} />
      {/* </form> */}
    </div>
  );
};

export default CreateQuestionBox;
