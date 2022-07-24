import { useEffect, useMemo, useState } from "react";
import "./app.css";
import Quiz from "./components/Quiz";
import Timer from "./components/Timer";
import Start from "./components/Start";
import { data } from "./question";

function App() {
  const [userName, setUserName] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("₹ 0");

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "₹10,000" },
        { id: 2, amount: "₹20,000" },
        { id: 3, amount: "₹50,000" },
        { id: 4, amount: "₹100,000" },
        { id: 5, amount: "₹200,000" },
        { id: 6, amount: "₹500,000" },
        { id: 7, amount: "₹10,00,000" },
        { id: 8, amount: "₹20,00,000" },
        { id: 9, amount: "₹50,00,000" },
        { id: 10, amount: "₹100,00,000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    if (questionNumber > 10) setStop(true);
    if (questionNumber > 1) {
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
    }
  }, [moneyPyramid, questionNumber]);
  return (
    <div className="app">
      {userName ? (
        <>
          <div className="main">
            {stop ? (
              <div className="endText">
                <h1>🎉🎉🎉🎉</h1>
                <h1>You Earned: {earned} </h1>
              </div>
            ) : (
              <>
                <div className="top">
                  <div className="heading">Welcome to Cricket Quiz🏏</div>
                  <div className="timer">
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                </div>
                <div className="bottom">
                  <Quiz
                    data={data}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setStop={setStop}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((m) => (
                <li
                  className={
                    questionNumber === m.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNumber ">{m.id} </span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Start setUserName={setUserName} />
      )}
    </div>
  );
}

export default App;
