import React from "react";
import { Input } from "antd";
import { FaStarOfLife } from "react-icons/fa6";
import ErrorMessage from "../ErrorMessage";

function InputField({
  label,
  defaultValue,
  onChange,
  field,
  required,
  textArea,
  ...props
}) {
  return (
    <div className="input-field">
      <div className="input-field-wrap">
        <label>
          {required && <FaStarOfLife className="required-icon" />}
          {label}
        </label>
        {textArea ? (
          <Input.TextArea
            defaultValue={defaultValue}
            onChange={(e) => onChange(e.target.value)}
            className="input textarea"
            {...props}
          />
        ) : (
          <Input
            defaultValue={defaultValue}
            onChange={(e) => onChange(e.target.value)}
            className="input"
            {...props}
          />
        )}
      </div>
      <ErrorMessage field={field} />
    </div>
  );
}

export default InputField;
