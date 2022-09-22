import * as React from "react";
import { CircularProgress, Grid, Paper, Typography } from "@mui/material";

const Loading = () => {
  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        maxWidth="lg"
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            display: "flex",
            padding: "8px",
            flexDirection: "column",
            width: "100%",
            flex: 1,
          }}
        >
          <CircularProgress size={100} />
        </Grid>
      </Grid>
    </>
  );
};

export default Loading;
