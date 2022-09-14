import { Box } from "@mui/material";

const Body = ({ children }) => (
  <Box
    sx={{
      backgroundColor: "primary.main",
      width: "100%",
    }}
  >
    {children}
  </Box>
);

export default Body;
