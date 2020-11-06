import React from "react";
import { RecoilRoot } from "recoil";
import ReactDOM from "react-dom";
//import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./materialUI.config";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
//https://stoic-engelbart-88965c.netlify.app/
// import Firebase from "firebase";
// import { firebaseConfig } from "./firebase.config";
// Firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <RecoilRoot>
      <Router>
        <App />
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
