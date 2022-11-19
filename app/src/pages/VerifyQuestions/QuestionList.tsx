import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import VerifyQuestion from "./VerifyQuestion";
import { useAppSelector } from "../../store/hooks";
import {
  selectLoadingQuestions,
  selectQuestions,
  selectQuestionsErrored,
} from "../../store/profilesList";

export default function QuestionList() {
  const questions = useAppSelector(selectQuestions);
  const loadingQuestions = useAppSelector(selectLoadingQuestions);
  const questionsErrored = useAppSelector(selectQuestionsErrored);

  if (questionsErrored) {
    return <Typography>Errored: {JSON.stringify(questionsErrored, null, 4)}</Typography>;
  } else if (loadingQuestions) {
    return <LinearProgress />;
  } else {
    return (
      <Box>
        {questions.map((qa) => (
          <VerifyQuestion key={qa.id + "queestion"} qa={qa} />
        ))}
      </Box>
    );
  }
}
