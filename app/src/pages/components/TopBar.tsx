import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  removeProfile,
  selectActiveProfile,
  selectProfilesList,
  setActiveProfileIndex,
} from "../../store/profilesList";
import { useTranslation } from "react-i18next";
import {
  selectLanguage,
  setAddingNew,
  setLanguage,
} from "../../store/appSlice";

function TopBar() {
  const dispatch = useAppDispatch();
  const profilesList = useAppSelector(selectProfilesList);
  const activeProfile = useAppSelector(selectActiveProfile);
  const language = useAppSelector(selectLanguage);
  const { t, i18n } = useTranslation();
  React.useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSelectProfile = (profileIndex: number) => {
    dispatch(setActiveProfileIndex(profileIndex));
    dispatch(setAddingNew(false));
    handleCloseUserMenu();
  };
  const handleAddNewProfile = () => {
    dispatch(setAddingNew(true));
    handleCloseUserMenu();
  };
  const handleLogout = () => {
    dispatch(removeProfile(activeProfile));
    handleCloseUserMenu();
  };
  const languageChanged = (e: any) => {
    dispatch(setLanguage(e.target.value));
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            style={{ background: "Background" }}
            src="/gior/app/dist/farvahar.png"
            className="logo"
            alt="Farvahar"
          />
          <Box sx={{ flexGrow: 1 }} />
          <Select
            sx={{
              color: "white",
              outline: "none",
              fontSize: "12px",
              "& fieldset": { outline: "none", border: "none" },
            }}
            value={language}
            onChange={languageChanged}
          >
            <MenuItem value="en">EN</MenuItem>
            <MenuItem value="fa">FA</MenuItem>
          </Select>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={activeProfile?.fullName} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {profilesList.map((profile, index) => {
                return (
                  <MenuItem
                    selected={profile.verifyKey === activeProfile.verifyKey}
                    key={profile.verifyKey + "MenuItem"}
                    onClick={() => handleSelectProfile(index)}
                  >
                    <Typography textAlign="center">
                      {profile.fullName}
                    </Typography>
                  </MenuItem>
                );
              })}
              <Divider />
              <MenuItem onClick={handleAddNewProfile}>
                <Typography textAlign="center">{t("addNewProfile")}</Typography>
              </MenuItem>

              {activeProfile && (
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">
                    {t("logout")} {activeProfile.fullName}
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TopBar;
