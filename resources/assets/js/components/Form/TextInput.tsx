import React from "react";
import { FieldProps } from "formik";
import Input, { InputProps } from "../Input";

interface TextInputProps
  extends Exclude<InputProps, "name" | "value" | "onChange" | "onBlur"> {
  /** Formik field prop of the shape { name, value, onChange, onBlur } */
  field: FieldProps["field"];
  /** Formik form prop of the shape { errors } */
  form: FieldProps["form"];
}

const TextInput: React.FunctionComponent<TextInputProps> = ({
  id,
  label,
  required,
  placeholder,
  grid,
  minLength,
  maxLength,
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
      minLength={minLength}
      maxLength={maxLength}
      onChange={onChange}
      onBlur={onBlur}
      errorText={errorText}
      invalid={invalid}
      {...props}
    />
  );
};

export default TextInput;
