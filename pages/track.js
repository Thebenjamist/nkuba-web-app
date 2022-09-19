import * as React from "react";
import { Grid } from "@mui/material";
import TrackingForm from "../components/organisms/TrackingForm";
import Layout from "../components/organisms/Layout";

const Track = () => {
  return (
    <>
      <Layout>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
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
            <TrackingForm />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default Track;
