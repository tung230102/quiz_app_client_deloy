import { CommonButton } from "~/common";
import { useQuiz } from "~/context/QuizContext";

const ButtonOptions = () => {
  const { state, dispatch, handleSubmitQuestion } = useQuiz();
  const {
    questions,
    nextQuestion,
    previousQuestion,
    currentQuestionIndex,
    listQuestionSubmitted,
  } = state;

  const handleNextButtonClick = () => {
    if (nextQuestion) {
      dispatch({ type: "NEXT_QUESTION" });
    }
  };

  const handlePreviousButtonClick = () => {
    if (previousQuestion) {
      dispatch({ type: "PREVIOUS_QUESTION" });
    }
  };

  return (
    <>
      {currentQuestionIndex === questions?.length - 1 && (
        <CommonButton
          sx={{ float: "right" }}
          color="success"
          onClick={() => handleSubmitQuestion({ listQuestionSubmitted })}
        >
          End Quiz
        </CommonButton>
      )}
      {nextQuestion && (
        <CommonButton
          sx={{ float: "right" }}
          color="success"
          onClick={handleNextButtonClick}
        >
          Next
        </CommonButton>
      )}
      <CommonButton
        sx={{ float: "right", mr: 1 }}
        disabled={!previousQuestion}
        onClick={handlePreviousButtonClick}
      >
        Prev
      </CommonButton>
    </>
  );
};

export default ButtonOptions;
