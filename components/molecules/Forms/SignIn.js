import * as React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import PrimaryButton from "../../atoms/PrimaryButton";
import cookie from "js-cookie";
import { signIn } from "../../../services/api/users";
import { useRouter } from "next/router";

import { useSnackbar } from "notistack";
import { UserContext } from "../../../services/contexts/userContext";

const SignIn = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const { getSession, setSession } = React.useContext(UserContext);

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email is required!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    }
    return errors;
  };

  const login = ({ email, password }) => {
    const data = {
      email,
      password,
    };
    setSession("loading");
    signIn({ data })
      .then((res) => {
        cookie.set(
          "nkuba-access-token",
          res.data.AuthenticationResult.AccessToken,
          { expires: 1 }
        );
        cookie.set(
          "nkuba-refresh-token",
          res.data.AuthenticationResult.RefreshToken,
          { expires: 1 }
        );
        cookie.set("nkuba-id-token", res.data.AuthenticationResult.IdToken, {
          expires: 1,
        });
        enqueueSnackbar("Logged in successfully", { variant: "success" });
        router.push("/profile").then(() => getSession());
      })
      .catch((err) => {
        setSession(false);
        enqueueSnackbar("Invalid credentials, please try again", {
          variant: "error",
        });
      });
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validate={validate}
      onSubmit={(values) => {
        login({ email: values.email, password: values.password });
      }}
    >
      {({ values, errors, touched, handleChange }) => (
        <Form
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Grid item xs={12} sx={{ marginBottom: "8px" }}>
            <TextField
              placeholder="Email"
              fullWidth
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email && touched.email}
            />
            <Typography sx={{ color: "error.main", paddingTop: "4px" }}>
              {errors.email && touched.email && errors.email}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: "8px" }}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              error={errors.password && touched.password}
            />
            <Typography sx={{ color: "error.main", paddingTop: "4px" }}>
              {errors.password && touched.password && errors.password}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <PrimaryButton type="submit">Login</PrimaryButton>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default SignIn;
