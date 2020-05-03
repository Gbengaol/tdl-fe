import React, { Fragment } from "react";
import Navbar from "./Navbar.component";

const AuthLayout = ({ children }) => {
  return (
    <Fragment>
      <Navbar />
      {children}
    </Fragment>
  );
};

export default AuthLayout;
