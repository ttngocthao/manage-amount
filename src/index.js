import React, { Suspense } from "react";
import { RecoilRoot } from "recoil";
import ReactDOM from "react-dom";
//import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./materialUI.config";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { Box, Container, Typography } from "@material-ui/core";
import SpinningImg from "./images/cat-spinner.gif";
//https://stoic-engelbart-88965c.netlify.app/
// import Firebase from "firebase";
// import { firebaseConfig } from "./firebase.config";
// Firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <RecoilRoot>
      <Router>
        <Suspense
          fallback={
            <Container>
              <Box my={4} px={3}>
                <Typography variant="h1">Manage Amount</Typography>
              </Box>
              <img
                alt="loading gif"
                src={SpinningImg}
                style={{
                  display: "block",
                  margin: "0 auto",
                  maxWidth: "300px",
                  width: "100%",
                }}
              />
            </Container>
          }
        >
          <App />
        </Suspense>
      </Router>
    </RecoilRoot>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
