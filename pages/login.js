import * as React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import OrderForm from "../components/organisms/OrderForm";
import Layout from "../components/organisms/Layout";

const Login = () => {
  return (
    <>
      <Layout>
        <Grid
          container
          style={{ height: "100%" }}
          direction={{ xs: "column-reverse", md: "row" }}
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              display: "flex",
              padding: "20px",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4">Login</Typography>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default Login;
