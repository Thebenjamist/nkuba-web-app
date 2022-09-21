import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { keyframes } from "@mui/material";

const AppBarButton = ({ children, navigate }) => {
  const router = useRouter();

  const spin = keyframes`
  0% {
    background-color: white;
  }
  50% {
    background-color: #FCD332;
  }
  100% {
    background-color: white;
  }
`;
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

        animation: { xs: `${spin} 4s infinite ease`, sm: "none" },
      }}
      onClick={() => router.push(navigate)}
    >
      <Typography sx={{ fontWeight: 600, fontSize: 16 }}>{children}</Typography>
    </Button>
  );
};

export default AppBarButton;
