import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectActiveStep,
  selectProfile,
  setActiveStep,
} from "../../../store/newProfile";
import {
  isValidNationalCode,
  validatePhoneNumber,
} from "../../../utils/faUtils";
import { useTranslation } from "react-i18next";

interface IStepperProps {
  steps: string[];
  onFinish: Function;
}
export default function Stepper({ onFinish, steps }: IStepperProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const activeStep = useAppSelector(selectActiveStep);
  const profile = useAppSelector(selectProfile);
  const theme = useTheme();
  const lastStep = steps.length - 1;

  const handleNext = () => {
    if (activeStep === lastStep) {
      onFinish();
    } else {
      dispatch(setActiveStep(activeStep + 1));
    }
  };
  const nextDisabled = React.useMemo(() => {
    if (activeStep === 0) {
      return (
        !(profile.basicInfo.name?.length > 2) ||
        !(profile.basicInfo.family?.length > 2) ||
        !profile.basicInfo.id ||
        !isValidNationalCode(profile.basicInfo.id)
      );
    } else if (activeStep === 1) {
      const numbers = profile.contacts.numbers
      return !numbers[0] || numbers.find((number) => {
        return !number || !validatePhoneNumber(number);
      });
    } else if (activeStep === 2) {
      return !profile.vote;
    } else if (activeStep === 3) {
      return !profile.agreements.agreedPrivateKeyCopied;
    } else if (activeStep === 4) {
      return !profile.agreements.agreedSendData;
    }
  }, [activeStep, profile]);

  const handleBack = () => {
    dispatch(setActiveStep(activeStep - 1));
  };
  return (
    <MobileStepper
      variant="progress"
      steps={steps.length}
      position="static"
      activeStep={activeStep}
      sx={{ maxWidth: 400, minWidth: 300, flexGrow: 1, borderRadius: ".5rem" }}
      nextButton={
        <Button size="small" onClick={handleNext} disabled={!!nextDisabled}>
          {activeStep === lastStep ? t("sendVote") : t("next")}
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          {t("back")}
        </Button>
      }
    />
  );
}
