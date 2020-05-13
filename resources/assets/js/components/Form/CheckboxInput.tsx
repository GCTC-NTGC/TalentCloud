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
  // Workaround for new TS error https://github.com/microsoft/TypeScript/issues/37559
  const { name: passedName, onChange: passedChange, ...otherProps } = props;

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
      {...otherProps}
    />
  );
};

export default CheckboxInput;
