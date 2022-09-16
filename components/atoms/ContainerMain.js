import { Box } from "@mui/material";

const ContainerMain = ({ children }) => (
  <Box
    sx={{
      minHeight: "calc(100vh - 56px)",
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
    }}
  >
    {children}
  </Box>
);

export default ContainerMain;
