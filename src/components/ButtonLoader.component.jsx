import React from "react";
import LoaderIcon from "../img/loader-icon.svg";
const ButtonLoader = () => {
  return (
    <div className="loader-icon">
      <img src={LoaderIcon} alt="" />
      <span>Loading...</span>
    </div>
  );
};

export default ButtonLoader;
