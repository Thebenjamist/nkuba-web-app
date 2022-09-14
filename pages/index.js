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
          // style={{ height: "100%" }}
          // direction={{ xs: "column-reverse", md: "row" }}
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {/* <Grid
            item
            xs={12}
            md={6}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              display: "flex",
              padding: "16px",
            }}
          >
            <Paper
              sx={{
                height: 300,
                maxWidth: 300,
                padding: "20px",
                margin: 0,
                textAlign: "center",
                backgroundColor: "secondary.main",
              }}
            >
              <Typography variant="h4">Specials</Typography>
              <Typography variant="h6">
                K40 for all deliveries in Lusaka
              </Typography>
            </Paper>
          </Grid> */}

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
