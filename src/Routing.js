import React from "react";
import { Switch, Route } from "react-router-dom";
import About from "./views/About";
import Dashboard from "./views/Dashboard";
import Home from "./views/Home";
import Resource from "./views/Resource";

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/about">
        <About />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
      <Route exact path="/dashboard/:id">
        <Resource />
      </Route>
    </Switch>
  );
};

export default Routing;
