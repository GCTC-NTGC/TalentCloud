import React from "react";
import { FieldProps, getIn } from "formik";
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
  const specificError = errors ? getIn(errors, name) : null;
  const errorText = specificError ? specificError.toString() : undefined;
  const invalid = getIn(touched, name) && specificError ? true : null;
  // Workaround for new TS error https://github.com/microsoft/TypeScript/issues/37559
  const { name: passedName, onChange: passedChange, ...otherProps } = props;

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
      {...otherProps}
    />
  );
};

export default TextAreaInput;
