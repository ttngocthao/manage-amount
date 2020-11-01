//import "./App.css";
import firebase from "firebase";
import { firebaseConfig } from "./firebase.config";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Dashboard from "./views/Dashboard";
import Home from "./views/Home";
firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
