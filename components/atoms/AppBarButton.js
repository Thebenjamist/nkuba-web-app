import { Button, Typography } from "@mui/material";

const AppBarButton = ({ children }) => {
  return (
    <Button
      sx={{
        textTransform: "none",
        color: "primary.contrastText",
        height: "100px",
        width: "100%",
        borderRadius: 0,
        textAlign: "center",
      }}
    >
      <Typography sx={{ fontWeight: 700, fontSize: 20 }}>{children}</Typography>
    </Button>
  );
};

export default AppBarButton;
