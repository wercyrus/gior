import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";

import { useTranslation } from "react-i18next";
import {
  IGoogleReCaptchaConsumerProps,
  withGoogleReCaptcha,
} from "react-google-recaptcha-v3";

import { IVerifyQuestionData } from "../../store/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { postAnswer } from "../../store/profilesList";
import { selectPublicKey } from "../../store/newProfile";

interface IVerifyQuestion {
  qa: IVerifyQuestionData;
  googleReCaptchaProps?: IGoogleReCaptchaConsumerProps;
}
function VerifyQuestion({ qa, googleReCaptchaProps }: IVerifyQuestion) {
  const [answer, setAnswer] = useState("");
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const publicKey = useAppSelector(selectPublicKey);
  function submitAnswer(e: any) {
    e.preventDefault();
    e.stopPropagation();
    const { executeRecaptcha } = googleReCaptchaProps || {};
    if (!executeRecaptcha) {
      console.log("Recaptcha has not been loaded");
      return;
    }
    executeRecaptcha("answerVerifyQuestion").then((token) => {
      dispatch(
        postAnswer({
          questionId: qa.id,
          publicKey,
          answer,
          recaptchaToken: token,
        })
      );
    });
    return false;
  }
  return (
    <Box
      sx={{
        margin: "2rem 0",
        border: "1px solid",
        borderColor: "action.disabledBackground",
        bgcolor: "background.default",
        padding: "6rem 4rem",
        borderRadius: "1rem",
      }}
    >
      <Typography variant="h6" textAlign={"initial"}>{qa.question}</Typography>
      {qa.answer ? (
        <Typography>{qa.answer}</Typography>
      ) : (
        <Box component="form" onSubmit={submitAnswer}>
          <div>
            <RadioGroup
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              aria-labelledby="radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              {qa?.options?.map((option, index) => {
                return (
                  <FormControlLabel
                    key={qa.id + "opt" + index}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                );
              })}
            </RadioGroup>
            <Button
              disabled={!answer}
              variant="outlined"
              type="submit"
              sx={{ padding: ".7rem", margin: "1rem 0" }}
            >
              {t("submitAnswer")}
            </Button>
          </div>
        </Box>
      )}
    </Box>
  );
}

export default withGoogleReCaptcha(VerifyQuestion);
