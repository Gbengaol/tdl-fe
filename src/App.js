import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import User from "./pages/User";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <div className="home">
      <div className="layout">
        <Router>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route
              exact
              path="/reset-password/:token"
              component={ResetPassword}
            />
            <Route path="/user" component={User} />
            <Route path="*">
              <Homepage />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
