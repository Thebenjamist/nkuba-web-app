import * as React from "react";
import { Paper, Grid, TextField, Typography, Container } from "@mui/material";

import PrimaryButton from "../atoms/PrimaryButton";
import StepperMain from "../molecules/Stepper";
import PickupForm from "../molecules/Forms/PickupForm";

import dynamic from "next/dynamic";
import RecipientForm from "../molecules/Forms/RecipientForm";
import WhenForm from "../molecules/Forms/WhenForm";
import OrderSummary from "../molecules/OrderSummary";

const OrderForm = () => {
  const steps = ["Pickup", "When", "Drop-off"];

  const [activeStep, setActiveStep] = React.useState(0);
  const [orderForm, setOrderForm] = React.useState();

  const nextStep = () => {
    const newActiveStep = isLastStep() ? activeStep : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const previousStep = () => {
    const newActiveStep = activeStep - 1;
    setActiveStep(newActiveStep);
  };

  const totalSteps = () => steps.length;

  const isLastStep = () => {
    return activeStep === totalSteps();
  };

  return (
    <Paper
      sx={{
        padding: "16px",
        marginTop: "8px",
        backgroundColor: "secondary.light",
        width: "100%",
        height: "100%",
      }}
    >
      <StepperMain activeStep={activeStep} steps={steps} />
      <Grid container sx={{ width: "100%" }}>
        {activeStep === 0 && (
          <PickupForm
            step={activeStep}
            setActiveStep={setActiveStep}
            orderForm={orderForm}
            setOrderForm={setOrderForm}
          />
        )}
        {console.log("Order: ", orderForm)}

        {activeStep === 1 && (
          <WhenForm
            step={activeStep}
            setActiveStep={setActiveStep}
            orderForm={orderForm}
            setOrderForm={setOrderForm}
          />
        )}

        {activeStep === 2 && (
          <RecipientForm
            step={activeStep}
            setActiveStep={setActiveStep}
            orderForm={orderForm}
            setOrderForm={setOrderForm}
          />
        )}

        {activeStep === 3 && (
          <OrderSummary
            step={activeStep}
            setActiveStep={setActiveStep}
            orderForm={orderForm}
            setOrderForm={setOrderForm}
          />
        )}
      </Grid>
    </Paper>
  );
};

export default OrderForm;
