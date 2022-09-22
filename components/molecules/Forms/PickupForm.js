import { Grid, TextField, Typography } from "@mui/material";
import PlacesAutofill from "../PlacesAutofill";
import MapBox from "../MapBox";
import { useState, useContext } from "react";
import { Formik, Form } from "formik";
import PrimaryButton from "../../atoms/PrimaryButton";
import SecondaryButton from "../../atoms/SecondaryButton";
import { useRouter } from "next/router";

import { UserContext } from "../../../services/contexts/userContext";

const PickupForm = ({ setActiveStep, setOrderForm, orderForm }) => {
  const { session } = useContext(UserContext);
  const router = useRouter();
  const [coords, setCoords] = useState({ lat: -15.3875, lng: 28.3228 });
  const validate = (values) => {
    const validateNumber = new RegExp(
      `^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$`
    );
    const errors = {};
    if (!values.fullName) {
      errors.fullName = "Name is required!";
    }
    if (!validateNumber.test(values.phoneNumber.replace(/ /g, ""))) {
      errors.phoneNumber = "Enter a valid phone number!";
    }

    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone number is required!";
    }
    return errors;
  };

  return (
    <Formik
      initialValues={{
        fullName: "",
        phoneNumber: "",
      }}
      validate={validate}
      onSubmit={(values) => {
        setOrderForm({
          ...orderForm,
          senderName: values.fullName,
          senderCoords: coords,
          senderContact: values.phoneNumber,
        });
        setActiveStep(1);
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
              label="Sender"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              error={errors.fullName && touched.fullName}
            />
            <Typography sx={{ color: "error.main", paddingTop: "4px" }}>
              {errors.fullName && touched.fullName && errors.fullName}
            </Typography>
          </Grid>

          <Grid item xs={12} sx={{ marginBottom: "8px" }}>
            <TextField
              placeholder="i.e 0971214488"
              fullWidth
              type="tel"
              label="Phone Number"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              error={errors.phoneNumber && touched.phoneNumber}
            />
            <Typography sx={{ color: "error.main", paddingTop: "4px" }}>
              {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
            </Typography>
          </Grid>

          <Grid item xs={12} sx={{ marginBottom: "16px" }}>
            <PlacesAutofill setCoords={setCoords} label="Pick-up location" />
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <MapBox lat={coords.lat} lng={coords.lng} setCoords={setCoords} />
          </Grid>
          {session ? (
            <Grid
              item
              xs={12}
              sx={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <PrimaryButton type="submit">Next</PrimaryButton>
            </Grid>
          ) : (
            <Grid item container spacing={1}>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <SecondaryButton onClick={() => router.push("/login")}>
                  Login
                </SecondaryButton>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <PrimaryButton type="submit">Continue as guest</PrimaryButton>
              </Grid>
            </Grid>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default PickupForm;
