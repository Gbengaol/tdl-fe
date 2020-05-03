import React from "react";
import { Route, Redirect } from "react-router-dom";
import Dashboard from "./Dashboard";
import AuthLayout from "../components/AuthLayout.component";
import Profile from "./Profile";
import ManageProfile from "./ManageProfile";
import Archives from "./Archives";

const User = () => {
  if (!localStorage.getItem("todoListStorage")) {
    return <Redirect to="/" />;
  }
  return (
    <AuthLayout>
      <Route exact path="/user" component={Dashboard} />
      <Route exact path="/user/dashboard" component={Dashboard} />
      <Route exact path="/user/archives" component={Archives} />
      <Route exact path="/user/profile" component={Profile} />
      <Route exact path="/user/manage-profile" component={ManageProfile} />
    </AuthLayout>
  );
};

export default User;
