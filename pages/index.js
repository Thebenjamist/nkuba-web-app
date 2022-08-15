import * as React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import AppBar from "../components/organisms/AppBarTop";
import Head from "next/head";
import Image from "next/image";
import OrderForm from "../components/organisms/OrderForm";

const Home = () => {
  return (
    <>
      <Head>
        <title>Nkuba Logistics</title>
        <link rel="shortcut icon" href="images/icons/bolt.png" />
      </Head>

      <Box
        sx={{
          backgroundColor: "primary.main",
          width: "100%",
        }}
      >
        <AppBar />

        <Container
          sx={{
            padding: "20px",
            minHeight: "calc(100vh - 100px)",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            display: "flex",
          }}
        >
          <Grid
            container
            style={{ height: "100%" }}
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
                padding: "16px",
              }}
            >
              <Paper
                sx={{
                  height: 300,
                  width: 300,
                  padding: "20px",
                  margin: 0,
                  textAlign: "center",
                  backgroundColor: "secondary.main",
                }}
              >
                <Typography variant="h4" color="background.paper">
                  Specials
                </Typography>
                <Typography variant="h6" color="background.paper">
                  K40 for all deliveries in Lusaka
                </Typography>
              </Paper>
            </Grid>

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
              <Typography variant="h4">Place an order</Typography>
              <OrderForm />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Home;
