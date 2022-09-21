import * as React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import OrderForm from "../components/organisms/OrderForm";
import Layout from "../components/organisms/Layout";
const Home = () => {
  return (
    <>
      <Layout>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          maxWidth="lg"
        >
          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              display: "flex",
              padding: "8px",
              flexDirection: "column",
              width: "100%",
              flex: 1,
            }}
          >
            <OrderForm />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default Home;
