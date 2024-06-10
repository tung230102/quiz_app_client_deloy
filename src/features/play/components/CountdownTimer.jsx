import { useEffect } from "react";
import { useQuiz } from "~/context/QuizContext";

const timerStyle = {
  float: "left",
  fontSize: "16px",
  border: "1px solid #ccc",
  padding: "8px 16px",
  borderRadius: "40px",
};

function CountdownTimer() {
  const { dispatch, state, handleSubmitQuestion } = useQuiz();
  const { secondsRemaining } = state;

  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({
        type: "TICK",
        handleSubmitQuestion,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch, handleSubmitQuestion]);

  return (
    <div style={timerStyle}>
      {mins < 10 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}
    </div>
  );
}

export default CountdownTimer;
