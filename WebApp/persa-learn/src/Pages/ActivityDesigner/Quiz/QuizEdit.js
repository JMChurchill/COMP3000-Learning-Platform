import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CustomButton from "../../../Components/CustomButton";
import CustomInput from "../../../Components/CustomInput";
import CreateQuestionBox from "../../../Components/QuizDesigner/CreateQuestionBox";
import { updateTheQuiz } from "../../../http_Requests/QuizRequests";
import { viewTeachersModules } from "../../../http_Requests/teacherRequests";
import { getQuiz } from "../../../http_Requests/userRequests";
import styles from "./QuizEdit.module.css";

const QuizEdit = () => {
  const [title, setTitle] = useState();
  const [questions, setQuestions] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [newModule, setNewModule] = useState();
  // const [selectedDate, setSelectedDate] = useState(null);

  //   const [selectedClass, setSelectedClass] = useState("");

  const [moduleList, setModuleList] = useState([]);

  const [isComplete, setIsComplete] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isAddModule, setIsAddModule] = useState(false);
  const [moduleCreated, setModuleCreated] = useState(false);

  const { state } = useLocation();
  console.log(state);

  const getModules = async () => {
    let data = await viewTeachersModules();
    setModuleList(data.modules);
  };

  const updateQuestion = (qID, updatedQuestion) => {
    // copy old data
    let newData = [...questions];
    // update value based on question ID
    newData[qID] = updatedQuestion;
  };
  const addQuestion = () => {
    // e.preventDefault();
    //create empty question
    const question = {
      id: questions.length,
      Question: "",
      Details: "",
      Answer: 0,
      options: [],
    };
    //add question to question array
    setQuestions([...questions, question]);
  };
  const updateQuiz = async () => {
    console.log({
      quizID: state.quizID,
      title,
      questions,
      selectedModule,
      //   selectedClass,
    });
    const data = await updateTheQuiz({
      quizID: state.quizID,
      title,
      questions,
      selectedModule,
    });
    console.log(data);
    // //add quiz to database
    // const data = await createTheQuiz({
    //   title,
    //   questions,
    //   selectedModule,
    //   selectedClass,
    // });
    // //display status
    // if (data.status === "success") {
    //   setIsComplete(true);
    // } else {
    //   setIsError(true);
    // }
  };

  const getTheQuiz = async () => {
    //get existing questions
    const data = await getQuiz(state.quizID);
    console.log(data);
    setTitle(data.quiz.quizName);
    setQuestions(data.quiz.questions);
  };
  useEffect(async () => {
    await getModules();
    await getTheQuiz();
  }, []);
  return (
    <div className="content-box">
      <h1>Quiz Edit</h1>
      <div className={styles.container}>
        <div className={styles.create_quiz_title}>
          <CustomInput
            value={title}
            placeholder={"Quiz Title"}
            setValue={setTitle}
            fill={true}
          />
          <select
            id="module"
            name="moduleList"
            className={styles.selector}
            onChange={(e) => {
              setSelectedModule(e.target.value);
            }}
          >
            {moduleList.map((m, i) => (
              <option value={m.ModuleID} key={m.ModuleID}>
                {m.ModuleName}
              </option>
            ))}
            <option value={null}>No Module</option>
          </select>
          <CustomButton
            text={"New Module"}
            onClick={() => setIsAddModule(true)}
            fill={true}
          />
        </div>
        {questions.map((quest, index) => {
          console.log(quest);
          return (
            <CreateQuestionBox
              key={quest.id}
              qID={quest.id}
              thisQuestion={quest}
              updateQuestion={updateQuestion}
            />
          );
        })}
        <CustomButton text={"+"} type={2} onClick={addQuestion} />
        <CustomButton text={"Finished"} onClick={updateQuiz} />
      </div>
      {/* {isComplete ? (
        <OverlayComplete title={title} selectedClass={selectedClass} />
      ) : (
        <></>
      )} */}
      {/* <OverlayComplete title={title} selectedClass={selectedClass} /> */}
      {/* {isError ? (
        <Overlay
          setIsError={setIsError}
          close={() => {
            setIsError(false);
            console.log(isError);
          }}
        />
      ) : (
        <></>
      )} */}

      {/* {isAddModule ? (
        <OverlayAddModule
          isAddModule={isAddModule}
          moduleCreated={moduleCreated}
          setIsAddModule={setIsAddModule}
          setModuleCreated={setModuleCreated}
          getModules={getModules}
        />
      ) : (
        <></>
      )} */}
    </div>
  );
};

export default QuizEdit;
