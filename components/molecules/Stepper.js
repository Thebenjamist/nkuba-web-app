import { Stepper, Box, Step, StepLabel } from "@mui/material";

const styles = (theme) => ({
  labelContainer: {
    "& $alternativeLabel": {
      marginTop: 0,
    },
  },
  step: {
    "& $completed": {
      color: "lightgreen",
    },
    "& $active": {
      color: "pink",
    },
    "& $disabled": {
      color: "red",
    },
  },
  alternativeLabel: {},
  active: {}, //needed so that the &$active tag works
  completed: {},
  disabled: {},
  labelContainer: {
    "& $alternativeLabel": {
      marginTop: 0,
    },
  },
});

const StepperMain = ({ activeStep, steps }) => (
  <Box sx={{ width: "100%", marginBottom: "24px" }}>
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel
            classes={{
              alternativeLabel: styles.alternativeLabel,
              labelContainer: styles.labelContainer,
            }}
            StepIconProps={{
              classes: {
                root: styles.step,
                completed: styles.completed,
                active: styles.active,
                disabled: styles.disabled,
              },
            }}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  </Box>
);

export default StepperMain;
