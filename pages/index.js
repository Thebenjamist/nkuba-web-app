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
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              display: "flex",
              padding: "20px",
              flexDirection: "column",
              width: "100%",
              flex: 1,
            }}
          >
            <Typography variant="h4">Place an order</Typography>
            <OrderForm />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default Home;
