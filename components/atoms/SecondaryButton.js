import { Button, Typography } from "@mui/material";
import { Children } from "react";

const SecondaryButton = (props) => (
  <Button
    sx={{
      backgroundColor: "secondary.main",
      minWidth: "140px",
      textTransform: "none",
      borderWidth: 1,
      borderColor: "primary.main",
      borderStyle: "solid",
      padding: "12px",
      "&:hover": {
        backgroundColor: "#f0f0f0",
      },
    }}
    {...props}
  >
    <Typography
      sx={{
        fontWeight: 700,
        color: "primary.main",
      }}
    >
      {props.children}
    </Typography>
  </Button>
);

export default SecondaryButton;
