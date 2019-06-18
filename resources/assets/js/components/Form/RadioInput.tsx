import React from "react";
import { FieldProps } from "formik";

interface RadioInputProps {
  // HTML ID of the input.
  id: string;
  // Text for the associated label of the input.
  label: string;
  // Formik field prop of the shape { name, value, onChange, onBlur }
  field: FieldProps["field"];
}

const RadioInput: React.FunctionComponent<RadioInputProps> = ({
  id,
  label,
  field: { name, value, onChange, onBlur },
  ...props
}): React.ReactElement => (
  <label htmlFor={id}>
    <input
      data-c-font-weight="800"
      id={id}
      name={name}
      type="radio"
      checked={id === value}
      value={id}
      onChange={onChange}
      onBlur={onBlur}
      {...props}
    />
    <span>{label}</span>
  </label>
);

export default RadioInput;
