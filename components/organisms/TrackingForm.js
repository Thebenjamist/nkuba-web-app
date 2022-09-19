import * as React from "react";
import { Paper, Grid, TextField, Typography, Container } from "@mui/material";

import Track from "../molecules/Forms/Track";
import OrderSummary from "../molecules/OrderSummary";

const OrderForm = () => {
  const [order, setOrder] = React.useState();
  return (
    <Paper
      sx={{
        padding: "16px",
        backgroundColor: "secondary.light",
        width: "100%",
        height: "100%",
      }}
    >
      <Grid container sx={{ width: "100%" }}>
        {order ? (
          <OrderSummary orderForm={order} track={true} />
        ) : (
          <Track setOrder={setOrder} />
        )}
      </Grid>
    </Paper>
  );
};

export default OrderForm;
