import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

const AppBarButton = ({ children, navigate }) => {
  const router = useRouter();
  return (
    <Button
      sx={{
        textTransform: "none",
        color: "primary.contrastText",
        height: "56px",
        width: "100%",
        borderRadius: 0,
        textAlign: "center",
        "&:hover": {
          backgroundColor: "primary.light",
        },
      }}
      onClick={() => router.push(navigate)}
    >
      <Typography sx={{ fontWeight: 600, fontSize: 16 }}>{children}</Typography>
    </Button>
  );
};

export default AppBarButton;
