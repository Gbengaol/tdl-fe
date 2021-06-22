import React, { useState, Fragment, useEffect } from "react";
import Registration from "./Registration";
import Login from "./Login";

const Homepage = () => {
  const [toShow, setToShow] = useState("login");
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <Fragment>
      <ul className="auth-toggle my-5">
        <li
          onClick={() => setToShow("login")}
          className={toShow === "login" ? "active" : ""}
        >
          Login
        </li>
        <li
          onClick={() => setToShow("register")}
          className={toShow === "register" ? "active" : ""}
        >
          Register
        </li>
      </ul>
      {toShow === "login" ? <Login /> : <Registration />}
    </Fragment>
  );
};

export default Homepage;
