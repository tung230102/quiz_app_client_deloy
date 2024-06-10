import { Grid, Paper, Typography } from "@mui/material";
import { CommonButton, Heading } from "~/common";
import { useQuiz } from "~/context/QuizContext";

const stylePaper = {
  margin: "20px auto",
  padding: "20px",
  minWidth: "360px",
  maxWidth: "400px",
};

const difficultyColorMap = {
  easy: "success",
  medium: "warning",
  hard: "error",
};

const StyleGrid = ({ strong, color, text }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <strong>{strong}</strong>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6" sx={{ color: `${color}.main` }}>
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
};

const StartScreen = () => {
  const { state, dispatch } = useQuiz();
  const { questions, numberOfQuestions, secondsRemaining } = state;
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  const difficulty = questions[0]?.difficulty || "N/A";
  const difficultyColor = difficultyColorMap[difficulty] || "text.primary";
  const category = questions[0]?.category || "N/A";

  return (
    <Paper elevation={10} sx={stylePaper}>
      <Heading color="black">Quiz Info</Heading>
      <StyleGrid
        strong="Number of questions"
        color="info"
        text={numberOfQuestions}
      />
      <StyleGrid strong="Category" color="secondary" text={category} />
      <StyleGrid
        strong="Difficulty"
        color={difficultyColor}
        text={difficulty}
      />
      <StyleGrid
        strong="Time"
        text={mins > 0 ? `${mins} mins` : `${secs} secs`}
      />

      <CommonButton
        fullWidth
        sx={{ mt: 1 }}
        onClick={() => dispatch({ type: "START" })}
      >
        Start
      </CommonButton>
    </Paper>
  );
};

export default StartScreen;
