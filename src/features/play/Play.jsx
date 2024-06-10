import { useTitleDynamic } from "~/hooks";
import Main from "./components/Main";
import { QuizProvider } from "~/context/QuizContext";

function Play() {
  useTitleDynamic("Play");

  return (
    <QuizProvider>
      <Main />
    </QuizProvider>
  );
}

export default Play;
