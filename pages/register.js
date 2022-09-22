import * as React from "react";
import { Grid } from "@mui/material";
import SignUpForm from "../components/organisms/SignUpForm";
import Layout from "../components/organisms/Layout";

const Register = () => {
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
            <SignUpForm />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default Register;

export async function getServerSideProps({ req }) {
  const token = req.cookies["nkuba-access-token"];

  if (token && token.length > 0) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
