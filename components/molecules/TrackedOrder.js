import React from "react";
import {
  Grid,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Link,
  TextField,
} from "@mui/material";
import MapBoxDirections from "./MapBoxDirections";
import { useState } from "react";
import PrimaryButton from "../atoms/PrimaryButton";
import {
  getAllOrders,
  getOrder,
  updateOrderStatus,
} from "../../services/api/orders";
import { useSnackbar } from "notistack";
import Modal from "../organisms/Modal";
import SecondaryButton from "../atoms/SecondaryButton";
import { UserContext } from "../../services/contexts/userContext";
import { useRouter } from "next/router";
import Select from "../molecules/Select";

const TrackedOrder = ({ orderForm, setOrderForm, setOrders }) => {
  const { session } = React.useContext(UserContext);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = React.useState(orderForm?.status);
  const { enqueueSnackbar } = useSnackbar();

  const options = [
    { pending: "Pending" },
    { confirmed: "Confirmed" },
    { ["in-progress"]: "In-progress" },
    { completed: "Completed" },
    { cancelled: "Cancelled" },
  ];
  const changeStatus = async () => {
    setLoading(true);
    const data = {
      id: orderForm.id,
      status,
    };
    await updateOrderStatus({ data })
      .then(async () => {
        await getAllOrders()
          .then((res) => setOrders(res.data))
          .catch((err) => {
            enqueueSnackbar(`${err.toString()}`, {
              variant: "error",
            });
            setOpen(false);
            setLoading(false);
          });
        await getOrder({ id: orderForm?.id })
          .then((res) => {
            enqueueSnackbar("Successfully changed status", {
              variant: "success",
            });
            setLoading(false);
            setOpen(false);
            setOrderForm(res.data);
          })
          .catch((err) => {
            enqueueSnackbar(`${err.toString()}`, {
              variant: "error",
            });
            setOpen(false);
            setLoading(false);
          });
      })
      .catch((err) => {
        enqueueSnackbar(`${err.toString()}`, {
          variant: "error",
        });
        setOpen(false);
        setLoading(false);
      });
  };

  return (
    <>
      <Modal open={open} setOpen={setOpen} title="Update Status">
        {loading ? (
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
                top: "40%",
              }}
              size={60}
            />
          </Box>
        ) : (
          <>
            <Grid item xs={12} sx={{ marginTop: 4 }}>
              <Select
                option={status}
                setOption={setStatus}
                options={options}
                label
              />
            </Grid>
            <PrimaryButton
              style={{
                width: "100%",
              }}
              onClick={() => changeStatus()}
            >
              Submit
            </PrimaryButton>
          </>
        )}
      </Modal>
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
        {session?.["custom:role"] === "driver" && (
          <Grid item xs={12} style={{}}>
            <PrimaryButton
              style={{
                backgroundColor: "orange",
                width: "100%",
                marginBottom: "16px",
              }}
              onClick={() => setOpen(true)}
            >
              Update status
            </PrimaryButton>
          </Grid>
        )}
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
        {session?.["custom:role"] === "driver" && (
          <>
            <Grid item xs={12} sx={{ marginBottom: "16px" }}>
              <Link
                href={`https://www.google.com/maps/dir/?api=1&origin=&destination=${orderForm.senderCoords.lat},${orderForm.senderCoords.lng}&travelmode=driving`}
                target="_blank"
                underline="none"
              >
                <PrimaryButton style={{ width: "100%" }} onClick={() => null}>
                  Navigate to sender
                </PrimaryButton>
              </Link>
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: "16px" }}>
              <Link
                href={`https://www.google.com/maps/dir/?api=1&origin=&destination=${orderForm.recipientCoords.lat},${orderForm.recipientCoords.lng}&travelmode=driving`}
                target="_blank"
                underline="none"
              >
                <PrimaryButton
                  style={{ width: "100%", backgroundColor: "green" }}
                  onClick={() => null}
                >
                  Navigate to recipient
                </PrimaryButton>
              </Link>
            </Grid>
          </>
        )}

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

export default TrackedOrder;
