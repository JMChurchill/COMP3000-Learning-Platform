import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CreateQuestionBox from "../../../Components/QuizDesigner/CreateQuestionBox";
import {
  createModule,
  createTheQuiz,
  viewTeachersModules,
} from "../../../http_Requests/teacherRequests";

const QuizDesigner = () => {
  const [title, setTitle] = useState();
  const [questions, setQuestions] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [newModule, setNewModule] = useState();

  const [moduleList, setModuleList] = useState([]);

  const [isComplete, setIsComplete] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isAddModule, setIsAddModule] = useState(false);
  const [moduleCreated, setModuleCreated] = useState(false);

  const navigate = useNavigate();

  useEffect(async () => {
    let data = await viewTeachersModules();
    setModuleList(data.modules);
  }, []);

  console.log(selectedModule);
  //for testing
  useEffect(() => {
    console.log(questions);
  }, [questions]);
  useEffect(() => {
    console.log(moduleList);
  }, [moduleList]);

  const addModule = async () => {
    // console.log(newModule);
    let data = await createModule({ moduleName: newModule });
    console.log(data);
    let modData = await viewTeachersModules();
    setModuleList(modData.modules);
    setModuleCreated(true);
  };

  const addQuestion = (e) => {
    e.preventDefault();
    //create empty question
    const question = {
      id: questions.length,
      name: "",
      details: "",
      correct: 0,
      options: [],
    };
    //add question to question array
    setQuestions([...questions, question]);
  };
  const updateQuestion = (qID, updatedQuestion) => {
    // copy old data
    let newData = [...questions];
    // update value based on question ID
    newData[qID] = updatedQuestion;
  };

  const createQuiz = async () => {
    // send this to API
    console.log("Title: ", title);
    console.log("Questions: ", questions);

    const data = await createTheQuiz({ title, questions, selectedModule });
    //{status, quizID} = data
    console.log(data);
    if (data.status === "success") {
      setIsComplete(true);
    } else {
      setIsError(true);
    }
  };

  return (
    <div className="content-box">
      <h1>Quiz designer</h1>
      <div className="container wide-container">
        <div className="create-quiz-title">
          <input
            type="text"
            placeholder="QuizTitle"
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            id="module"
            name="moduleList"
            className="selector"
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
          <button className="btn" onClick={() => setIsAddModule(true)}>
            New Module
          </button>
        </div>
        {questions.map((quest, index) => {
          return (
            <CreateQuestionBox
              key={quest.id}
              qID={quest.id}
              thisQuestion={questions[quest.id]}
              updateQuestion={updateQuestion}
            />
          );
        })}
        {/* <CreateQuestionBox /> */}
        <button className="add-question btn" onClick={addQuestion}>
          +
        </button>
        <button className="btn" onClick={createQuiz}>
          Finish
        </button>
      </div>
      <div className="overlay" aria-disabled={!isComplete}>
        <div className="message-box">
          <h1>Created {title} Quiz</h1>
          <button className="btn" onClick={() => navigate("/quiz/all")}>
            View all quizzes
          </button>
        </div>
      </div>
      <div className="overlay" aria-disabled={!isError}>
        <div className="message-box">
          <h1>An error occured quiz not created</h1>
          <button className="btn" onClick={() => setIsError(false)}>
            Ok
          </button>
        </div>
      </div>
      <div className="overlay" aria-disabled={!isAddModule}>
        <div className="message-box">
          {moduleCreated ? (
            <h1>Module created successfully</h1>
          ) : (
            <>
              {" "}
              <h1>Add a new module</h1>
              <input
                type="text"
                placeholder="module name"
                onChange={(e) => setNewModule(e.target.value)}
              />
              <button className="btn" onClick={() => addModule()}>
                Ok
              </button>
            </>
          )}
          <button
            className="btn"
            onClick={() => {
              setIsAddModule(false);
              setModuleCreated(false);
            }}
          >
            Back
          </button>
          {/* <h1>Add a new module</h1>
          <input
            type="text"
            placeholder="module name"
            onChange={(e) => setNewModule(e.target.value)}
          />
          <button className="btn" onClick={() => addModule()}>
            Ok
          </button>
          <button className="btn" onClick={() => setIsAddModule(false)}>
            Back
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default QuizDesigner;
