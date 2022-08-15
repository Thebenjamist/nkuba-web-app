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

import AppBarButton from "../atoms/AppBarButton";
import { BoltOutlined } from "@mui/icons-material";

const AppBarTop = () => {
  return (
    <AppBar
      position="relative"
      sx={{
        backgroundColor: "background.paper",
        justifyContent: "center",
        height: "100px",
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
          sx={{ display: "flex", justifyContent: "left", alignItems: "center" }}
        >
          <BoltOutlined sx={{ fontSize: 48 }} color="primary" />
          <Typography variant="h4">Nkuba Logistics</Typography>
        </Grid>

        <Grid container sx={{ display: { xs: "none", sm: "flex" } }}>
          <Grid item xs={3}>
            <AppBarButton>About</AppBarButton>
          </Grid>
          <Grid item xs={3}>
            <AppBarButton>Track</AppBarButton>
          </Grid>
          <Grid item xs={3}>
            <AppBarButton>Register</AppBarButton>
          </Grid>
          <Grid item xs={3}>
            <AppBarButton>Login</AppBarButton>
          </Grid>
        </Grid>
      </Box>
    </AppBar>
  );
};

export default AppBarTop;
