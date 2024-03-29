import * as React from "react";
import { Paper, Grid, Box, CircularProgress } from "@mui/material";

import TrackByRef from "../molecules/Forms/TrackByRef";
import TrackByContact from "../molecules/Forms/TrackByContact";
import Select from "../molecules/Select";
import TrackedOrder from "../molecules/TrackedOrder";
import TrackingOrdersList from "../molecules/TrackingOrdersList";

const OrderForm = () => {
  const [order, setOrder] = React.useState();
  const [orders, setOrders] = React.useState();

  const [trackType, setTrackType] = React.useState("reference");
  const [loading, setLoading] = React.useState(false);

  const options = [
    { reference: "Reference" },
    { sender: "Sender" },
    { recipient: "Recipient" },
  ];

  return (
    <Paper
      sx={{
        padding: "16px",
        backgroundColor: "secondary.light",
        width: "100%",
        height: "100%",
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
              />
            )}
          </>
        ) : (
          <>
            <Grid item xs={12} sx={{ marginBottom: 2 }}>
              <Select
                option={trackType}
                setOption={setTrackType}
                options={options}
                label
              />
            </Grid>

            <Grid item xs={12}>
              {trackType && (
                <>
                  {trackType === "reference" ? (
                    <TrackByRef
                      setOrder={setOrder}
                      loading={loading}
                      setLoading={setLoading}
                      label="Tracking type"
                    />
                  ) : (
                    <TrackByContact
                      setOrder={setOrders}
                      contactType={trackType}
                      setLoading={setLoading}
                    />
                  )}
                </>
              )}
            </Grid>
          </>
        )}
      </Grid>
    </Paper>
  );
};

export default OrderForm;
