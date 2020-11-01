/* eslint-disable no-unreachable */
//import "./App.css";
import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "./recoil/auth";
import { Auth } from "./firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Dashboard from "./views/Dashboard";
import Home from "./views/Home";

const ProtectRoute = ({ children, ...rest }) => {
  const globalAuthState = useRecoilValue(authState);
  return <Router {...rest}>{globalAuthState ? children : <Home />}</Router>;
};

function App() {
  const setAuthState = useSetRecoilState(authState);
  const globalAuthState = useRecoilValue(authState);
  useEffect(() => {
    Auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthState({
          currentUserEmail: user.email,
          currentUserId: user.uid,
        });
        console.log("user has signed in", globalAuthState);
      } else {
        console.log("user not sign in");
      }
    });
  }, []);
  return (
    <div
      className="App"
      style={{
        backgroundImage:
          "linear-gradient(rgb(85, 204, 212), rgb(199, 218, 199), rgb(255, 182, 141), rgb(254, 141, 123), rgb(254, 103, 134))",
      }}
    >
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <ProtectRoute exact path="/dashboard">
              <Dashboard />
            </ProtectRoute>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
