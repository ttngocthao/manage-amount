import React, { lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
//import About from "./views/About";
//import Dashboard from "./views/Dashboard";
//import Home from "./views/Home";

import Resource from "./views/Resource";
import { authState } from "./recoil/auth";
import { useRecoilValue } from "recoil";

const Home = lazy(() => import("./views/Home"));
const About = lazy(() => import("./views/About"));
const Dashboard = lazy(() => import("./views/Dashboard"));

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/about">
        <About />
      </Route>
      <PrivateRoute
        exact
        path="/dashboard"
        component={Dashboard}
      ></PrivateRoute>
      <PrivateRoute
        exact
        path="/dashboard/:id"
        component={Resource}
      ></PrivateRoute>
    </Switch>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const globalAuthState = useRecoilValue(authState);
  return (
    <Route
      {...rest}
      render={(props) =>
        globalAuthState?.currentUserId ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/" }} />
        )
      }
    />
  );
};

export default Routing;
