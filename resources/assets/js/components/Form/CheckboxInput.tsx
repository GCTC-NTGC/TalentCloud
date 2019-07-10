import * as React from "react";
import { FieldProps } from "formik";
import Checkbox, { CheckboxProps } from "../Checkbox";

interface CheckboxInputProps
  extends Exclude<CheckboxProps, "name" | "value" | "onChange" | "onBlur"> {
  /** Formik field prop of the shape { name, value, onChange, onBlur } */
  field: FieldProps["field"];
}

const CheckboxInput: React.FunctionComponent<CheckboxInputProps> = ({
  id,
  label,
  checked,
  grid,
  field: { name, value, onChange, onBlur },
  ...props
}): React.ReactElement => {
  return (
    <Checkbox
      id={id}
      name={name}
      label={label}
      value={value}
      grid={grid}
      checked={checked}
      onChange={onChange}
      onBlur={onBlur}
      {...props}
    />
  );
};

export default CheckboxInput;
