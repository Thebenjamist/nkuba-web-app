import * as React from "react";
import {
  AppBar,
  Box,
  Typography,
  Grid,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/router";

import MenuIcon from "@mui/icons-material/Menu";

import AppBarButton from "../atoms/AppBarButton";
import NkubaLogo from "../../src/logos/1";
import { UserContext } from "../../services/contexts/userContext";
import { signOut } from "../../services/api/users";
import cookie from "js-cookie";
import clear from "../../utils/helpers/auth/clearCookies";
import { useSnackbar } from "notistack";

const AppBarTop = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { session, setSession } = React.useContext(UserContext);

  const backToCommon = async () => {
    if (
      router.route !== "/track" &&
      router.route !== "/" &&
      router.route !== "/register" &&
      router.route !== "/login"
    ) {
      await router.push("/");
    }
  };

  const signOutUser = () => {
    const data = {
      token: cookie.get("nkuba-access-token"),
    };
    setSession("loading");
    signOut({ data })
      .then(() => {
        enqueueSnackbar("Signed out", { variant: "success" });
        clear();
        backToCommon().then(() => setSession(false));
      })
      .catch(() => {
        enqueueSnackbar("Signed out", { variant: "success" });
        clear();
        backToCommon().then(() => setSession(false));
      });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      position="relative"
      sx={{
        backgroundColor: "secondary.main",

        justifyContent: "center",
        height: "56px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: "16px",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
          }}
        >
          <NkubaLogo height={50} />
        </Grid>

        {session !== "loading" && (
          <>
            <Grid
              container
              sx={{
                display: { xs: "none", sm: "flex" },
                justifyContent: "center",
              }}
            >
              {router.route !== "/" && (
                <Grid item xs={4}>
                  <AppBarButton navigate="/">Order</AppBarButton>
                </Grid>
              )}

              {router.route !== "/track" && (
                <Grid item xs={4}>
                  <AppBarButton navigate="track">Track</AppBarButton>
                </Grid>
              )}
              {!session ? (
                <>
                  {router.route !== "/login" && (
                    <Grid item xs={4}>
                      <AppBarButton navigate="login">Login</AppBarButton>
                    </Grid>
                  )}

                  {router.route !== "/register" && (
                    <Grid item xs={4}>
                      <AppBarButton navigate="register">Register</AppBarButton>
                    </Grid>
                  )}
                </>
              ) : (
                <>
                  {!router.route.includes("/profile") && (
                    <Grid item xs={4}>
                      <AppBarButton navigate="profile">Profile</AppBarButton>
                    </Grid>
                  )}
                  <Grid item xs={4}>
                    <AppBarButton action={() => signOutUser()}>
                      Sign Out
                    </AppBarButton>
                  </Grid>
                </>
              )}
            </Grid>

            <Grid
              container
              sx={{
                display: { xs: "flex", sm: "none" },
                justifyContent: "flex-end",
              }}
            >
              <Grid item xs={4}>
                <IconButton
                  size="large"
                  onClick={handleMenu}
                  sx={{
                    height: "100%",
                    color: "text.primary",
                  }}
                >
                  <MenuIcon />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {router.route !== "/" && (
                    <MenuItem onClick={() => router.push("/")}>
                      <Typography sx={{ fontWeight: 600 }}>Order</Typography>
                    </MenuItem>
                  )}
                  {router.route !== "/track" && (
                    <MenuItem onClick={() => router.push("/track")}>
                      <Typography sx={{ fontWeight: 600 }}>Track</Typography>
                    </MenuItem>
                  )}

                  {!session ? (
                    <>
                      {router.route !== "/login" && (
                        <MenuItem onClick={() => router.push("/login")}>
                          <Typography sx={{ fontWeight: 600 }}>
                            Login
                          </Typography>
                        </MenuItem>
                      )}

                      {router.route !== "/register" && (
                        <MenuItem onClick={() => router.push("/register")}>
                          <Typography sx={{ fontWeight: 600 }}>
                            Register
                          </Typography>
                        </MenuItem>
                      )}
                    </>
                  ) : (
                    <>
                      {router.route !== "/profile" && (
                        <MenuItem onClick={() => router.push("/profile")}>
                          <Typography sx={{ fontWeight: 600 }}>
                            Profile
                          </Typography>
                        </MenuItem>
                      )}

                      <MenuItem onClick={() => signOutUser()}>
                        <Typography sx={{ fontWeight: 600 }}>
                          Sign out
                        </Typography>
                      </MenuItem>
                    </>
                  )}
                </Menu>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </AppBar>
  );
};

export default AppBarTop;
