import * as React from "react";
import { Paper, Grid, TextField, Typography, Container } from "@mui/material";
import Image from "next/image";
import SignIn from "../molecules/Forms/SignIn";
import NkubaLogo from "../../src/logos/1";

const SignInForm = () => {
  return (
    <Paper
      sx={{
        padding: "16px",
        backgroundColor: "secondary.light",
        width: "100%",
        height: "100%",
      }}
    >
      <Grid container sx={{ width: "100%" }}>
        <Grid
          item
          xs={12}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            marginBottom: 4,
          }}
        >
          <NkubaLogo height={120} />
        </Grid>
        <SignIn />
      </Grid>
    </Paper>
  );
};

export default SignInForm;
