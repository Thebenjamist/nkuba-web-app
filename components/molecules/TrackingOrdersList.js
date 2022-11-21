import React from "react";
import {
  Grid,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import PrimaryButton from "../atoms/PrimaryButton";
import { UserContext } from "../../services/contexts/userContext";
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

  const statuses = [
    {
      value: "all",
      label: "All",
    },
    {
      value: "pending",
      label: "Pending",
    },
    {
      value: "confirmed",
      label: "Confirmed",
    },
    {
      value: "in-progress",
      label: "In-progress",
    },
    {
      value: "completed",
      label: "Completed",
    },
    {
      value: "cancelled",
      label: "Cancelled",
    },
  ];

  const [status, setStatus] = React.useState("all");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const filteredOrders =
    status !== "all" ? orders.filter((item) => item.status === status) : orders;

  return (
    <>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "space-between",
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
          {orders.length === 0 ? (
            <>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                No orders
              </Typography>
            </>
          ) : (
            <>
              <TextField
                select
                label="Filter"
                value={status}
                onChange={handleChange}
                sx={{
                  marginBottom: 2,
                }}
              >
                {statuses.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              {filteredOrders.map((order) => (
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
                          <Typography
                            variant="caption"
                            sx={{ fontWeight: 600 }}
                          >
                            {order?.senderName}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography variant="caption">
                            Contact number:
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ fontWeight: 600 }}
                          >
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
                          <Typography
                            variant="caption"
                            sx={{ fontWeight: 600 }}
                          >
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
                          <Typography
                            variant="caption"
                            sx={{ fontWeight: 600 }}
                          >
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

                          <Typography
                            variant="caption"
                            sx={{ fontWeight: 600 }}
                          >
                            {order?.recipientName}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography variant="caption">
                            Contact number:
                          </Typography>

                          <Typography
                            variant="caption"
                            sx={{ fontWeight: 600 }}
                          >
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
            </>
          )}
        </Box>

        <Grid
          item
          xs={12}
          sx={{
            alignItems: "flex-end",
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
