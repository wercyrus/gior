import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Contacts } from "./Contacts";
import { Voting } from "./Voting";
import { BasicInfo } from "./BasicInfo";
import { PrivateKey } from "./PrivateKey";
import Stepper from "./components/Stepper";
import {
  resetNewProfile,
  selectActiveStep,
  selectProfile,
} from "../../store/newProfile";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { SendingData } from "./SendingData";
import { IAddedProfile, IPostProfileData } from "../../store/types";
import { addNewProfile } from "../../store/profilesList";
import { StepsContainer } from "./components/StepsContainer";
import { useTranslation } from "react-i18next";
import { setAddingNew } from "../../store/appSlice";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { useState } from "react";
import { sendNewProfile } from "../../api/sendProfile";

export function AddNewPersion() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [recaptchaToken, setToken] = useState("");
  const profile = useAppSelector(selectProfile);
  const activeStep = useAppSelector(selectActiveStep);

  const steps = [
    t("steps.basic"),
    t("steps.numbers"),
    t("steps.vote"),
    t("steps.privateKey"),
    t("steps.submit"),
  ];

  function onFinish() {
    const { basicInfo, contacts, keys } = profile;
    sendNewProfile(recaptchaToken, profile).then(() => {
      const remainProfileData: IAddedProfile = {
        fullName: basicInfo.name + " " + basicInfo.family,
        verifyKey: keys.verify,
        publicKey: keys.public,
        questions: [],
      };
      dispatch(addNewProfile(remainProfileData));
      dispatch(setAddingNew(false));
      dispatch(resetNewProfile());
    }).catch(e => {
      console.log(e);
    })
  }

  const pages = [BasicInfo, Contacts, Voting, PrivateKey, SendingData];
  const ActiveStepComponent = pages[activeStep];

  return (
    <div>
      <GoogleReCaptcha onVerify={setToken} />
      <Typography variant="h5" my={3} textAlign="center">
        {steps[activeStep]}
      </Typography>
      <StepsContainer>
        <ActiveStepComponent />
      </StepsContainer>
      <Box sx={{ margin: "1rem 0", display: "flex", justifyContent: "center" }}>
        <Stepper steps={steps} onFinish={onFinish} />
      </Box>
    </div>
  );
}
