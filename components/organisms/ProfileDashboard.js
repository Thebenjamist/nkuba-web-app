import * as React from "react";
import { Paper, Grid, TextField, Typography, Container } from "@mui/material";

import SignUp from "../molecules/Forms/SignUp";
import PrimaryButton from "../atoms/PrimaryButton";
import { useRouter } from "next/router";

const ProfileDashboard = ({ user }) => {
  const [order, setOrder] = React.useState();
  const router = useRouter();
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
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Welcome {user?.name || user?.email}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 2,
            marginTop: 2,
          }}
        >
          <PrimaryButton onClick={() => router.push("/profile/orders")}>
            My orders
          </PrimaryButton>
        </Grid>

        {user?.["custom:role"] === "driver" && (
          <>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 2,
                marginTop: 2,
              }}
            >
              <PrimaryButton onClick={() => router.push("/profile/driver")}>
                Driver Orders
              </PrimaryButton>
            </Grid>
          </>
        )}
      </Grid>
    </Paper>
  );
};

export default ProfileDashboard;
