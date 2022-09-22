import * as React from "react";
import { Grid, TextField, Box, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import PrimaryButton from "../../atoms/PrimaryButton";
import { getOrderByContact } from "../../../services/api/orders";
import { useSnackbar } from "notistack";

const TrackForm = ({ setOrder, setLoading, contactType }) => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const validateNumber = new RegExp(
    `^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$`
  );
  const validate = (values) => {
    const errors = {};
    if (!values.contact) {
      errors.contact = "Contact number is required!";
    }

    if (!validateNumber.test(values.contact.replace(/ /g, ""))) {
      errors.contact = "Enter a valid phone number!";
    }
    return errors;
  };

  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Formik
          initialValues={{
            contact: "",
          }}
          validate={validate}
          onSubmit={(values) => {
            setLoading(true);
            getOrderByContact({ contact: values.contact, contactType })
              .then((res) => {
                if (res.data.length === 0) {
                  throw new Error("No orders for this number");
                } else {
                  enqueueSnackbar("Fetched orders successfully", {
                    variant: "success",
                  });
                  setOrder(res.data);
                }
                setLoading(false);
              })
              .catch((err) => {
                setLoading(false);
                enqueueSnackbar(`Failed to fetch orders. ${err?.message}`, {
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
                  placeholder="e.g 097123882"
                  fullWidth
                  label={`${capitalizeFirstLetter(contactType)} Number`}
                  name="contact"
                  type="tel"
                  value={values.contact}
                  onChange={handleChange}
                  error={errors.contact && touched.contact}
                />
                <Typography sx={{ color: "error.main", paddingTop: "4px" }}>
                  {errors.contact && touched.contact && errors.contact}
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
      </Box>
    </>
  );
};

export default TrackForm;
