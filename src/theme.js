import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const colors = {
  snow: "#FFFBFF",
  eerie_black: "#131615",
  cyber_yellow: "#FCD332",
  light_slate_grey: "#7C90A0",
  electric_blue: "#8AF3FF",
};

// Create a theme instance.
const theme = createTheme({
  components: {
    // Name of the component
    MuiStepLabel: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: "10rem",
          color: colors.snow,
          "& $active": {
            color: colors.electric_blue,
          },
        },
        labelContainer: {
          color: colors.light_slate_grey,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: colors.light_slate_grey,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: colors.eerie_black,
          textTransform: "lowercase",
          textTransform: "capitalize",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: colors.light_slate_grey,
        },
      },
    },
  },
  palette: {
    primary: {
      main: colors.cyber_yellow,
      contrastText: colors.eerie_black,
    },
    secondary: {
      main: colors.snow,
    },
    third: {
      main: colors.eerie_black,
    },
    accents: {
      light: colors.light_slate_grey,
      dark: colors.electric_blue,
    },
    background: {
      default: colors.snow,
      paper: colors.snow,
    },
    text: {
      primary: colors.eerie_black,
      secondary: colors.light_slate_grey,
      alt: colors.light_slate_grey,
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
