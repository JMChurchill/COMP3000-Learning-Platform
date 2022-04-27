import React, { useEffect, useState } from "react";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import styles from "./CreateQuestionBox.module.css";

// component
// import AddOptionBtn from "./AddOptionBtn";
import NewOption from "./NewOption";

const CreateQuestionBox = ({ qID, updateQuestion, thisQuestion }) => {
  const [name, setName] = useState(thisQuestion.Question);
  const [questionDetails, setQuestionDetails] = useState(
    thisQuestion.Details ? thisQuestion.Details : ""
  );

  const [options, setOptions] = useState(
    thisQuestion.options ? thisQuestion.options : []
  );
  const [correctAns, setCorrectAns] = useState(thisQuestion.Answer);
  // const [option, setOption] = useState({ value: "", isTrue: false });
  useEffect(() => {
    // setName(thisQuestion.name);
    updateThisQuestion();
    setOptions([...options]); //to trigger component update
  }, [correctAns]);

  useEffect(() => {
    // setName(thisQuestion.name);
    updateThisQuestion();
  }, [name, questionDetails, options, correctAns]);

  const addOption = () => {
    // e.preventDefault();
    setOptions([...options, ""]);
    console.log("option array: ", options);
    updateThisQuestion();
  };

  const updateThisQuestion = async () => {
    console.log("updating all values");
    console.log(thisQuestion);
    thisQuestion.Question = name;
    thisQuestion.Details = questionDetails;
    thisQuestion.options = options;
    thisQuestion.Answer = correctAns;
    console.log(thisQuestion);

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
      <div className={styles.question_box}>
        <CustomInput
          placeholder={"Question"}
          value={name}
          setValue={setName}
          updateAllValues={updateThisQuestion}
        />

        <CustomInput
          placeholder={"Details"}
          value={questionDetails}
          setValue={setQuestionDetails}
          updateAllValues={updateThisQuestion}
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
          if (thisQuestion.Answer == index) {
            correctAnsw = true;
          }
          return (
            <NewOption
              key={index}
              opID={index}
              value={option.TheOption}
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
