import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Grid,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/router";

import { AccountCircle, Menu as MenuIcon } from "@mui/icons-material";

import AppBarButton from "../atoms/AppBarButton";
import { BoltOutlined } from "@mui/icons-material";
import { Router } from "next/router";
import NkubaLogo from "../../src/logos/1";
const AppBarTop = () => {
  const router = useRouter();

  const handleChange = (event) => {
    setAuth(event.target.checked);
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

          {/* {router.route !== "/about" && (
            <Grid item xs={3}>
              <AppBarButton navigate="about">About</AppBarButton>
            </Grid>
          )} */}

          {router.route !== "/track" && (
            <Grid item xs={4}>
              <AppBarButton navigate="track">Track</AppBarButton>
            </Grid>
          )}

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

              {router.route !== "/login" && (
                <MenuItem onClick={() => router.push("/login")}>
                  <Typography sx={{ fontWeight: 600 }}>Login</Typography>
                </MenuItem>
              )}

              {router.route !== "/register" && (
                <MenuItem onClick={() => router.push("/register")}>
                  <Typography sx={{ fontWeight: 600 }}>Register</Typography>
                </MenuItem>
              )}
            </Menu>
          </Grid>
        </Grid>
      </Box>
    </AppBar>
  );
};

export default AppBarTop;
