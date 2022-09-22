import * as React from "react";
import { Paper, Grid, TextField, Typography, Container } from "@mui/material";
import Image from "next/image";
import SignUp from "../molecules/Forms/SignUp";
import NkubaLogo from "../../src/logos/1";

const OrderForm = () => {
  const [order, setOrder] = React.useState();
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
        <SignUp />
      </Grid>
    </Paper>
  );
};

export default OrderForm;
