import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changedBasicInfo, selectBasicInfo } from "../../store/newProfile";
import { faNumConvertor, isValidNationalCode } from "../../utils/faUtils";

export function BasicInfo() {
  return (
    <>
      <InfoField name="name" />
      <InfoField name="family" />
      <InfoField name="id" validator={isValidNationalCode} />
    </>
  );
}

function InfoField(props: any) {
  const { validator, name, ...rest } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const basicInfo: any = useAppSelector(selectBasicInfo);
  const sx = {
    marginTop: "2.5rem",
  };
  return (
    <TextField
      label={t(name)}
      error={validator && basicInfo?.[name] && !validator(basicInfo?.[name])}
      fullWidth
      variant="standard"
      sx={sx}
      value={basicInfo?.[name]}
      onInput={(e: any) => {
        const value = faNumConvertor(e.target?.value);
        dispatch(changedBasicInfo({ [name]: value }));
      }}
      {...rest}
    />
  );
}
