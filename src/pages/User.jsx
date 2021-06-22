import React from "react";
import { Route } from "react-router-dom";
import ManageProfile from "./ManageProfile";

const User = () => {
  return <Route exact path="/user" component={ManageProfile} />;
};

export default User;
