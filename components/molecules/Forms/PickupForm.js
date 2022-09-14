import { Grid, TextField, Typography } from "@mui/material";
import PlacesAutofill from "../PlacesAutofill";
import MapBox from "../MapBox";
import { useState } from "react";
import { Formik, Field, Form } from "formik";
import PrimaryButton from "../../atoms/PrimaryButton";
import theme from "../../../src/theme";

const PickupForm = ({ setActiveStep, setOrderForm, orderForm }) => {
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
          <Grid item xs={12} sx={{ marginBottom: "24px" }}>
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

          <Grid item xs={12} sx={{ marginBottom: "24px" }}>
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

          <Grid item xs={12} sx={{ marginBottom: "24px" }}>
            <PlacesAutofill setCoords={setCoords} label="Pick-up location" />
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <MapBox lat={coords.lat} lng={coords.lng} setCoords={setCoords} />
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
            <PrimaryButton type="submit">Next</PrimaryButton>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default PickupForm;
