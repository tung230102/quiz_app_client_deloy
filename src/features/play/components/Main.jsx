import { Box, Container, Grid } from "@mui/material";
import { useQuiz } from "~/context/QuizContext";
import Error from "./Error";
import Loader from "./Loader";
import QuestionCard from "./QuestionCard";
import StartScreen from "./StartScreen";
import Header from "./Header";
import FinishScreen from "./FinishScreen";
import ProgressBar from "./ProgressBar";

const Main = () => {
  const { state } = useQuiz();
  const { status } = state;

  return (
    <Container sx={{ margin: "40px auto" }}>
      {status === "loading" && (
        <>
          <Header />
          <Loader />
        </>
      )}
      {status === "error" && (
        <>
          <Header />
          <Loader />
          <Error />
        </>
      )}
      {status === "ready" && (
        <>
          <Header />
          <StartScreen />
        </>
      )}
      {status === "active" && (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <ProgressBar />

            <Grid item xs={12} sm={8}>
              <QuestionCard />
            </Grid>
          </Grid>
        </Box>
      )}
      {status === "finished" && (
        <>
          <Header />
          <FinishScreen />
        </>
      )}
    </Container>
  );
};

export default Main;
