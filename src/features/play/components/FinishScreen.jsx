import { Box, Grid, Paper, Typography } from "@mui/material";
import { CommonButton, Heading } from "~/common";
import { useQuiz } from "~/context/QuizContext";

const stylePaper = {
  margin: "20px auto",
  padding: "20px",
  minWidth: "360px",
  maxWidth: "400px",
};

const stylePaper2 = {
  margin: "20px auto",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "480px",
  overflowY: "scroll",
  // scrollbarWidth: "none",
  minWidth: "360px",
  maxWidth: "600px",
};

const StyleGrid = ({ strong, color, text }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <strong>{strong}</strong>
      </Grid>
      <Grid item xs={4}>
        <Typography
          textAlign="right"
          variant="h6"
          sx={{ color: `${color}.main` }}
        >
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
};

const FinishScreen = () => {
  const { state, dispatch } = useQuiz();
  const {
    numberOfQuestions,
    totalScore,
    highScore,
    listQuestionChecked,
    listQuestionSubmitted,
  } = state;

  const percentage = (totalScore / 10) * 100;
  const roundedTotalScore = totalScore?.toFixed(2);

  let emoji;
  if (percentage === 100) emoji = "🥳👌";
  if (percentage >= 80 && percentage < 100) emoji = "👍";
  if (percentage >= 50 && percentage < 80) emoji = "👌";
  if (percentage >= 0 && percentage < 50) emoji = "👎";
  if (percentage === 0) emoji = "🤯";

  const correctAnswers = listQuestionChecked.filter((question) =>
    question.answers.some(
      (option) => option.is_correct && option.is_submit_correct
    )
  ).length;

  const wrongAnswers = listQuestionChecked.filter((question) =>
    question.answers.some(
      (option) => !option.is_correct && option.is_submit_correct
    )
  ).length;

  const totalAnswersSubmitted = listQuestionSubmitted.reduce(
    (total, question) => total + question.answersSubmittedId.length,
    0
  );

  return (
    <>
      <Paper elevation={10} sx={stylePaper}>
        <Heading color="black">Your Final score</Heading>
        <Heading variant="h6">
          (High score: {highScore?.toFixed(2)} points)
        </Heading>
        <Heading variant="body1">
          <span>{emoji}</span> You scored{" "}
          <strong>{roundedTotalScore || 0}</strong> out of {10} points. (
          {Math.ceil(percentage) || 0}%)
        </Heading>
        <StyleGrid strong="Total Questions" text={numberOfQuestions} />
        <StyleGrid
          strong="Correct Answer"
          color="success"
          text={correctAnswers}
        />
        <StyleGrid strong="Wrong Answer" color="error" text={wrongAnswers} />
        <StyleGrid
          strong="Answer Submitted"
          color="info"
          text={totalAnswersSubmitted}
        />

        <CommonButton
          fullWidth
          sx={{ mt: 1 }}
          onClick={() => dispatch({ type: "RESTART" })}
        >
          Restart
        </CommonButton>
      </Paper>

      <Paper elevation={10} sx={stylePaper2}>
        {listQuestionChecked &&
          listQuestionChecked?.map((question, index) => (
            <Box key={question?.id} width="100%">
              <Heading color="black">
                {index + 1}. {question?.title}
              </Heading>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: 8,
                }}
              >
                {question?.thumbnail_link && (
                  <img
                    src={question.thumbnail_link}
                    alt="thumbnail"
                    style={{
                      height: "auto",
                      maxWidth: "100%",
                      maxHeight: "300px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </Box>

              {question?.answers?.map((option) => (
                <CommonButton
                  key={option.id}
                  fullWidth
                  sx={{ mb: 1 }}
                  color={getOptionColor(option)}
                >
                  {option.content}
                </CommonButton>
              ))}
            </Box>
          ))}
      </Paper>
    </>
  );
};

const getOptionColor = (option) => {
  if (option.is_correct && option.is_submit_correct) {
    return "success";
  } else if (!option.is_correct && option.is_submit_correct) {
    return "error";
  } else if (option.is_correct && !option.is_submit_correct) {
    return "info";
  } else {
    return "inherit";
  }
};

export default FinishScreen;
