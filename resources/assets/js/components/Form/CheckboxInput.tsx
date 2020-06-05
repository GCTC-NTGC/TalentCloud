import * as React from "react";
import { FieldProps } from "formik";
import Checkbox, { CheckboxProps } from "../Checkbox";

interface CheckboxInputProps
  extends Exclude<CheckboxProps, "name" | "value" | "onChange" | "onBlur"> {
  /** Formik field prop of the shape { name, value, onChange, onBlur } */
  field: FieldProps["field"];
  /** Formik form prop of the shape { errors } */
  form: FieldProps["form"];
}

const CheckboxInput: React.FunctionComponent<CheckboxInputProps> = ({
  id,
  label,
  checked,
  grid,
  required,
  field: { name, value, onChange, onBlur },
  form: { errors, touched },
  ...props
}): React.ReactElement => {
  const specificError = errors ? errors[name] : null;
  const errorText = specificError ? specificError.toString() : undefined;
  const invalid = touched[name] && errors[name] ? true : null;
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
      required={required}
      errorText={errorText}
      invalid={invalid}
      onChange={onChange}
      onBlur={onBlur}
      {...otherProps}
    />
  );
};

export default CheckboxInput;
