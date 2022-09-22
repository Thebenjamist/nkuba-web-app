import * as React from "react";
import { Paper, Grid, Box, CircularProgress } from "@mui/material";

import TrackedOrder from "../molecules/TrackedOrder";
import TrackingOrdersList from "../molecules/TrackingOrdersList";
import { UserContext } from "../../services/contexts/userContext";
import { getCustomerOrders } from "../../services/api/orders";
import { useSnackbar } from "notistack";

const MyOrders = () => {
  const { session } = React.useContext(UserContext);
  const [order, setOrder] = React.useState();
  const [orders, setOrders] = React.useState();
  const { enqueueSnackbar } = useSnackbar();

  const [trackType, setTrackType] = React.useState("reference");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchOrders = () => {
      setLoading(true);
      getCustomerOrders({ id: session.id })
        .then((res) => {
          setOrders(res.data);
          enqueueSnackbar("Fetched user's orders", { variant: "success" });
          setLoading(false);
        })
        .catch(() => {
          enqueueSnackbar("Failed to fetch users orders", {
            variant: "error",
          });
          setLoading(false);
        });
    };

    if (session) {
      fetchOrders();
    }
  }, []);

  return (
    <Paper
      sx={{
        padding: "16px",
        backgroundColor: "secondary.light",
        width: "100%",
        height: "100%",
        minHeight: 300,
      }}
    >
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
              top: "50%",
            }}
            size={60}
          />
        </Box>
      )}
      <Grid
        container
        sx={{
          opacity: loading ? 0.5 : 1,
          pointerEvents: loading ? "none" : "auto",
          width: "100%",
        }}
      >
        {order || orders ? (
          <>
            {order ? (
              <TrackedOrder orderForm={order} setOrderForm={setOrder} />
            ) : (
              <TrackingOrdersList
                setOrder={setOrder}
                orders={orders}
                setOrders={setOrders}
                sender={trackType === "sender" ? true : false}
                profile
                user={session}
              />
            )}
          </>
        ) : (
          <></>
        )}
      </Grid>
    </Paper>
  );
};

export default MyOrders;
