import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#ffd73f",
      contrastText: "#006A79",
    },
    secondary: {
      main: "#006A79",
    },
    third: {
      main: "#A8CD00",
    },
    accents: {
      light: "#00E0FF",
      dark: "#FC8C79",
    },
    background: {
      default: "#ffd73f",
      paper: "#F2FEDC",
    },
    text: {
      primary: "#006A79",
      secondary: "#A8CD00",
      alt: "#00E0FF",
    },
  },
  typography: {
    fontFamily: "Lato",
    h4: {
      fontWeight: 700,
    },
  },
});

export default theme;
