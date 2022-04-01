import React, { useEffect, useState } from "react";

import QuizBox from "../../Components/QuizBox";
import Progressbar from "../../Components/Progressbar";
// import tempQuizData from "../../assets/tempQuizData.json";
import { checkAnswers, getQuiz } from "../../http_Requests/userRequests";
import { useLocation, useNavigate } from "react-router-dom";

const Quiz = () => {
  const [quizID, setQuizID] = useState();
  const [title, setTitle] = useState();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const [isComplete, setIsComplete] = useState(false);

  const [earnedXp, setEarnedXp] = useState(0);
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);

  const { state } = useLocation();
  const navigate = useNavigate();

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
      console.log("data: ", data);
      setScore(answers.length - data.wrongAnswers.length);
      setEarnedXp(data.xp);
      setEarnedCoins(data.coins);
      setIsComplete(true);
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
      {isComplete ? (
        <div className="overlay">
          <div className="message-box">
            <h1>Completed</h1>
            <h2>
              {score}/{answers.length}
            </h2>
            <div className="level">
              <h2>Lv{level}</h2>
            </div>
            <div className="row">
              <div className="earned">
                <p>+{earnedXp}</p>
                <p>xp earned</p>
              </div>
              <div className="earned">
                <p>+{earnedCoins}</p>
                <p>coins earned</p>
              </div>
            </div>
            {/* <p>progress</p> */}
            <div className="progressbar">
              <div className="bar-fill"></div>
            </div>
            <button
              className="btn"
              onClick={() => navigate("/profile_student", {})}
            >
              Done
            </button>
            <button className="btn">Go To Shop</button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Quiz;
