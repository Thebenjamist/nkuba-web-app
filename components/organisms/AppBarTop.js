import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Grid,
  Hidden,
} from "@mui/material";
import { useRouter } from "next/router";

import AppBarButton from "../atoms/AppBarButton";
import { BoltOutlined } from "@mui/icons-material";
import { Router } from "next/router";
import NkubaLogo from "../../src/logos/1";
const AppBarTop = () => {
  const router = useRouter();
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
          padding: "0px 16px",
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
            display: "flex",
            justifyContent: "center",
          }}
        >
          {router.route !== "/" && (
            <Grid item xs={12}>
              <AppBarButton navigate="/">Order</AppBarButton>
            </Grid>
          )}

          {/* {router.route !== "/about" && (
            <Grid item xs={3}>
              <AppBarButton navigate="about">About</AppBarButton>
            </Grid>
          )} */}

          {router.route !== "/track" && (
            <Grid item xs={12}>
              <AppBarButton navigate="track">Track</AppBarButton>
            </Grid>
          )}

          {/* {router.route !== "/register" && (
            <Grid item xs={3}>
              <AppBarButton navigate="register">Register</AppBarButton>
            </Grid>
          )}
          {router.route !== "/login" && (
            <Grid item xs={3}>
              <AppBarButton navigate="login">Login</AppBarButton>
            </Grid>
          )} */}
        </Grid>
      </Box>
    </AppBar>
  );
};

export default AppBarTop;
