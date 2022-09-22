import { Grid, TextField, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import { createUser } from "../../../services/api/users";
import PrimaryButton from "../../atoms/PrimaryButton";
import { useSnackbar } from "notistack";
import { useContext, useState } from "react";
import { UserContext } from "../../../services/contexts/userContext";
import BasicModal from "../../organisms/Modal";
import { set } from "lodash";
import { useRouter } from "next/router";

const SignUp = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const validate = (values) => {
    const validateNumber = new RegExp(
      `^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$`
    );
    var minimum8 =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const errors = {};
    if (!values.name) {
      errors.name = "Name is required!";
    }
    if (!validateNumber.test(values.contact.replace(/ /g, ""))) {
      errors.contact = "Enter a valid phone number!";
    }

    if (!minimum8.test(values.password)) {
      errors.password =
        "Minimum eight characters, one number, one uppercase, one lowercase and a special character";
    }

    if (!values.contact) {
      errors.contact = "Phone number is required!";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    }

    if (
      minimum8.test(values.password) &&
      values.password !== values.confirmPassword
    ) {
      errors.password = "Passwords must match!";
      errors.confirmPassword = "Passwords must match!";
    }

    return errors;
  };

  return (
    <>
      <BasicModal open={open} setOpen={setOpen} title="Thank you">
        <Typography sx={{ textAlign: "center", paddingBottom: 1 }}>
          To complete your registration, please check your email and click on
          the link we have sent you
        </Typography>
        <Typography sx={{ textAlign: "center", paddingBottom: 2 }}>
          After that click the button below to login
        </Typography>
        <PrimaryButton onClick={() => router.push("/login")}>
          Login
        </PrimaryButton>
      </BasicModal>
      <Formik
        initialValues={{
          name: "",
          email: "",
          contact: "",
          password: "",
          confirmPassword: "",
        }}
        validate={validate}
        onSubmit={async (values, { resetForm }) => {
          delete values.confirmPassword;
          await createUser({ data: values })
            .then(() => {
              enqueueSnackbar("Successfully created user:", {
                variant: "success",
              });
              resetForm();
              setOpen(true);
            })
            .catch((err) => {
              resetForm();

              enqueueSnackbar(`${err.toString()}`, {
                variant: "error",
              });
            });
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
                placeholder="Name"
                fullWidth
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                error={errors.name && touched.name}
              />
              <Typography sx={{ color: "error.main", paddingTop: "4px" }}>
                {errors.name && touched.name && errors.name}
              </Typography>
            </Grid>
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
                placeholder="i.e 0971214488"
                fullWidth
                type="tel"
                label="Phone Number"
                name="contact"
                value={values.contact}
                onChange={handleChange}
                error={errors.contact && touched.contact}
              />
              <Typography sx={{ color: "error.main", paddingTop: "4px" }}>
                {errors.contact && touched.contact && errors.contact}
              </Typography>
            </Grid>{" "}
            <Grid item xs={12} sx={{ marginBottom: "8px" }}>
              <TextField
                // placeholder="i.e 0971214488"
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
            </Grid>{" "}
            <Grid item xs={12} sx={{ marginBottom: "8px" }}>
              <TextField
                // placeholder="i.e 0971214488"
                fullWidth
                type="password"
                label="Confirm password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword && touched.confirmPassword}
              />
              <Typography sx={{ color: "error.main", paddingTop: "4px" }}>
                {errors.confirmPassword &&
                  touched.confirmPassword &&
                  errors.confirmPassword}
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
              <PrimaryButton type="submit">Register</PrimaryButton>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignUp;
