import React from "react";
import { FieldProps } from "formik";
import Input from "./Input";

interface InputFormikProps {
  // HTML ID of the input.
  id: string;
  // Text for the associated label of the input.
  label: string;
  // Value of radio input
  value: string;
  // data-clone-grid-item value, see https://designwithclone.ca/#flexbox-grid.
  grid: string;
  // boolean indicating if input must have a value, or not
  required?: boolean;
  // Boolean that sets the select input to invalid
  invalid?: boolean | null;
  // The input type
  inputType: string;
  // Formik field prop of the shape { name, value, onChange, onBlur }
  field: FieldProps["field"];
  // Formik form prop of the shape { errors }
  form: FieldProps["form"];
}

const InputFormik: React.FunctionComponent<InputFormikProps> = ({
  id,
  inputType,
  required,
  label,
  value,
  grid,
  field: { name, onChange, onBlur },
  form: { errors, touched },
}): React.ReactElement => {
  // TODO: find solution for ts error
  //@ts-ignore
  const errorText: string = errors[name] ? errors[name] : undefined;
  console.log(errors);
  const invalid = touched[name] && errors[name] ? true : null;
  return (
    <Input
      id={id}
      name={name}
      label={label}
      type={inputType}
      value={value}
      grid={grid}
      required={required}
      invalid={invalid}
      onChange={onChange}
      onBlur={onBlur}
      errorText={errorText}
    />
  );
};

export default InputFormik;
