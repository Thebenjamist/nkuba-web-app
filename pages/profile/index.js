import * as React from "react";
import { Grid } from "@mui/material";
import Layout from "../../components/organisms/Layout";
import { UserContext } from "../../services/contexts/userContext";
import ProfileDashboard from "../../components/organisms/ProfileDashboard";
import { useRouter } from "next/router";

const Profile = () => {
  const { session } = React.useContext(UserContext);
  const router = useRouter();

  React.useEffect(() => {
    if (!session) {
      router.push("/");
    }
  });

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
