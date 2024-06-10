import { Heading } from "~/common";
import { useQuiz } from "~/context/QuizContext";
import AnswerOptions from "./AnswerOptions";
import ButtonOptions from "./ButtonOptions";
import CountdownTimer from "./CountdownTimer";

const QuestionCard = () => {
  const { state } = useQuiz();
  const { currentQuestion, currentQuestionIndex } = state;

  return (
    <>
      <Heading color="black">
        {currentQuestionIndex + 1}. {currentQuestion?.title}
      </Heading>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 8,
        }}
      >
        {currentQuestion?.thumbnail_link && (
          <img
            src={currentQuestion.thumbnail_link}
            alt="thumbnail"
            style={{
              height: "auto",
              maxWidth: "100%",
              maxHeight: "300px",
              objectFit: "cover",
            }}
          />
        )}
      </div>

      <AnswerOptions />
      <CountdownTimer />
      <ButtonOptions />
    </>
  );
};

export default QuestionCard;
