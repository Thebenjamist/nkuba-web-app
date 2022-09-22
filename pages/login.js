import * as React from "react";
import { Grid } from "@mui/material";
import Layout from "../components/organisms/Layout";
import SignInForm from "../components/organisms/SignInForm";
import { UserContext } from "../services/contexts/userContext";
import { useRouter } from "next/router";

const Login = () => {
  const { session } = React.useContext(UserContext);
  const router = useRouter();
  if (session) {
    router.push("/profile");
  }
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
            <SignInForm />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default Login;
