import React from "react";
import ErrorHandler from "./ErrorHandler.component";

interface Props {
  children: any;
  placeholder: string;
  required?: boolean;
  name: string;
  errors?: any;
  value?: any;
  reference?: any;
}

const SelectDropdown: React.FC<Props> = ({
  children,
  placeholder,
  required,
  name,
  errors,
  value,
  reference,
}) => {
  return (
    <div className="form-group">
      <label className="sr-only">{placeholder}</label>
      <select
        className="form-control"
        required={required}
        name={name}
        ref={reference}
        defaultValue={value}
      >
        <option value="">{placeholder}</option>
        {children}
      </select>
      <ErrorHandler errors={errors} />
    </div>
  );
};

export default SelectDropdown;
