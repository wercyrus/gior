import { useAppSelector } from "../store/hooks";
import { selectActiveProfile, selectProfilesList } from "../store/profilesList";
import TopBar from "./components/TopBar";
import VerifyQuestions from "./VerifyQuestions";
import { AddNewPersion } from "./VotingPages";
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from "@mui/material/Box";
import { useMemo } from "react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import "./App.css";
import { selectAddingNew, selectLanguage } from "../store/appSlice";
import { RECAPTCHA_KEY } from "../consts";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const language = useAppSelector(selectLanguage);
  const isRtl = language === "fa";
  const direction = isRtl ? "rtl" : "ltr";
  const theme = useMemo(
    () =>
      createTheme({
        direction,
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          // mode: "dark",
          primary: {
            main: "#1155cc",
          },
          secondary: {
            main: "#1a237e",
          },
        },
      }),
    [prefersDarkMode, direction]
  );
  // Create rtl cache
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const addingNew = useAppSelector(selectAddingNew);
  const activeProfile = useAppSelector(selectActiveProfile);
  const profiles = useAppSelector(selectProfilesList);
  const Parent = isRtl ? CacheProvider : Box;
  return (
    <Parent value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
          <div className="App" style={{ direction }}>
            <TopBar />
            {addingNew || !profiles?.length ? (
              <AddNewPersion />
            ) : activeProfile ? (
              <VerifyQuestions />
            ) : (
              <></>
            )}
          </div>
        </GoogleReCaptchaProvider>
      </ThemeProvider>
    </Parent>
  );
}

export default App;
