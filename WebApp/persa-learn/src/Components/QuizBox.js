import React, { useEffect } from "react";

const QuizBox = ({
  questionId,
  question = "placeholder",
  details = "details here",
  options,
  answers,
  addAnswer,
}) => {
  const logToCon = async (e) => {
    // console.log(e, { props: { id: Number(e.currentTarget.id) } });
    console.log(e.currentTarget.id);
    addAnswer(questionId, e.currentTarget.id);
    // console.log("aaa");
  };

  const isAnswered = () => {
    // console.log(answers);
    let answer = { answered: false, opt: null };
    answers.map((ans) => {
      // console.log(ans);
      if (ans.questionID === questionId) {
        // console.log("found");
        answer.answered = true;
        answer.opt = ans.ans;
      }
    });

    return answer;
  };
  return (
    <div className="quiz-question">
      <div className="question-box">
        <h2>{question}</h2>
        <p>{details}</p>
      </div>
      <ol type="a" className="quiz-answers">
        {options.map((ans, i) => {
          let selected = false;
          //check if question is answered
          let isAns = isAnswered();
          // console.log(isAns);

          if (isAns.answered) {
            // console.log("found");
            selected = isAns.opt == i;
          }
          return (
            <li key={i} id={i} onClick={logToCon}>
              <div className="check-box" aria-selected={selected}></div>
              <div>{ans}</div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default QuizBox;
