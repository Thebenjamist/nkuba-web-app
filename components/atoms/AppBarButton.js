import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

const AppBarButton = ({ children, navigate }) => {
  const router = useRouter();
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
      onClick={() => router.push(navigate)}
    >
      <Typography sx={{ fontWeight: 400, fontSize: 18 }}>{children}</Typography>
    </Button>
  );
};

export default AppBarButton;
