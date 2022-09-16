import { Grid, Typography, Paper, Container } from "@mui/material";
import MapBoxDirections from "./MapBoxDirections";
import { useState } from "react";
import PrimaryButton from "../atoms/PrimaryButton";
import { createOrder } from "../../services/api/orders";
import { useSnackbar } from "notistack";

const OrderSummary = ({ orderForm, step, setActiveStep, setOrderForm }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const submitOrder = async () => {
    setLoading(true);
    createOrder({ data: orderForm })
      .then(() => {
        setLoading(false);
        setSuccess(true);
        enqueueSnackbar("Order placed successfully", { variant: "success" });
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar(`Failed to place order. ${err}`, {
          variant: "error",
        });
      });
  };

  return (
    <>
      <Grid item xs={12} sx={{ textAlign: "center", marginBottom: "8px" }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: 20 }}>
          Order Summary:
        </Typography>
      </Grid>

      <Grid item xs={6} sx={{ marginBottom: "32px", paddingRight: 1 }}>
        <Paper sx={{ padding: "8px" }}>
          <Typography
            variant="subtitle1"
            sx={{ textAlign: "center", fontWeight: 600 }}
          >
            Pickup:
          </Typography>
          <Typography variant="caption">Name:</Typography>
          <Typography variant="subtitle1">{orderForm?.senderName}</Typography>

          <Typography variant="caption">Contact number:</Typography>
          <Typography variant="subtitle1">
            {orderForm?.senderContact}
          </Typography>
          <Typography variant="caption">Pickup date(provisional):</Typography>
          <Typography variant="subtitle1">
            {new Date(orderForm?.pickupDate)?.toDateString()}
          </Typography>
          <Typography variant="caption">Pickup time (provisional):</Typography>
          <Typography variant="subtitle1">
            {new Date(orderForm?.pickupTime)?.toLocaleTimeString()}
          </Typography>
        </Paper>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          marginBottom: "32px",
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
            {orderForm.recipientContact}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: "24px" }}>
        <Paper>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
              <Grid
                item
                xs={12}
                sx={{
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "24px",
                }}
              >
                <MapBoxDirections
                  start={orderForm.senderCoords}
                  end={orderForm.recipientCoords}
                />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item container>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <PrimaryButton onClick={() => setActiveStep(0)}>
            Start Again
          </PrimaryButton>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <PrimaryButton onClick={submitOrder}>Order</PrimaryButton>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderSummary;
