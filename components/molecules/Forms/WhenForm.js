import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker, MobileTimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import PrimaryButton from "../../atoms/PrimaryButton";

import { Form, Formik } from "formik";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SecondaryButton from "../../atoms/SecondaryButton";

const WhenForm = ({ setActiveStep, setOrderForm, orderForm, step }) => {
  const validate = (values) => {
    const errors = {};
    if (!values?.pickupDate) {
      errors.pickupDate = "Date is Required!";
    }
    if (values?.pickupDate?.toString() === "Invalid Date") {
      errors.pickupDate = "Date is invalid!";
    }

    if (!values?.pickupTime) {
      errors.pickupTime = "Time is Required!";
    }
    if (values?.pickupTime?.toString() === "Invalid Date") {
      errors.pickupTime = "Time is invalid!";
    }
    return errors;
  };

  return (
    <Formik
      initialValues={{
        pickupDate: null,
        pickupTime: null,
      }}
      validate={validate}
      onSubmit={(values) => {
        setOrderForm({
          ...orderForm,
          pickupDate: values.pickupDate,
          pickupTime: values.pickupTime,
        });
        setActiveStep(2);
      }}
    >
      {({ values, errors, touched, setFieldValue, setStatus }) => (
        <Form
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Grid item xs={12} sx={{ marginBottom: "24px" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                label="Pickup date"
                inputFormat="dd/MM/yyyy"
                value={values.pickupDate}
                onChange={(value) => setFieldValue("pickupDate", value, true)}
                minDate={new Date()}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CalendarMonthIcon />
                    </InputAdornment>
                  ),
                }}
                // onError={(err) => setStatus("aoia")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    error={errors.pickupDate && touched.pickupDate}
                  />
                )}
              />
              <Typography sx={{ color: "error.main", paddingTop: "4px" }}>
                {errors.pickupDate && touched.pickupDate && errors.pickupDate}
              </Typography>
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sx={{ marginBottom: "24px" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileTimePicker
                label="Pickup time"
                value={values.pickupTime}
                onChange={(value) => setFieldValue("pickupTime", value, true)}
                minTime={
                  new Date(values.pickupDate).getDate() === new Date().getDate()
                    ? new Date(0, 0, 0, new Date().getHours(), 0, 0, 0)
                    : new Date(0, 0, 0, 6)
                }
                maxTime={new Date(0, 0, 0, 17, 0)}
                ampm={false}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AccessTimeIcon />
                    </InputAdornment>
                  ),
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    error={errors.pickupTime && touched.pickupTime}
                  />
                )}
              />
              <Typography sx={{ color: "error.main", paddingTop: "4px" }}>
                {errors.pickupTime && touched.pickupTime && errors.pickupTime}
              </Typography>
            </LocalizationProvider>
          </Grid>

          <Grid item container spacing={2}>
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
              <SecondaryButton onClick={() => setActiveStep(0)}>
                Back
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
              <PrimaryButton type="submit">Next</PrimaryButton>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default WhenForm;
