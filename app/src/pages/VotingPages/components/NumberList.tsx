import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { faNumConvertor, validatePhoneNumber } from "../../../utils/faUtils";

interface INumberList {
  listNumbers: string[];
  onChange: Function;
}
export function NumberList({ listNumbers, onChange }: INumberList) {
  const { t } = useTranslation();
  const [numbers, setNumbers] = useState(listNumbers);
  const lastOne = numbers[numbers.length - 1];
  const lastOneIsOk = lastOne && validatePhoneNumber(lastOne);

  useEffect(() => {
    onChange(numbers);
  }, numbers);

  function addNewPhone() {
    setNumbers([...numbers, ""]);
  }
  function onPhoneNumberChanged(e: any, index: number) {
    const newNumbers = [...numbers];
    newNumbers[index] = faNumConvertor(e.target?.value);
    setNumbers(newNumbers);
  }
  function removeNumber(index: number) {
    const newNumbers = [...numbers];
    newNumbers.splice(index, 1);
    setNumbers(newNumbers);
  }

  return (
    <div>
      {numbers.map((phoneNum, index) => {
        return (
          <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              error={!!phoneNum && !validatePhoneNumber(phoneNum)}
              sx={{ marginTop: "1rem", flex: "auto" }}
              type="tel"
              placeholder="09129992222"
              value={phoneNum}
              onInput={(e) => {
                onPhoneNumberChanged(e, index);
              }}
              label={t("phoneNumber") + " " + (index + 1)}
              variant="standard"
            />
            {index ? (
              <IconButton
                onClick={() => {
                  removeNumber(index);
                }}
              >
                <DeleteOutline />
              </IconButton>
            ) : null}
          </Box>
        );
      })}

      <Button disabled={!lastOneIsOk} onClick={addNewPhone}>
        {t("addMorePhone")}
      </Button>
    </div>
  );
}
