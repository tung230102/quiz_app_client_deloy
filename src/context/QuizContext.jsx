import { createContext, useContext, useReducer } from "react";
import { questionsSubmit } from "~/api";
import { showToast } from "~/common";
import { statusCode } from "~/constants";

const QuizContext = createContext();
const TIME_QUESTIONS = 15;
const initialState = {
  questions: [],
  status: "loading",
  currentQuestion: {},
  currentQuestionIndex: 0,
  numberOfQuestions: 0,
  secondsRemaining: null,
  nextQuestion: {},
  previousQuestion: {},
  listQuestionSubmitted: [],
  listQuestionChecked: [],
  totalScore: 0,
  highScore: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "DATA_RECEIVED":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        numberOfQuestions: action.payload.length,
        secondsRemaining: action.payload.length * TIME_QUESTIONS,
      };
    case "DATA_FAILED":
      return {
        ...state,
        status: "error",
      };
    case "START":
      return {
        ...state,
        status: "active",
        currentQuestion: state.questions[state.currentQuestionIndex],
        nextQuestion:
          state.currentQuestionIndex < state.questions.length - 1
            ? state.questions[state.currentQuestionIndex + 1]
            : null,
        previousQuestion:
          state.currentQuestionIndex > 0
            ? state.questions[state.currentQuestionIndex - 1]
            : null,
      };
    case "NEXT_QUESTION":
      const nextIndex = state.currentQuestionIndex + 1;
      return {
        ...state,
        currentQuestionIndex: nextIndex,
        currentQuestion: state.questions[nextIndex],
        nextQuestion:
          nextIndex < state.questions.length - 1
            ? state.questions[nextIndex + 1]
            : null,
        previousQuestion: nextIndex > 0 ? state.questions[nextIndex - 1] : null,
      };
    case "PREVIOUS_QUESTION":
      const prevIndex = state.currentQuestionIndex - 1;
      return {
        ...state,
        currentQuestionIndex: prevIndex,
        currentQuestion: state.questions[prevIndex],
        nextQuestion:
          prevIndex < state.questions.length - 1
            ? state.questions[prevIndex + 1]
            : null,
        previousQuestion: prevIndex > 0 ? state.questions[prevIndex - 1] : null,
      };
    case "GO_TO_QUESTION":
      return {
        ...state,
        currentQuestionIndex: action.payload,
        currentQuestion: state.questions[action.payload],
        nextQuestion:
          action.payload < state.questions.length - 1
            ? state.questions[action.payload + 1]
            : null,
        previousQuestion:
          action.payload > 0 ? state.questions[action.payload - 1] : null,
      };
    case "CHOOSE_ANSWER": {
      const { questionId, answerId } = action.payload;

      const questionIndex = state.listQuestionSubmitted.findIndex(
        (q) => q.id === questionId
      );

      if (questionIndex !== -1) {
        const updatedQuestions = [...state.listQuestionSubmitted];
        const currentAnswers =
          updatedQuestions[questionIndex].answersSubmittedId;

        const updatedAnswers = currentAnswers.includes(answerId)
          ? currentAnswers.filter((id) => id !== answerId)
          : [...currentAnswers, answerId];

        updatedQuestions[questionIndex] = {
          ...updatedQuestions[questionIndex],
          answersSubmittedId: updatedAnswers,
        };

        return {
          ...state,
          listQuestionSubmitted: updatedQuestions,
        };
      } else {
        return {
          ...state,
          listQuestionSubmitted: [
            ...state.listQuestionSubmitted,
            {
              id: questionId,
              answersSubmittedId: [answerId],
            },
          ],
        };
      }
    }
    case "FINISH":
      return {
        ...state,
        listQuestionChecked: action.payload?.listQuestionChecked,
        totalScore: action.payload?.totalScore,
        highScore:
          action.payload?.totalScore > state.highScore
            ? action.payload?.totalScore
            : state.highScore,
        status: "finished",
      };
    case "RESTART":
      return {
        ...initialState,
        highScore: state.highScore,
        status: "loading",
      };
    case "TICK":
      const newSecondsRemaining = state.secondsRemaining - 1;
      if (newSecondsRemaining <= 0) {
        action.handleSubmitQuestion({
          listQuestionSubmitted: state.listQuestionSubmitted,
        });
        return {
          ...state,
          status: "finished",
        };
      }
      return {
        ...state,
        secondsRemaining: newSecondsRemaining,
      };

    default:
      return state;
  }
};

// eslint-disable-next-line react/prop-types
const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmitQuestion = (data) => {
    questionsSubmit(data).then((res) => {
      if (res?.statusCode === statusCode.BAD_REQUEST) {
        dispatch({ type: "DATA_FAILED" });
        showToast(res?.message, "error");
      } else if (res?.statusCode === statusCode.OK) {
        showToast(res?.message || "Submit Question success!");
        dispatch({ type: "FINISH", payload: res?.data });
      } else {
        showToast("Submit Question failed!", "error");
      }
    });
  };

  const value = { state, dispatch, handleSubmitQuestion };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("Quiz context use outside QuizProvider");
  return context;
};

export { QuizProvider, useQuiz };
