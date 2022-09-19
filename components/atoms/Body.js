import { Box } from "@mui/material";
import image from "../../src/backgrounds/2.png";

const Body = ({ children }) => (
  <Box
    sx={{
      backgroundColor: "#ffcb00",
      width: "100%",
      backgroundImage: `url(${image.src})`,
    }}
  >
    {children}
  </Box>
);

export default Body;
