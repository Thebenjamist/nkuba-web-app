import React from "react";
import { Grid, Typography, Paper, Box, CircularProgress } from "@mui/material";
import MapBoxDirections from "./MapBoxDirections";
import { useState } from "react";
import PrimaryButton from "../atoms/PrimaryButton";
import { createOrder } from "../../services/api/orders";
import { useSnackbar } from "notistack";
import Modal from "../organisms/Modal";
import SecondaryButton from "../atoms/SecondaryButton";
import { UserContext } from "../../services/contexts/userContext";

const OrderSummary = ({ orderForm, setOrderForm }) => {
  const { session } = React.useContext(UserContext);

  return (
    <>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Paper
          sx={{
            p: 1,
            marginBottom: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "primary.main",
          }}
        >
          <Typography sx={{ fontWeight: 800, fontSize: 20, marginLeft: 1 }}>
            {orderForm?.code?.toString().toUpperCase()}
            {" - "}
            {orderForm?.status?.toString().toUpperCase()}
          </Typography>
        </Paper>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Grid
            item
            xs={6}
            sx={{
              marginBottom: "16px",
              paddingRight: 1,
            }}
          >
            <Paper
              sx={{
                padding: "8px",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                Pickup:
              </Typography>
              <Typography variant="caption">Name:</Typography>
              <Typography variant="subtitle1">
                {orderForm?.senderName}
              </Typography>

              <Typography variant="caption">Contact number:</Typography>
              <Typography variant="subtitle1">
                {orderForm?.senderContact}
              </Typography>
              <Typography variant="caption">
                Pickup date(provisional):
              </Typography>
              <Typography variant="subtitle1">
                {new Date(orderForm?.pickupDate)?.toDateString()}
              </Typography>
              <Typography variant="caption">
                Pickup time (provisional):
              </Typography>
              <Typography variant="subtitle1">
                {new Date(orderForm?.pickupTime)?.toLocaleTimeString()}
              </Typography>
            </Paper>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              marginBottom: "16px",
              paddingLeft: 1,
              display: "flex",
            }}
          >
            <Paper sx={{ padding: "8px", width: "100%" }}>
              <Typography
                variant="subtitle1"
                sx={{ textAlign: "center", fontWeight: 600 }}
              >
                Drop-off:
              </Typography>
              <Typography variant="caption">Name:</Typography>

              <Typography variant="subtitle1">
                {orderForm?.recipientName}
              </Typography>
              <Typography variant="caption">Contact number:</Typography>

              <Typography variant="subtitle1">
                {orderForm?.recipientContact}
              </Typography>
            </Paper>
          </Grid>
        </Box>

        <Grid item xs={12} sx={{ marginBottom: "16px" }}>
          <Paper>
            <Grid container direction="column">
              <Grid item xs={12}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <MapBoxDirections
                    start={orderForm?.senderCoords}
                    end={orderForm?.recipientCoords}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <PrimaryButton onClick={() => setOrderForm(null)}>Back</PrimaryButton>
        </Grid>
      </Box>
    </>
  );
};

export default OrderSummary;
