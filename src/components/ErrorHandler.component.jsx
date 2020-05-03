import React from "react";

const ErrorHandler = ({ errors }) => {
  return (
    <>
      {errors && errors.type === "required" && (
        <span className="d-block">
          <i className="fa fa-exclamation-circle mb-4 color-red"></i> This field
          is required
        </span>
      )}
      {errors && errors.type === "maxLength" && (
        <span className="d-block">
          <i className="fa fa-exclamation-circle mb-4 color-red"></i> Your input
          exceeded the maximum length
        </span>
      )}
      {errors && errors.type === "minLength" && (
        <span className="d-block">
          <i className="fa fa-exclamation-circle mb-4 color-red"></i> Your input
          is not up to the minimum length
        </span>
      )}
    </>
  );
};

export default ErrorHandler;
