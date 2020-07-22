import React from "react";
import { FieldProps } from "formik";
import Input, { InputProps } from "../Input";

interface DateInputProps
  extends Exclude<
    InputProps,
    | "name"
    | "value"
    | "onChange"
    | "onBlur"
    | "minlength"
    | "maxlength"
    | "type"
  > {
  /** Formik field prop of the shape { name, value, onChange, onBlur } */
  field: FieldProps["field"];
  /** Formik form prop of the shape { errors } */
  form: FieldProps["form"];
}

export const DateInput: React.FC<DateInputProps> = ({
  id,
  label,
  required,
  placeholder,
  grid,
  field: { name, value, onChange, onBlur },
  form: { errors, touched },
  ...props
}) => {
  const specificError = errors ? errors[name] : null;
  const errorText = specificError ? specificError.toString() : undefined;
  const invalid = touched[name] && errors[name] ? true : null;
  // Workaround for new TS error https://github.com/microsoft/TypeScript/issues/37559
  const { name: passedName, onChange: passedChange, ...otherProps } = props;

  return (
    <Input
      id={id}
      label={label}
      type="date"
      placeholder={placeholder}
      required={required}
      name={name}
      value={value}
      grid={grid}
      onChange={onChange}
      onBlur={onBlur}
      errorText={errorText}
      invalid={invalid}
      {...otherProps}
    />
  );
};

export default DateInput;
