import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import ContentCopyOutlined from "@mui/icons-material/ContentCopyOutlined";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectAgreements,
  selectPrivateKey,
  setAgreements,
} from "../../store/newProfile";
import { useTranslation } from "react-i18next";

export function PrivateKey() {
  const { t } = useTranslation();
  const privateKey = useAppSelector(selectPrivateKey);
  const agreements = useAppSelector(selectAgreements);
  const dispatch = useAppDispatch();

  return (
    <>
      <Typography variant="body1">{t("introducePrivateKey")}</Typography>
      <Box sx={{ display: "flex", alignItems: "center", margin: "2rem 0" }}>
        <IconButton
          aria-label={t("copyToClipboard")}
          onClick={() => {
            navigator.clipboard.writeText(privateKey);
          }}
        >
          <ContentCopyOutlined />
        </IconButton>
        <Typography sx={{ overflowWrap: "anywhere" }}>{privateKey}</Typography>
      </Box>

      <FormControlLabel
        color="Background"
        control={
          <Checkbox
            onChange={(e) => {
              dispatch(
                setAgreements({ agreedPrivateKeyCopied: e.target.checked })
              );
            }}
            checked={agreements.agreedPrivateKeyCopied}
          />
        }
        label={t("checkHaveCopied")}
      />
    </>
  );
}
