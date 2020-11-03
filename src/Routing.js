import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import About from "./views/About";
import Dashboard from "./views/Dashboard";
import Home from "./views/Home";
import Resource from "./views/Resource";
import { authState } from "./recoil/auth";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Routing = () => {
  const globalAuthState = useRecoilValue(authState);
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
