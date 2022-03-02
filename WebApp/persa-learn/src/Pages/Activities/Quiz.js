import React, { useEffect, useState } from "react";

import QuizBox from "../../Components/QuizBox";
import Progressbar from "../../Components/Progressbar";
// import tempQuizData from "../../assets/tempQuizData.json";
import { checkAnswers, getQuiz } from "../../http_Requests/userRequests";
import { useLocation } from "react-router-dom";

const Quiz = () => {
  const [quizID, setQuizID] = useState();
  const [title, setTitle] = useState();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const { state } = useLocation();

  console.log(state);
  useEffect(async () => {
    // get quiz data
    if (state !== null) {
      const data = await getQuiz(state.quizID);
      // console.log(data);

      //set quiz title
      setTitle(data.quizName);
      setQuizID(data.quizID);
      setQuestions(data.questions);
    }
  }, []);
  // useEffect(() => {
  //   console.log(answers);
  // }, [answers]);

  const addAnswer = (questionID, answerIdx) => {
    let isFound = false;
    // check if question already answered
    // const tempAns = answers;
    answers.map((ans) => {
      if (ans.questionID == questionID) {
        ans.ans = answerIdx;
        isFound = true;
      }
    });
    if (isFound) {
      //update answers
      setAnswers([...answers]);
    } else {
      // add new answer
      setAnswers([...answers, { questionID, ans: answerIdx }]);
    }
  };
  const complete = async () => {
    if (answers.length === questions.length) {
      const data = await checkAnswers({ quizID, answers });
      if (data.isCorrect) {
        console.log("You were correct");
      } else {
        console.log("Incorrect answers: ", data.wrongAnswers);
      }
    } else console.log("answer all the questions");
  };

  return (
    <div className="content-box">
      <h1>{title}</h1>
      <div className="container wide-container center-container">
        <Progressbar
          progress={answers.length}
          numQuestions={questions.length}
        />
        {questions.map((question) => {
          return (
            <QuizBox
              key={question.id}
              questionId={question.id}
              question={question.name}
              details={question.details}
              options={question.options}
              answers={answers}
              addAnswer={addAnswer}
            />
          );
        })}
      </div>
      <button className="btn" onClick={() => complete()}>
        Complete
      </button>
    </div>
  );
};

export default Quiz;
