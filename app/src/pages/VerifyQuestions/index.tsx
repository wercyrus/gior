import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadQuestions, selectActiveProfile } from "../../store/profilesList";
import QuestionList from "./QuestionList";

export default function () {
  const activeProfile = useAppSelector(selectActiveProfile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (activeProfile.publicKey) {
      dispatch(loadQuestions(activeProfile.publicKey));
    }
  }, [activeProfile?.publicKey]);

  if (!activeProfile) {
    return <></>;
  }
  const { fullName, verifyKey } = activeProfile;
  return (
    <Box sx={{ textAlign: "center", maxWidth: "600px", margin: "auto" }}>
      <Typography mt={4} variant="h3">
        {fullName}
      </Typography>
      <Typography variant="subtitle1" sx={{ overflowWrap: "anywhere" }}>
        {verifyKey}
      </Typography>
      <QuestionList />
    </Box>
  );
}
