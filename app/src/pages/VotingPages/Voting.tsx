import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { generateKeys, selectVote, setVote } from "../../store/newProfile";

export function Voting() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const vote = useAppSelector(selectVote);

  return (
    <>
      <Typography variant="h5">{t("voteSubject")}</Typography>
      <Box mt={4}>
        <Button
          variant={vote === "yes" ? "contained" : "outlined"}
          onClick={async () => {
            await dispatch(setVote("yes"));
            dispatch(generateKeys());
          }}
        >
          {t("yes")}
        </Button>
        <Button
          variant={vote === "no" ? "contained" : "outlined"}
          onClick={async () => {
            await dispatch(setVote("no"));
            dispatch(generateKeys());
          }}
        >
          {t("no")}
        </Button>
      </Box>
    </>
  );
}
