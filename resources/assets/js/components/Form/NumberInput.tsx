import * as React from "react";
import { FieldProps } from "formik";
import Input from "../Input";

interface NumberInputProps {
  /** HTML id of the input element */
  id: string;
  /** Holds text for label associated with input element */
  label: string;
  /** boolean indicating if input must have a value, or not */
  required?: boolean;
  /** Let's you specify example text that appears in input element when empty */
  placeholder?: string;
  /** Minimum value for the input */
  min?: number;
  /** Maximum value for the input */
  max?: number;
  /** data-clone-grid-item value: https://designwithclone.ca/#flexbox-grid */
  grid?: string;
  /** Formik field prop of the shape { name, value, onChange, onBlur } */
  field: FieldProps["field"];
  /** Formik form prop of the shape { errors, touched } */
  form: FieldProps["form"];
}

const NumberInput: React.FunctionComponent<NumberInputProps> = ({
  id,
  label,
  required,
  placeholder,
  min,
  max,
  grid,
  field: { name, value, onChange, onBlur },
  form: { errors, touched },
  ...props
}): React.ReactElement => {
  const specificError = errors ? errors[name] : null;
  const errorText = specificError ? specificError.toString() : undefined;
  const invalid = touched[name] && errors[name] ? true : null;

  return (
    <Input
      id={id}
      label={label}
      placeholder={placeholder}
      required={required}
      name={name}
      value={value}
      grid={grid}
      min={min}
      max={max}
      onChange={onChange}
      onBlur={onBlur}
      errorText={errorText}
      invalid={invalid}
      {...props}
    />
  );
};

export default NumberInput;
