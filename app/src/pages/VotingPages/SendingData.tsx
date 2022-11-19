import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectAgreements,
  selectBasicInfo,
  selectContacts,
  selectPublicKey,
  selectTpKey,
  selectVerifyKey,
  setAgreements,
} from "../../store/newProfile";
import { useTranslation } from "react-i18next";

export function SendingData() {
  const { t } = useTranslation();
  const basicInfo = useAppSelector(selectBasicInfo);
  const publicKey = useAppSelector(selectPublicKey);
  const tpKey = useAppSelector(selectTpKey);
  const verifyKey = useAppSelector(selectVerifyKey);
  const contacts = useAppSelector(selectContacts);
  const agreements = useAppSelector(selectAgreements);
  const dispatch = useAppDispatch();

  return (
    <>
      <Typography variant="h6">
        {t("aboutTheDataGoingToSend")}
      </Typography>

      <Box my={4}>
        <SendItem name={t("name")} value={basicInfo.name} />
        <SendItem name={t("family")} value={basicInfo.family} />
        <SendItem name={t("id")} value={basicInfo.id} />
        <SendItem
          name={t("phoneNumbers")}
          value={contacts.numbers.join(" , ")}
        />
        <SendItem
          name={t("contacts")}
          value={contacts.contactList.length + " " + t("contact")}
        />
        <SendItem name={t("tpKey")} value={tpKey} />
        <SendItem name={t("publicKey")} value={publicKey} />
        <SendItem name={t("verifyKey")} value={verifyKey} />
      </Box>

      <FormControlLabel
        control={
          <Checkbox
            onChange={(e) => {
              dispatch(setAgreements({ agreedSendData: e.target.checked }));
            }}
            checked={agreements.agreedSendData}
          />
        }
        label={t("checkedSendData")}
      />
    </>
  );
}

function SendItem({ name, value }: { name: string; value: string }) {
  return (
    <div>
      <small style={{ color: "grey.500" }}>{name}: </small>
      <strong style={{ overflowWrap: "anywhere" }}>{value}</strong>
    </div>
  );
}
