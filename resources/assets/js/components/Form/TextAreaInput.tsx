import React from "react";
import { FieldProps } from "formik";
import TextArea, { TextAreaProps } from "../TextArea";

interface TextAreaInputProps
  extends Exclude<TextAreaProps, "name" | "value" | "onChange" | "onBlur"> {
  // Formik field prop of the shape { name, value, onChange, onBlur }
  field: FieldProps["field"];
  // Formik form prop of the shape { errors }
  form: FieldProps["form"];
}

const TextAreaInput: React.FunctionComponent<TextAreaInputProps> = ({
  id,
  label,
  className,
  grid,
  required,
  placeholder,
  field: { name, value, onChange, onBlur },
  form: { errors, touched },
  ...props
}): React.ReactElement => {
  const specificError = errors ? errors[name] : null;
  const errorText = specificError ? specificError.toString() : undefined;
  const invalid = touched[name] && errors[name] ? true : null;

  return (
    <TextArea
      id={id}
      label={label}
      className={className}
      grid={grid}
      required={required}
      placeholder={placeholder}
      name={name}
      value={value}
      errorText={errorText}
      invalid={invalid}
      onChange={onChange}
      onBlur={onBlur}
      {...props}
    />
  );
};

export default TextAreaInput;
