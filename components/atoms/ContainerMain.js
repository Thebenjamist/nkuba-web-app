import { Container } from "@mui/material";

const ContainerMain = ({ children }) => (
  <Container
    sx={{
      padding: "20px",
      minHeight: "calc(100vh - 100px)",
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      display: "flex",
    }}
  >
    {children}
  </Container>
);

export default ContainerMain;
