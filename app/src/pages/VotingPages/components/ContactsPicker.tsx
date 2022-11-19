import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import { isMobileOrTablet } from "../../../utils/utils";

export interface IContact {
  name: string[];
  tel: string[];
  email: string[];
}

const support = "contacts" in navigator;

const hasContacts = isMobileOrTablet();

export function ContactsPicker({ onChange }: { onChange: Function }) {
  const { t } = useTranslation();
  async function showContacts() {
    try {
      const navContacts = (navigator as any).contacts;
      const contacts: IContact[] = await navContacts.select(
        ["name", "email", "tel"],
        { multiple: true }
      );
      onChange(contacts);
    } catch (ex) {
      // Handle any errors here.
    }
  }
  const hint = support
    ? "hintToAddContacts"
    : hasContacts
    ? "notSupported"
    : "notSupportedDesktop";
  return (
    <>
      <Typography mt={5} mb={1}>
        {t(hint)}
      </Typography>
      <Button disabled={!support} variant="outlined" onClick={showContacts}>
        {t("contacts")}
      </Button>
    </>
  );
}
