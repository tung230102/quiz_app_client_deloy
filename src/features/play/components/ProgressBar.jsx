import { Fab, Grid } from "@mui/material";
import { useQuiz } from "~/context/QuizContext";

const ProgressBar = () => {
  const { state, dispatch } = useQuiz();
  const { questions, currentQuestionIndex, listQuestionSubmitted } = state;

  const isQuestionAnswered = (questionIndex) => {
    return listQuestionSubmitted.some(
      (submitted) =>
        submitted.id === questions[questionIndex].id &&
        submitted.answersSubmittedId.length > 0
    );
  };

  return (
    <Grid item xs={12} sm={4}>
      {questions?.map((q, i) => (
        <Fab
          key={i}
          size="small"
          sx={{ m: 0.5 }}
          color={
            currentQuestionIndex === i
              ? "secondary"
              : isQuestionAnswered(i)
              ? "primary"
              : "default"
          }
          onClick={() => dispatch({ type: "GO_TO_QUESTION", payload: i })}
        >
          {i + 1}
        </Fab>
      ))}
    </Grid>
  );
};

export default ProgressBar;
