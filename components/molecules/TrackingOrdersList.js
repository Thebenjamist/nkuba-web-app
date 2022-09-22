import React from "react";
import {
  Grid,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import MapBoxDirections from "./MapBoxDirections";
import { useState } from "react";
import PrimaryButton from "../atoms/PrimaryButton";
import { createOrder } from "../../services/api/orders";
import { useSnackbar } from "notistack";
import Modal from "../organisms/Modal";
import SecondaryButton from "../atoms/SecondaryButton";
import { UserContext } from "../../services/contexts/userContext";
import { Router } from "@mui/icons-material";
import { useRouter } from "next/router";

const TrackingOrdersList = ({
  orders,
  setOrders,
  sender,
  setOrder,
  profile,
  user,
}) => {
  const { session } = React.useContext(UserContext);
  const router = useRouter();
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
          {profile ? (
            <Typography sx={{ fontWeight: 800, fontSize: 20, marginLeft: 1 }}>
              Orders for {user?.name || user?.email}
            </Typography>
          ) : (
            <Typography sx={{ fontWeight: 800, fontSize: 20, marginLeft: 1 }}>
              Orders for{" "}
              {sender ? orders[0].senderContact : orders[0].recipientContact}
            </Typography>
          )}
        </Paper>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {orders.map((order) => (
            <Button
              sx={{
                margin: 0,
                padding: 0,
                marginBottom: 2,
              }}
              onClick={() => {
                setOrder(order);
              }}
            >
              <Paper sx={{ padding: "8px", width: "100%" }}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        textAlign: "center",
                        fontWeight: 600,
                        marginRight: 1,
                      }}
                    >
                      Reference:{" "}
                    </Typography>{" "}
                    <Typography
                      variant="subtitle1"
                      sx={{
                        textAlign: "center",
                        fontWeight: 600,
                      }}
                    >
                      {order?.code}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        textAlign: "center",
                        fontWeight: 600,
                        marginRight: 1,
                      }}
                    >
                      Status:
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        textAlign: "center",
                        fontWeight: 600,
                      }}
                    >
                      {order?.status.toUpperCase()}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={6}
                    sx={{
                      marginBottom: "16px",
                      paddingRight: 1,
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
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="caption">Name:</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {order?.senderName}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="caption">Contact number:</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {order?.senderContact}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="caption">
                        Pickup date(provisional):
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {new Date(order?.pickupDate)?.toDateString()}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="caption">
                        Pickup time (provisional):
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {new Date(order?.pickupTime)?.toLocaleTimeString()}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      marginBottom: "16px",
                      paddingLeft: 1,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ textAlign: "center", fontWeight: 600 }}
                    >
                      Drop-off:
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="caption">Name:</Typography>

                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {order?.recipientName}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="caption">Contact number:</Typography>

                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {order?.recipientContact}
                      </Typography>
                    </Box>

                    {order.status === "completed" && (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography variant="caption">
                            Delivery date:
                          </Typography>

                          <Typography
                            variant="caption"
                            sx={{ fontWeight: 600 }}
                          >
                            {order?.recipientContact}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography variant="caption">
                            Delivery time:
                          </Typography>

                          <Typography
                            variant="caption"
                            sx={{ fontWeight: 600 }}
                          >
                            {order?.recipientContact}
                          </Typography>
                        </Box>
                      </>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            </Button>
          ))}
        </Box>

        <Grid
          item
          xs={12}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <PrimaryButton
            onClick={() =>
              profile ? router.push("/profile") : setOrders(null)
            }
          >
            Back
          </PrimaryButton>
        </Grid>
      </Box>
    </>
  );
};

export default TrackingOrdersList;
