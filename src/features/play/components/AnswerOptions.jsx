import React from "react";
import { CommonButton } from "~/common";
import { useQuiz } from "~/context/QuizContext";

const AnswerOptions = () => {
  const { state, dispatch } = useQuiz();
  const { currentQuestion, listQuestionSubmitted } = state;

  const selectedAnswers =
    listQuestionSubmitted.find((q) => q.id === currentQuestion.id)
      ?.answersSubmittedId || [];

  const handleChooseAnswer = (answerId) => {
    dispatch({
      type: "CHOOSE_ANSWER",
      payload: { questionId: currentQuestion.id, answerId },
    });
  };

  return (
    <>
      {currentQuestion?.answers?.map((option) => (
        <CommonButton
          sx={{ mb: 1 }}
          fullWidth
          key={option.id}
          color={selectedAnswers.includes(option.id) ? "primary" : "inherit"}
          onClick={() => handleChooseAnswer(option.id)}
        >
          {option.content}
        </CommonButton>
      ))}
    </>
  );
};

export default AnswerOptions;
