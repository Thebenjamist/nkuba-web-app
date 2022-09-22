import * as React from "react";
import { Grid } from "@mui/material";
import Layout from "../../components/organisms/Layout";
import { UserContext } from "../../services/contexts/userContext";
import ProfileDashboard from "../../components/organisms/ProfileDashboard";

const Profile = () => {
  const { session } = React.useContext(UserContext);

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
          maxWidth="md"
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
            <ProfileDashboard user={session} />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default Profile;

export async function getServerSideProps({ req }) {
  const token = req.cookies["nkuba-access-token"];

  if (!token || token.length === 0) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
