import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#55ccd4",
    },
    secondary: {
      main: "#fe6786 ",
    },
  },
  typography: {
    h1: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: "bold",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: "bold",
    },
    h5: {
      fontSize: "1rem",
      fontWeight: "bold",
    },
  },
});
theme.overrides = {
  MuiAvatar: {
    colorDefault: {
      backgroundColor: "white",
    },
  },
  MuiBottomNavigation: {
    root: {
      backgroundColor: "rgb(85, 204, 212)",
    },
  },
  MuiBotton: {
    contained: {
      "&:hover": {
        backgroundColor: "inherit",
      },
    },
  },
  MuiButton: {
    containedPrimary: {
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  MuiDrawer: {
    paper: {
      width: "70%",
      maxWidth: "400px",
      backgroundImage:
        "linear-gradient(45deg ,rgb(85, 204, 212), rgb(199, 218, 199), rgb(255, 182, 141), rgb(254, 141, 123), rgb(254, 103, 134))",
    },
  },
  MuiInputLabel: {
    shrink: {
      transform: " translate(0, -9.5px) scale(0.75)",
    },
  },
  MuiListItem: {
    container: {
      width: "95%",
      margin: "0 auto",
    },
  },
};

export { theme };
