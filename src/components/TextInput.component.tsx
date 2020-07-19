import React, { Fragment } from "react";
import ErrorHandler from "./ErrorHandler.component";

interface Props {
  placeholder: string;
  type: string;
  name?: string;
  margin?: string;
  reference?: any;
  errors?: any;
  autoFocus?: boolean;
  value?: any;
  onChange?: any;
  required?: boolean | undefined;
}

const TextInput: React.FC<Props> = ({
  placeholder,
  type,
  autoFocus,
  margin,
  name,
  value,
  reference,
  errors,
  onChange,
  required,
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
          required={required}
        />
        <ErrorHandler errors={errors} />
      </div>
    </Fragment>
  );
};

export default TextInput;
