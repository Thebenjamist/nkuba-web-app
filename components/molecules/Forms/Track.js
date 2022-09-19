import * as React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { Formik, Field, Form } from "formik";
import PrimaryButton from "../../atoms/PrimaryButton";
import { getOrderByRef } from "../../../services/api/orders";
import { useSnackbar } from "notistack";

const TrackForm = ({ setOrder }) => {
  const validate = (values) => {
    const errors = {};
    if (!values.reference) {
      errors.reference = "Reference code is required!";
    }
    return errors;
  };

  const [loading, setLoading] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        reference: "",
      }}
      validate={validate}
      onSubmit={(values) => {
        setLoading(true);
        getOrderByRef({ ref: values.reference.toUpperCase() })
          .then((res) => {
            enqueueSnackbar("Fetched order successfully", {
              variant: "success",
            });

            setOrder(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            enqueueSnackbar(`Failed to fetch order. ${err?.message}`, {
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
              placeholder="Please enter your code"
              fullWidth
              label="Reference Code"
              name="reference"
              value={values.reference}
              onChange={handleChange}
              error={errors.reference && touched.reference}
            />
            <Typography sx={{ color: "error.main", paddingTop: "4px" }}>
              {errors.reference && touched.reference && errors.reference}
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
            <PrimaryButton type="submit">Track</PrimaryButton>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default TrackForm;
