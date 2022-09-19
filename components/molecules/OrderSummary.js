import { Grid, Typography, Paper, Box, CircularProgress } from "@mui/material";
import MapBoxDirections from "./MapBoxDirections";
import { useState } from "react";
import PrimaryButton from "../atoms/PrimaryButton";
import { createOrder } from "../../services/api/orders";
import { useSnackbar } from "notistack";
import Modal from "../organisms/Modal";

const OrderSummary = ({
  orderForm,
  step,
  setActiveStep,
  setOrderForm,
  track,
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [tracker, setTracker] = useState();

  const { enqueueSnackbar } = useSnackbar();

  const submitOrder = async () => {
    setLoading(true);
    createOrder({ data: orderForm })
      .then((res) => {
        setLoading(false);
        setSuccess(true);
        setTracker(res?.data?.code);
        setOpen(true);
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
      <Modal open={open} setOpen={setOpen} title="Order Placed">
        <Typography sx={{ textAlign: "center", paddingBottom: 1 }}>
          Thank you for your order your tracking id is:
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 700,
            paddingBottom: 1,
            fontSize: 20,
          }}
        >
          {tracker}
        </Typography>
        <Typography sx={{ textAlign: "center", paddingBottom: 1 }}>
          Your order is currently pending, will be confirmed upon payment
        </Typography>
      </Modal>

      {loading && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress
            sx={{
              position: "absolute",
              zIndex: 1000,
              top: "45%",
            }}
            size={100}
          />
        </Box>
      )}
      <Box
        style={{
          opacity: loading ? 0.5 : 1,
          pointerEvents: loading ? "none" : "auto",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Paper
          sx={{
            p: 1,
            marginBottom: 2,
            display: track ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: 800, fontSize: 20, marginLeft: 1 }}>
            {orderForm?.status.toString().toUpperCase()}
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
        {!track && (
          <Grid item container spacing={1}>
            <Grid
              item
              xs={12}
              sm={success ? 12 : 6}
              sx={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <PrimaryButton onClick={() => setActiveStep(0)}>
                {success ? "Order Again" : "Start Again"}
              </PrimaryButton>
            </Grid>
            {!success && (
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
            )}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default OrderSummary;
