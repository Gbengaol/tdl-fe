import React, { Fragment } from "react";
import ErrorHandler from "./ErrorHandler.component";

const TextInput = ({
  placeholder,
  type,
  autoFocus,
  margin,
  name,
  value,
  reference,
  errors,
  onChange,
}) => {
  return (
    <Fragment>
      <div className={`form-group ${margin ? margin : "mb-3"}`}>
        <label className="sr-only">{placeholder}</label>
        <input
          type={type}
          className="form-control"
          placeholder={placeholder}
          autoFocus={autoFocus}
          ref={reference}
          name={name}
          defaultValue={value}
          onChange={onChange}
        />
        <ErrorHandler errors={errors} />
      </div>
    </Fragment>
  );
};

export default TextInput;
