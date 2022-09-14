import { Button, Typography } from "@mui/material";
import { Children } from "react";

const PrimaryButton = (props) => (
  <Button
    sx={{
      backgroundColor: "primary.main",
      minWidth: "140px",
      textTransform: "none",
      padding: "12px",
      "&:hover": {
        backgroundColor: "primary.light",
      },
    }}
    {...props}
  >
    <Typography
      sx={{
        fontWeight: 700,
        color: "text.primary",
      }}
    >
      {props.children}
    </Typography>
  </Button>
);

export default PrimaryButton;
