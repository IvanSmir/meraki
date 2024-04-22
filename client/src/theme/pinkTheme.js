import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const purpleTheme = createTheme({
  palette: {
    primary: {
      main: "#f7e6e6",
      button: "#F7BABA",
    },
    secondary: {
      main: "#efd3de",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#F3E5F5",
    },
  },
});
