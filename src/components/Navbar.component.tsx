import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <ul className="auth-toggle">
      <Link to="/user/dashboard">
        <li>Dashboard</li>
      </Link>
      <Link to="/user/profile">
        <li>View Profile</li>
      </Link>
      <Link to="/user/manage-profile">
        <li>Manage Profile</li>
      </Link>
      <Link to="/">
        <li>Logout</li>
      </Link>
    </ul>
  );
};

export default Navbar;
